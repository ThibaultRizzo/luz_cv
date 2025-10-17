import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
  role: text('role').default('admin').notNull(),
  refreshTokens: jsonb('refresh_tokens').default([]),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const content = pgTable('content', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),

  // Hero Section
  heroTitle: text('hero_title'),
  heroSubtitle: text('hero_subtitle'),
  heroDescription: text('hero_description'),
  heroBadge: text('hero_badge'),
  heroImage: text('hero_image').default('/luz.png'),
  heroStats: jsonb('hero_stats').default([]),
  heroCtaText: text('hero_cta_text'),
  heroScrollText: text('hero_scroll_text'),
  headerFont: text('header_font').default('playfair'),

  // Loading Screen
  loadingScreenFirstName: text('loading_screen_first_name').default('LUZ'),
  loadingScreenLastName: text('loading_screen_last_name').default('QUINTANAR'),
  loadingScreenTagline: text('loading_screen_tagline').default('Product Owner • Luxury Retail'),

  // About Section
  aboutTitle: text('about_title'),
  aboutDescription: text('about_description'),
  aboutMainText: text('about_main_text'),
  aboutSecondaryText: text('about_secondary_text'),
  aboutQuote: text('about_quote'),
  aboutBadge: text('about_badge'),
  aboutTitleSuffix: text('about_title_suffix'),
  aboutApproachTitle: text('about_approach_title'),
  aboutApproachItems: jsonb('about_approach_items').default([]),
  aboutImpactTitle: text('about_impact_title'),
  aboutImpactMetrics: jsonb('about_impact_metrics').default([]),
  aboutQuoteAuthor: text('about_quote_author'),

  // Experience Section
  experienceTitle: text('experience_title'),
  experienceSubtitle: text('experience_subtitle'),
  experiences: jsonb('experiences').default([]),
  experienceBadge: text('experience_badge'),
  experienceBottomStats: jsonb('experience_bottom_stats').default([]),

  // Skills Section
  skillsTitle: text('skills_title'),
  skillsSubtitle: text('skills_subtitle'),
  skillsDescription: text('skills_description'),
  skillCategories: jsonb('skill_categories').default([]),
  certifications: jsonb('certifications').default([]),
  tools: jsonb('tools').default([]),
  skillsQuote: text('skills_quote'),
  skillsBadge: text('skills_badge'),
  skillsCertificationsTitle: text('skills_certifications_title'),
  skillsToolsTitle: text('skills_tools_title'),
  skillsQuoteAuthor: text('skills_quote_author'),
  softSkills: jsonb('soft_skills').default([]),
  skillsSoftSkillsTitle: text('skills_soft_skills_title').default('Leadership & Soft Skills'),

  // Achievements
  achievementsTitle: text('achievements_title'),
  achievements: jsonb('achievements').default([]),

  // Contact Section
  contactTitle: text('contact_title'),
  contactSubtitle: text('contact_subtitle'),
  contactDescription: text('contact_description'),
  contactBadge: text('contact_badge'),
  contactFormTitle: text('contact_form_title'),
  contactFormLabels: jsonb('contact_form_labels').default({}),
  contactFormPlaceholders: jsonb('contact_form_placeholders').default({}),
  contactSubmitButton: text('contact_submit_button'),
  contactSuccessMessage: text('contact_success_message'),
  contactErrorMessage: text('contact_error_message'),
  contactInfoTitle: text('contact_info_title'),
  contactEmail: text('contact_email'),
  contactLinkedin: text('contact_linkedin'),
  contactPhone: text('contact_phone'),
  contactAvailabilityTitle: text('contact_availability_title'),
  contactAvailabilityStatus: text('contact_availability_status'),
  contactAvailabilityDescription: text('contact_availability_description'),
  contactAvailabilityItems: jsonb('contact_availability_items').default([]),
  contactDownloadText: text('contact_download_text'),
  contactCvPath: text('contact_cv_path').default('/cv.pdf'),
  contactBottomInfo: jsonb('contact_bottom_info').default({}),

  // Meta
  version: integer('version').default(1).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  lastModifiedBy: text('last_modified_by').references(() => users.id),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const contentBackups = pgTable('content_backups', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  contentId: text('content_id').references(() => content.id).notNull(),
  backupData: jsonb('backup_data').notNull(),
  version: integer('version').notNull(),
  createdBy: text('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Types for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Content = typeof content.$inferSelect;
export type NewContent = typeof content.$inferInsert;
export type ContentBackup = typeof contentBackups.$inferSelect;
export type NewContentBackup = typeof contentBackups.$inferInsert;