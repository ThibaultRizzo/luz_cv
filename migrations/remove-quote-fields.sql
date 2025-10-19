-- Migration: Remove quote fields
-- Removes aboutQuote, aboutQuoteAuthor, skillsQuote, skillsQuoteAuthor, and skillsToolsTitle columns
-- Date: 2025-10-19

-- Remove About section quote fields
ALTER TABLE content DROP COLUMN IF EXISTS about_quote;
ALTER TABLE content DROP COLUMN IF EXISTS about_quote_author;

-- Remove Skills section quote fields
ALTER TABLE content DROP COLUMN IF EXISTS skills_quote;
ALTER TABLE content DROP COLUMN IF EXISTS skills_quote_author;
ALTER TABLE content DROP COLUMN IF EXISTS skills_tools_title;

