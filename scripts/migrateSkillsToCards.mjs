#!/usr/bin/env node
import postgres from 'postgres';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: join(__dirname, '../.env.local') });

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
    console.error('❌ POSTGRES_URL is not set in environment variables');
    process.exit(1);
}

const client = postgres(connectionString);

async function migrateSkillsToCards() {
    console.log('🔄 Starting migration from skillCategories to skillCards...\n');

    try {
        // Get all content records
        const contentRecords = await client`
            SELECT id, skill_categories, skill_cards 
            FROM content
        `;

        for (const record of contentRecords) {
            const skillCategories = record.skill_categories || [];
            const existingSkillCards = record.skill_cards || [];

            // Skip if already has skill cards
            if (existingSkillCards.length > 0) {
                console.log(`⏭️  Skipping record ${record.id} - already has skill cards`);
                continue;
            }

            // Skip if no skill categories to migrate
            if (skillCategories.length === 0) {
                console.log(`⏭️  Skipping record ${record.id} - no skill categories to migrate`);
                continue;
            }

            console.log(`📝 Migrating record ${record.id}...`);
            console.log(`   Found ${skillCategories.length} skill categories`);

            // Convert each skill category to a skill card
            const newSkillCards = skillCategories.map(category => {
                // Create a description from the skills list
                const skillsList = category.skills
                    .map(skill => `• ${skill.name}`)
                    .join('\n');

                return {
                    title: category.category,
                    description: skillsList || 'Skills in this category',
                    icon: category.icon || '⭐',
                    iconType: 'emoji',
                    width: 'half' // Default to half width for all cards
                };
            });

            // Update the record with new skill cards
            await client`
                UPDATE content 
                SET skill_cards = ${JSON.stringify(newSkillCards)}::jsonb
                WHERE id = ${record.id}
            `;

            console.log(`✅ Migrated ${newSkillCards.length} cards for record ${record.id}\n`);
        }

        console.log('✅ Migration completed successfully!');
        console.log('\nNext steps:');
        console.log('1. Review the migrated skill cards in the backoffice');
        console.log('2. Adjust card widths and descriptions as needed');
        console.log('3. The old skill categories will be removed from the schema');
        
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

migrateSkillsToCards();

