import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL);

async function checkSchema() {
  try {
    console.log('Checking database schema...\n');

    // Get all columns from content table
    const dbColumns = await sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'content'
      ORDER BY column_name
    `;

    const dbColumnNames = new Set(dbColumns.map(c => c.column_name));

    // Expected columns based on schema.ts (using snake_case as they appear in DB)
    const expectedColumns = [
      // Hero
      'hero_title', 'hero_subtitle', 'hero_description', 'hero_badge',
      'hero_image', 'hero_stats', 'hero_cta_text', 'hero_scroll_text', 'header_font',

      // Loading Screen
      'loading_screen_first_name', 'loading_screen_last_name', 'loading_screen_tagline',

      // About
      'about_title', 'about_description', 'about_main_text', 'about_secondary_text',
      'about_quote', 'about_badge', 'about_title_suffix', 'about_approach_title',
      'about_approach_items', 'about_impact_title', 'about_impact_metrics', 'about_quote_author',

      // Experience
      'experience_title', 'experience_subtitle', 'experiences', 'experience_badge',
      'experience_bottom_stats',

      // Skills
      'skills_title', 'skills_subtitle', 'skills_description', 'skill_categories',
      'certifications', 'tools', 'skills_quote', 'skills_badge',
      'skills_certifications_title', 'skills_tools_title', 'skills_quote_author', 'soft_skills',

      // Achievements
      'achievements_title', 'achievements',

      // Contact
      'contact_title', 'contact_subtitle', 'contact_description', 'contact_badge',
      'contact_form_title', 'contact_form_labels', 'contact_form_placeholders',
      'contact_submit_button', 'contact_success_message', 'contact_error_message',
      'contact_info_title', 'contact_email', 'contact_linkedin', 'contact_phone',
      'contact_availability_title', 'contact_availability_status',
      'contact_availability_description', 'contact_availability_items',
      'contact_download_text', 'contact_cv_path', 'contact_bottom_info',

      // Meta
      'id', 'version', 'is_active', 'last_modified_by', 'created_at', 'updated_at'
    ];

    console.log('Expected columns:', expectedColumns.length);
    console.log('Actual columns in DB:', dbColumnNames.size);

    // Check for missing columns
    const missingColumns = expectedColumns.filter(col => !dbColumnNames.has(col));
    if (missingColumns.length > 0) {
      console.log('\n❌ Missing columns in database:');
      missingColumns.forEach(col => console.log(`  - ${col}`));
    } else {
      console.log('\n✅ All expected columns exist in database');
    }

    // Check for extra columns
    const extraColumns = [...dbColumnNames].filter(col => !expectedColumns.includes(col));
    if (extraColumns.length > 0) {
      console.log('\n⚠️  Extra columns in database (not in schema):');
      extraColumns.forEach(col => console.log(`  - ${col}`));
    }

    // Check current content
    console.log('\n\nCurrent content in database:');
    const content = await sql`SELECT * FROM content WHERE is_active = true LIMIT 1`;
    if (content.length > 0) {
      const c = content[0];
      console.log('  ID:', c.id);
      console.log('  Version:', c.version);
      console.log('  Hero Title:', c.hero_title);
      console.log('  Loading Screen First Name:', c.loading_screen_first_name);
      console.log('  Loading Screen Last Name:', c.loading_screen_last_name);
      console.log('  Loading Screen Tagline:', c.loading_screen_tagline);
    } else {
      console.log('  No active content found');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sql.end();
  }
}

checkSchema();
