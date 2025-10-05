import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL);

async function testSave() {
  try {
    console.log('Testing save with loading screen data...\n');

    // Get current content
    const before = await sql`SELECT
      loading_screen_first_name,
      loading_screen_last_name,
      loading_screen_tagline,
      hero_title
    FROM content WHERE is_active = true LIMIT 1`;

    console.log('BEFORE update:');
    console.log('  loading_screen_first_name:', before[0]?.loading_screen_first_name);
    console.log('  loading_screen_last_name:', before[0]?.loading_screen_last_name);
    console.log('  loading_screen_tagline:', before[0]?.loading_screen_tagline);
    console.log('  hero_title:', before[0]?.hero_title);

    // Simulate what the API would receive (camelCase)
    const updatePayload = {
      loadingScreenFirstName: 'TEST FIRST',
      loadingScreenLastName: 'TEST LAST',
      loadingScreenTagline: 'TEST TAGLINE',
      heroTitle: 'TEST HERO'
    };

    console.log('\n\nPayload to send (camelCase):');
    console.log(updatePayload);

    // The issue: Drizzle needs snake_case for the database
    // But the API receives camelCase from the frontend

    console.log('\n\n⚠️  ISSUE DETECTED:');
    console.log('The API receives camelCase fields from frontend');
    console.log('But Drizzle schema uses snake_case column names');
    console.log('We need to transform camelCase → snake_case before saving!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sql.end();
  }
}

testSave();
