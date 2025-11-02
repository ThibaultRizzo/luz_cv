import postgres from 'postgres';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config({ path: '.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function initDatabase() {
  const connectionString = process.env.POSTGRES_URL;

  if (!connectionString) {
    console.error('❌ POSTGRES_URL environment variable is not set');
    console.error('Make sure you have a .env file with POSTGRES_URL set');
    process.exit(1);
  }

  const sql = postgres(connectionString);

  try {
    console.log('🔄 Step 1: Creating tables if they don\'t exist...');
    
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'admin' NOT NULL,
        refresh_tokens JSONB DEFAULT '[]',
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    console.log('✅ Users table ready');

    // Create content table with ALL fields
    await sql`
      CREATE TABLE IF NOT EXISTS content (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),

        -- Hero Section
        hero_title TEXT,
        hero_subtitle TEXT,
        hero_description TEXT,
        hero_badge TEXT,
        hero_image TEXT DEFAULT '/luz.jpg',
        hero_stats JSONB DEFAULT '[]',
        hero_cta_text TEXT,
        hero_scroll_text TEXT,
        header_font TEXT DEFAULT 'playfair',

        -- Loading Screen
        loading_screen_first_name TEXT DEFAULT 'LUZ',
        loading_screen_last_name TEXT DEFAULT 'QUINTANAR',
        loading_screen_tagline TEXT DEFAULT 'Product Owner • Luxury Retail',

        -- About Section
        about_title TEXT,
        about_description TEXT,
        about_main_text TEXT,
        about_secondary_text TEXT,
        about_badge TEXT,
        about_title_suffix TEXT,
        about_approach_title TEXT,
        about_approach_items JSONB DEFAULT '[]',
        about_impact_title TEXT,
        about_impact_metrics JSONB DEFAULT '[]',

        -- Experience Section
        experience_title TEXT,
        experience_subtitle TEXT,
        experiences JSONB DEFAULT '[]',
        experience_badge TEXT,
        experience_bottom_stats JSONB DEFAULT '[]',

        -- Skills Section
        skills_title TEXT,
        skills_subtitle TEXT,
        skills_description TEXT,
        skill_cards JSONB DEFAULT '[]',
        certifications JSONB DEFAULT '[]',
        tools JSONB DEFAULT '[]',
        skills_badge TEXT,
        skills_certifications_title TEXT,
        soft_skills JSONB DEFAULT '[]',
        skills_soft_skills_title TEXT DEFAULT 'Leadership & Soft Skills',

        -- Projects
        projects_title TEXT,
        projects JSONB DEFAULT '[]',

        -- Contact Section
        contact_title TEXT,
        contact_subtitle TEXT,
        contact_description TEXT,
        contact_badge TEXT,
        contact_form_title TEXT,
        contact_form_labels JSONB DEFAULT '{}',
        contact_form_placeholders JSONB DEFAULT '{}',
        contact_submit_button TEXT,
        contact_success_message TEXT,
        contact_error_message TEXT,
        contact_info_title TEXT,
        contact_email TEXT,
        contact_linkedin TEXT,
        contact_phone TEXT,
        contact_availability_title TEXT,
        contact_availability_status TEXT,
        contact_availability_description TEXT,
        contact_availability_items JSONB DEFAULT '[]',
        contact_download_text TEXT,
        contact_cv_path TEXT DEFAULT '/cv.pdf',
        contact_bottom_info JSONB DEFAULT '{}',

        -- Theme Settings
        theme_font JSONB DEFAULT '{"primary":"Playfair Display","primaryUrl":"https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap","secondary":"Inter","secondaryUrl":"https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"}',
        theme_colors JSONB DEFAULT '{"brandDeep":"#1a1a1a","brandCream":"#f5f1e8","brandGold":"#c7a17a"}',

        -- Language Settings
        enabled_languages JSONB DEFAULT '["en"]',
        default_language TEXT DEFAULT 'en',
        translations JSONB DEFAULT '{}',

        -- Meta
        version INTEGER DEFAULT 1 NOT NULL,
        is_active BOOLEAN DEFAULT true NOT NULL,
        last_modified_by TEXT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    console.log('✅ Content table ready');

    // Create content_backups table
    await sql`
      CREATE TABLE IF NOT EXISTS content_backups (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        content_id TEXT REFERENCES content(id) NOT NULL,
        backup_data JSONB NOT NULL,
        version INTEGER NOT NULL,
        created_by TEXT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    console.log('✅ Content backups table ready');

    console.log('\n🔄 Step 2: Running migrations to add missing columns...');
    
    // Run all migrations in order
    const migrations = [
      'add-flexible-content.sql',
      'add-loading-screen-fields.sql',
      'add-soft-skills-title.sql',
      'add-projects-section.sql',
      // 'add-theme-settings.sql', // Skipping - columns added manually due to @ symbol parsing issue
      'add-language-settings.sql',
      'add-skill-cards.sql',
      'remove-quote-fields.sql',
      'remove-skill-categories.sql'
    ];

    for (const migrationFile of migrations) {
      try {
        console.log(`   📄 Running ${migrationFile}...`);
        const migrationPath = join(__dirname, '../migrations', migrationFile);
        const migration = readFileSync(migrationPath, 'utf-8');

        // Split by semicolons and execute each statement
        const statements = migration
          .split(';')
          .map(s => s.trim())
          .filter(s => s.length > 0 && !s.startsWith('--'));

        for (const statement of statements) {
          await sql.unsafe(statement);
        }
        console.log(`   ✅ ${migrationFile} completed`);
      } catch (error) {
        // Ignore errors for columns that already exist
        if (error.message && error.message.includes('already exists')) {
          console.log(`   ⚠️  ${migrationFile} - columns already exist (skipped)`);
        } else {
          console.error(`   ❌ ${migrationFile} failed:`, error.message);
        }
      }
    }

    console.log('\n✅ Database initialization completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Restart your dev server if it\'s running');
    console.log('   2. Visit http://localhost:3000/api/init-db to seed initial data');
    console.log('   3. Visit http://localhost:3000 to see your site');
    
  } catch (error) {
    console.error('\n❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

initDatabase();

