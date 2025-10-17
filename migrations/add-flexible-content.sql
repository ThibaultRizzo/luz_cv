-- Add new columns to content table for full flexibility

-- Hero Section additions
ALTER TABLE content ADD COLUMN IF NOT EXISTS hero_badge TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS hero_stats JSONB DEFAULT '[]';
ALTER TABLE content ADD COLUMN IF NOT EXISTS hero_cta_text TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS hero_scroll_text TEXT;

-- About Section additions
ALTER TABLE content ADD COLUMN IF NOT EXISTS about_badge TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS about_title_suffix TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS about_approach_title TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS about_approach_items JSONB DEFAULT '[]';
ALTER TABLE content ADD COLUMN IF NOT EXISTS about_impact_title TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS about_impact_metrics JSONB DEFAULT '[]';
ALTER TABLE content ADD COLUMN IF NOT EXISTS about_quote_author TEXT;

-- Experience Section additions
ALTER TABLE content ADD COLUMN IF NOT EXISTS experience_badge TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS experience_bottom_stats JSONB DEFAULT '[]';

-- Skills Section additions
ALTER TABLE content ADD COLUMN IF NOT EXISTS skills_badge TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS skills_certifications_title TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS skills_tools_title TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS skills_quote_author TEXT;

-- Contact Section additions
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_badge TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_form_title TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_form_labels JSONB DEFAULT '{}';
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_form_placeholders JSONB DEFAULT '{}';
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_submit_button TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_success_message TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_error_message TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_info_title TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_linkedin TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_phone TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_availability_title TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_availability_status TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_availability_description TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_availability_items JSONB DEFAULT '[]';
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_download_text TEXT;
ALTER TABLE content ADD COLUMN IF NOT EXISTS contact_bottom_info JSONB DEFAULT '{}';

-- Populate default values for existing content
UPDATE content SET
  -- Hero defaults
  hero_badge = 'Product Owner • Luxury Retail Expert',
  hero_stats = '[{"metric":"10+","label":"Years Experience"},{"metric":"€50M+","label":"Revenue Impact"},{"metric":"25+","label":"Products Launched"}]'::jsonb,
  hero_cta_text = 'Let''s create something extraordinary',
  hero_scroll_text = 'Scroll',

  -- About defaults
  about_badge = 'About Me',
  about_title_suffix = 'reality',
  about_approach_title = 'My Approach',
  about_approach_items = '[{"title":"Customer-First Philosophy","description":"Every decision starts with understanding the customer''s deepest needs and desires"},{"title":"Data-Driven Innovation","description":"Combining intuition with analytics to create breakthrough solutions"},{"title":"Cross-Functional Leadership","description":"Building bridges between teams to deliver cohesive, impactful products"}]'::jsonb,
  about_impact_title = 'Impact at a Glance',
  about_impact_metrics = '[{"metric":"€50M+","label":"Revenue Generated"},{"metric":"40%","label":"Avg Growth Rate"},{"metric":"25+","label":"Products Launched"},{"metric":"15+","label":"Teams Led"}]'::jsonb,
  about_quote_author = '— Luz Quintanar',

  -- Experience defaults
  experience_badge = 'Career Journey',
  experience_bottom_stats = '[{"metric":"10+","label":"Years"},{"metric":"€50M+","label":"Impact"},{"metric":"25+","label":"Products"}]'::jsonb,

  -- Skills defaults
  skills_badge = 'Core Expertise',
  skills_certifications_title = '🏆 Certifications',
  skills_tools_title = '🛠️ Tools & Platforms',
  skills_quote_author = '— Luz Quintanar',

  -- Contact defaults
  contact_badge = 'Let''s Connect',
  contact_form_title = 'Send a Message',
  contact_form_labels = '{"name":"Full Name *","email":"Email Address *","company":"Company","message":"Message *"}'::jsonb,
  contact_form_placeholders = '{"name":"Your name","email":"your@email.com","company":"Your company","message":"Tell me about your project or opportunity..."}'::jsonb,
  contact_submit_button = 'Send Message',
  contact_success_message = 'Thank you! Your message has been sent successfully.',
  contact_error_message = 'Sorry, there was an error sending your message. Please try again.',
  contact_info_title = 'Get in Touch Directly',
  contact_email = 'luz.quintanar@email.com',
  contact_linkedin = 'linkedin.com/in/luzquintanar',
  contact_phone = '+33 1 23 45 67 89',
  contact_availability_title = 'Current Availability',
  contact_availability_status = 'Available for new opportunities',
  contact_availability_description = 'I''m currently exploring exciting product leadership roles in luxury retail and fashion tech. Let''s discuss how I can help transform your business.',
  contact_availability_items = '["• Strategic consulting projects","• Full-time product leadership roles","• Speaking engagements & workshops"]'::jsonb,
  contact_download_text = 'Download Full Portfolio',
  contact_bottom_info = '{"responseTime":{"label":"Response Time","value":"24h"},"location":{"label":"Based in","value":"Paris"},"languages":{"label":"Languages","value":"EN • FR • ESP"}}'::jsonb
WHERE
  hero_badge IS NULL; -- Only update if not already migrated
