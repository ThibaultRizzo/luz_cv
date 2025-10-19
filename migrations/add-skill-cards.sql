-- Migration: Add skill_cards column to content table
-- This migration adds support for the new skill cards structure with icons, titles, and flexible widths

-- Add the new skill_cards column
ALTER TABLE content 
ADD COLUMN IF NOT EXISTS skill_cards JSONB DEFAULT '[]'::jsonb;

-- The skill_cards column will contain an array of objects with the following structure:
-- {
--   "title": "Card Title",
--   "description": "Card description text",
--   "icon": "emoji or /path/to/icon.png",
--   "iconType": "emoji" | "upload",
--   "width": "half" | "full"
-- }

-- Update existing data to have an empty array if null
UPDATE content 
SET skill_cards = '[]'::jsonb 
WHERE skill_cards IS NULL;

