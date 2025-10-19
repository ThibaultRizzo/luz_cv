-- Migration: Add Projects Section
-- Created: 2025-10-19
-- Description: Adds projects_title and projects fields to support a new projects section

-- Add projects title field
ALTER TABLE content 
ADD COLUMN IF NOT EXISTS projects_title TEXT;

-- Add projects array field (stores project cards with title, subtitle, image, link)
ALTER TABLE content 
ADD COLUMN IF NOT EXISTS projects JSONB DEFAULT '[]'::jsonb;

-- Example projects structure:
-- [
--   {
--     "title": "Project Name",
--     "subtitle": "Project description or role",
--     "image": "/uploads/project-image.jpg",
--     "link": "https://project-url.com" (optional)
--   }
-- ]

