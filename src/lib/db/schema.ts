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

  // About Section
  aboutTitle: text('about_title'),
  aboutDescription: text('about_description'),
  aboutMainText: text('about_main_text'),
  aboutSecondaryText: text('about_secondary_text'),
  aboutQuote: text('about_quote'),

  // Experience Section
  experienceTitle: text('experience_title'),
  experienceSubtitle: text('experience_subtitle'),
  experiences: jsonb('experiences').default([]),

  // Skills Section
  skillsTitle: text('skills_title'),
  skillsSubtitle: text('skills_subtitle'),
  skillsDescription: text('skills_description'),
  skillCategories: jsonb('skill_categories').default([]),
  certifications: jsonb('certifications').default([]),
  tools: jsonb('tools').default([]),
  skillsQuote: text('skills_quote'),

  // Achievements
  achievementsTitle: text('achievements_title'),
  achievements: jsonb('achievements').default([]),

  // Contact Section
  contactTitle: text('contact_title'),
  contactSubtitle: text('contact_subtitle'),
  contactDescription: text('contact_description'),

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