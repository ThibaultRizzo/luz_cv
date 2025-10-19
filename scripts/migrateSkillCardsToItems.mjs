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

async function migrateSkillCardsToItems() {
    console.log('🔄 Starting migration from skill cards with descriptions to items-based structure...\n');

    try {
        // Get all content records
        const contentRecords = await client`
            SELECT id, skill_cards 
            FROM content
        `;

        for (const record of contentRecords) {
            const skillCards = Array.isArray(record.skill_cards) ? record.skill_cards : [];

            if (skillCards.length === 0) {
                console.log(`⏭️  Skipping record ${record.id} - no skill cards to migrate`);
                continue;
            }

            // Check if already migrated (has items array)
            const alreadyMigrated = skillCards.every(card => card && Array.isArray(card.items));
            if (alreadyMigrated) {
                console.log(`⏭️  Skipping record ${record.id} - already has items-based structure`);
                continue;
            }

            console.log(`📝 Migrating record ${record.id}...`);
            console.log(`   Found ${skillCards.length} skill cards`);

            // Convert each skill card from description to items
            const newSkillCards = skillCards.map(card => {
                // If already has items, keep as is
                if (Array.isArray(card.items)) {
                    return card;
                }

                // Convert description (bulleted list) to items array
                const description = card.description || '';
                const lines = description.split('\n').filter(line => line.trim());
                
                // Extract skill names from bulleted list
                const items = lines
                    .filter(line => line.trim().startsWith('•'))
                    .map(line => {
                        const skillName = line.replace('•', '').trim();
                        return {
                            title: skillName,
                            icon: '✨' // Default icon for migrated skills
                        };
                    });

                // If no items found from description, create a default one
                if (items.length === 0 && description) {
                    items.push({
                        title: description.substring(0, 50), // Take first 50 chars
                        icon: '✨'
                    });
                }

                // If still no items, create a placeholder
                if (items.length === 0) {
                    items.push({
                        title: 'Skill',
                        icon: '✨'
                    });
                }

                // Return card with new structure
                return {
                    title: card.title,
                    icon: card.icon,
                    iconType: card.iconType || 'emoji',
                    width: card.width || 'half',
                    items: items
                };
            });

            // Update the record with new skill cards
            await client`
                UPDATE content 
                SET skill_cards = ${JSON.stringify(newSkillCards)}::jsonb
                WHERE id = ${record.id}
            `;

            console.log(`✅ Migrated ${newSkillCards.length} cards for record ${record.id}`);
            console.log(`   Total items created: ${newSkillCards.reduce((sum, card) => sum + card.items.length, 0)}\n`);
        }

        console.log('✅ Migration completed successfully!');
        console.log('\nNext steps:');
        console.log('1. Review the migrated skill cards in the backoffice');
        console.log('2. Update item icons and titles as needed');
        console.log('3. The items will now display horizontally in each card');
        
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

migrateSkillCardsToItems();

