-- Migration: Remove deprecated skill_categories column
-- This migration removes the old skill_categories column after migration to skill_cards

-- IMPORTANT: Make sure all data has been migrated to skill_cards before running this!
-- Run: node scripts/migrateSkillsToCards.mjs first

-- Drop the old skill_categories column
ALTER TABLE content 
DROP COLUMN IF EXISTS skill_categories;

-- This column is now replaced by skill_cards

