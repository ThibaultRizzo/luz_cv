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

async function fixSkillCardsItems() {
    console.log('🔄 Fixing skill cards to ensure all have items array...\n');

    try {
        // Get all content records
        const contentRecords = await client`
            SELECT id, skill_cards 
            FROM content
        `;

        for (const record of contentRecords) {
            const skillCards = Array.isArray(record.skill_cards) ? record.skill_cards : [];

            if (skillCards.length === 0) {
                console.log(`⏭️  Skipping record ${record.id} - no skill cards`);
                continue;
            }

            let needsUpdate = false;
            const fixedSkillCards = skillCards.map(card => {
                // If card doesn't have items array, add an empty one or create from description
                if (!Array.isArray(card.items)) {
                    needsUpdate = true;
                    
                    // Try to create items from description if it exists
                    if (card.description) {
                        const lines = card.description.split('\n').filter(line => line.trim());
                        const items = lines
                            .filter(line => line.trim().startsWith('•'))
                            .map(line => ({
                                title: line.replace('•', '').trim(),
                                icon: '✨'
                            }));
                        
                        if (items.length > 0) {
                            return {
                                ...card,
                                items: items
                            };
                        }
                    }
                    
                    // Otherwise create a single default item
                    return {
                        ...card,
                        items: [{
                            title: card.title || 'Skill',
                            icon: '✨'
                        }]
                    };
                }
                
                return card;
            });

            if (needsUpdate) {
                await client`
                    UPDATE content 
                    SET skill_cards = ${JSON.stringify(fixedSkillCards)}::jsonb
                    WHERE id = ${record.id}
                `;
                console.log(`✅ Fixed skill cards for record ${record.id}`);
            } else {
                console.log(`✓ Record ${record.id} - already has items arrays`);
            }
        }

        console.log('\n✅ Fix completed successfully!');
        
    } catch (error) {
        console.error('❌ Fix failed:', error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

fixSkillCardsItems();

