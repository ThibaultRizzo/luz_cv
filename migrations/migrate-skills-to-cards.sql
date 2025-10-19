-- Migration: Convert existing skillCategories to skillCards format
-- This migration transforms the old skill categories structure into the new skill cards format

-- Note: This migration should be run after verifying your data
-- The conversion logic will create one card per skill category, 
-- using the category name as the title and listing the skills in the description

-- This is a manual migration because the data transformation is complex
-- Run the Node.js script instead: node scripts/migrateSkillsToCards.mjs

