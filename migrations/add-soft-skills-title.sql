-- Add soft skills title field to content table

ALTER TABLE content ADD COLUMN IF NOT EXISTS skills_soft_skills_title TEXT DEFAULT 'Leadership & Soft Skills';

-- Populate default value for existing content
UPDATE content SET skills_soft_skills_title = 'Leadership & Soft Skills' WHERE skills_soft_skills_title IS NULL;
