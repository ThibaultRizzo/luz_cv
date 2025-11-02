import postgres from 'postgres';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env
dotenv.config({ path: join(__dirname, '../.env') });

async function runMigration() {
  const connectionString = process.env.POSTGRES_URL;

  if (!connectionString) {
    console.error('❌ POSTGRES_URL environment variable is not set');
    process.exit(1);
  }

  const migrationFile = process.argv[2];
  if (!migrationFile) {
    console.error('❌ Please provide a migration file as an argument');
    console.error('Usage: node scripts/runMigration.mjs migrations/your-migration.sql');
    process.exit(1);
  }

  const sql = postgres(connectionString);

  try {
    console.log(`🔄 Running migration: ${migrationFile}`);

    const migrationPath = join(__dirname, '..', migrationFile);
    const migration = readFileSync(migrationPath, 'utf-8');

    // Split by semicolons and execute each statement
    const statements = migration
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      await sql.unsafe(statement);
    }

    console.log('✅ Migration completed successfully');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

runMigration();
