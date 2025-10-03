import { db } from './connection';
import { sql } from 'drizzle-orm';

async function addImageFields() {
  try {
    console.log('Adding heroImage and contactCvPath columns to content table...');

    // Add heroImage column if it doesn't exist
    await db.execute(sql`
      ALTER TABLE content
      ADD COLUMN IF NOT EXISTS hero_image TEXT DEFAULT '/nadia.jpg'
    `);

    // Add contactCvPath column if it doesn't exist
    await db.execute(sql`
      ALTER TABLE content
      ADD COLUMN IF NOT EXISTS contact_cv_path TEXT DEFAULT '/cv.pdf'
    `);

    console.log('✅ Successfully added heroImage and contactCvPath columns');

    // Update existing rows to have the default values
    await db.execute(sql`
      UPDATE content
      SET hero_image = '/nadia.jpg'
      WHERE hero_image IS NULL
    `);

    await db.execute(sql`
      UPDATE content
      SET contact_cv_path = '/cv.pdf'
      WHERE contact_cv_path IS NULL
    `);

    console.log('✅ Updated existing rows with default values');

  } catch (error) {
    console.error('❌ Error adding image fields:', error);
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  addImageFields()
    .then(() => {
      console.log('Migration completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export { addImageFields };
