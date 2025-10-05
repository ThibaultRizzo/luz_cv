import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Create database connection lazily to avoid build-time errors
let sql: postgres.Sql | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (dbInstance) return dbInstance;

  const connectionString = process.env.POSTGRES_URL;

  if (!connectionString) {
    throw new Error('POSTGRES_URL environment variable is not set. Please configure it in your Vercel environment variables.');
  }

  sql = postgres(connectionString);
  dbInstance = drizzle(sql, { schema });
  return dbInstance;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    return getDb()[prop as keyof ReturnType<typeof drizzle>];
  }
});

// Get the underlying SQL instance for utility functions
function getSql() {
  if (!sql) {
    const connectionString = process.env.POSTGRES_URL;
    if (!connectionString) {
      throw new Error('POSTGRES_URL environment variable is not set.');
    }
    sql = postgres(connectionString);
  }
  return sql;
}

// Database utilities
export async function testConnection() {
  try {
    const sqlClient = getSql();
    await sqlClient`SELECT 1`;
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

export async function initializeDatabase() {
  try {
    const sqlClient = getSql();
    // Check if tables exist and create them if not
    await sqlClient`
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

    await sqlClient`
      CREATE TABLE IF NOT EXISTS content (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),

        -- Hero Section
        hero_title TEXT,
        hero_subtitle TEXT,
        hero_description TEXT,
        hero_badge TEXT,
        hero_image TEXT DEFAULT '/nadia.jpg',
        hero_stats JSONB DEFAULT '[]',
        hero_cta_text TEXT,
        hero_scroll_text TEXT,
        header_font TEXT DEFAULT 'playfair',

        -- Loading Screen
        loading_screen_first_name TEXT DEFAULT 'NADIA',
        loading_screen_last_name TEXT DEFAULT 'LUNA',
        loading_screen_tagline TEXT DEFAULT 'Product Owner • Luxury Retail',

        -- About Section
        about_title TEXT,
        about_description TEXT,
        about_main_text TEXT,
        about_secondary_text TEXT,
        about_quote TEXT,
        about_badge TEXT,
        about_title_suffix TEXT,
        about_approach_title TEXT,
        about_approach_items JSONB DEFAULT '[]',
        about_impact_title TEXT,
        about_impact_metrics JSONB DEFAULT '[]',
        about_quote_author TEXT,

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
        skill_categories JSONB DEFAULT '[]',
        certifications JSONB DEFAULT '[]',
        tools JSONB DEFAULT '[]',
        skills_quote TEXT,
        skills_badge TEXT,
        skills_certifications_title TEXT,
        skills_tools_title TEXT,
        skills_quote_author TEXT,
        soft_skills JSONB DEFAULT '[]',

        -- Achievements
        achievements_title TEXT,
        achievements JSONB DEFAULT '[]',

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

        -- Meta
        version INTEGER DEFAULT 1 NOT NULL,
        is_active BOOLEAN DEFAULT true NOT NULL,
        last_modified_by TEXT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

    await sqlClient`
      CREATE TABLE IF NOT EXISTS content_backups (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        content_id TEXT REFERENCES content(id) NOT NULL,
        backup_data JSONB NOT NULL,
        version INTEGER NOT NULL,
        created_by TEXT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

    console.log('✅ Database tables initialized');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return false;
  }
}