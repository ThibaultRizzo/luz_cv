import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Create database connection
const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('POSTGRES_URL environment variable is not set. Please configure it in your Vercel environment variables.');
}

const sql = postgres(connectionString);
export const db = drizzle(sql, { schema });

// Database utilities
export async function testConnection() {
  try {
    await sql`SELECT 1`;
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

export async function initializeDatabase() {
  try {
    // Check if tables exist and create them if not
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

    await sql`
      CREATE TABLE IF NOT EXISTS content (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        hero_title TEXT,
        hero_subtitle TEXT,
        hero_description TEXT,
        about_title TEXT,
        about_description TEXT,
        about_main_text TEXT,
        about_secondary_text TEXT,
        about_quote TEXT,
        experience_title TEXT,
        experience_subtitle TEXT,
        experiences JSONB DEFAULT '[]',
        skills_title TEXT,
        skills_subtitle TEXT,
        skills_description TEXT,
        skill_categories JSONB DEFAULT '[]',
        certifications JSONB DEFAULT '[]',
        tools JSONB DEFAULT '[]',
        skills_quote TEXT,
        achievements_title TEXT,
        achievements JSONB DEFAULT '[]',
        contact_title TEXT,
        contact_subtitle TEXT,
        contact_description TEXT,
        version INTEGER DEFAULT 1 NOT NULL,
        is_active BOOLEAN DEFAULT true NOT NULL,
        last_modified_by TEXT REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;

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

    console.log('✅ Database tables initialized');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return false;
  }
}