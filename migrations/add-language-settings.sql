-- Add language settings columns to content table

-- Add enabled languages array
ALTER TABLE content ADD COLUMN IF NOT EXISTS enabled_languages JSONB DEFAULT '["en"]'::jsonb;

-- Add default language
ALTER TABLE content ADD COLUMN IF NOT EXISTS default_language TEXT DEFAULT 'en';

-- Add translations object
ALTER TABLE content ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}'::jsonb;

