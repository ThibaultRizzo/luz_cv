-- Add loading screen fields to content table

-- Loading Screen additions
ALTER TABLE content ADD COLUMN IF NOT EXISTS loading_screen_first_name TEXT DEFAULT 'NADIA';
ALTER TABLE content ADD COLUMN IF NOT EXISTS loading_screen_last_name TEXT DEFAULT 'LUNA';
ALTER TABLE content ADD COLUMN IF NOT EXISTS loading_screen_tagline TEXT DEFAULT 'Product Owner • Luxury Retail';

-- Populate default values for existing content
UPDATE content SET
  loading_screen_first_name = 'NADIA',
  loading_screen_last_name = 'LUNA',
  loading_screen_tagline = 'Product Owner • Luxury Retail'
WHERE
  loading_screen_first_name IS NULL; -- Only update if not already migrated
