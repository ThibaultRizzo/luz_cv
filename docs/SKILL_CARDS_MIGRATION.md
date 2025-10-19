# Skill Cards Migration Guide

## Overview

The Skills section has been completely redesigned to use a card-based layout with the following features:
- Icons (emoji or uploaded images)
- Title and description for each card
- Flexible width (50% or 100% of screen width)
- No more percentage-based progress bars
- No more skill categories structure

**Note:** The old `skillCategories` structure has been completely removed. This migration is irreversible.

## Migration Completed ✅

The migration from the old skill categories to the new skill cards has been successfully completed:

1. ✅ Added `skill_cards` column to the database
2. ✅ Migrated existing skill categories data to skill cards
3. ✅ Removed old `skill_categories` column from database
4. ✅ Updated all code to use only skill cards

## Using the New Skill Cards

### In the Backoffice

1. Navigate to the backoffice (`/luz/backoffice`)
2. Scroll to the "Skills Section"
3. You'll see a new section called "Skill Cards (New Design)"
4. Click "Add Skill Card" to create a new card

For each card, you can configure:
- **Title**: The main heading for the skill
- **Description**: A detailed description of the skill or competency
- **Icon Type**: Choose between:
  - **Emoji**: Select from a picker or paste unicode emoji
  - **Upload Image**: Upload your own icon/image file
- **Card Width**: Choose between:
  - **50% Width**: Card takes half the screen (on desktop)
  - **100% Width**: Card takes the full width

### Data Structure

The skill cards are stored in the `skill_cards` JSON column with the following structure:

```json
[
  {
    "title": "Product Strategy",
    "description": "Crafting comprehensive product strategies that align with business goals and customer needs.",
    "icon": "🎯",
    "iconType": "emoji",
    "width": "half"
  },
  {
    "title": "Team Leadership",
    "description": "Leading cross-functional teams to deliver exceptional results.",
    "icon": "/uploads/leadership-icon.png",
    "iconType": "upload",
    "width": "full"
  }
]
```

### Icon Types

- **emoji**: The `icon` field contains a unicode emoji character
- **upload**: The `icon` field contains a path to an uploaded image file

### Width Options

- **half**: Card takes 50% width on desktop (full width on mobile)
- **full**: Card always takes 100% width

## What Changed

### Code Changes
- **Database Schema**: Removed `skill_categories` column, kept only `skill_cards`
- **Skills Component**: Now only uses skill cards, no fallback to old structure
- **Backoffice**: Removed all skill category management UI, only skill cards remain
- **TypeScript Types**: Removed `SkillCategory` interface

### Migration Process
1. Created new `skill_cards` column
2. Converted existing skill categories to skill cards (each category became a card)
3. Removed old skill category management code
4. Dropped `skill_categories` column from database

## Notes

- All your existing skill categories were automatically converted to skill cards
- Each skill category became a card with:
  - Title: The category name
  - Description: List of skills from that category
  - Icon: The category emoji
  - Width: Set to 50% (half width)
- You can now edit these cards in the backoffice and adjust as needed
- Uploaded icons are stored in the `/public/uploads/` directory
- Supported image formats: JPG, PNG, WebP, SVG
- Cards automatically adjust to mobile layouts

