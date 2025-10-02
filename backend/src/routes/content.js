const express = require('express');
const { body, validationResult } = require('express-validator');

const Content = require('../models/Content');
const ContentBackup = require('../models/ContentBackup');
const { authenticate, authorize } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// Validation schemas
const contentValidation = [
    // Hero Section
    body('heroTitle').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Hero title must be between 1 and 200 characters'),
    body('heroSubtitle').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Hero subtitle must be between 1 and 200 characters'),
    body('heroDescription').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('Hero description must be between 1 and 1000 characters'),

    // About Section
    body('aboutTitle').optional().trim().isLength({ min: 1, max: 200 }).withMessage('About title must be between 1 and 200 characters'),
    body('aboutDescription').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('About description must be between 1 and 1000 characters'),
    body('aboutMainText').optional().trim().isLength({ min: 1, max: 2000 }).withMessage('About main text must be between 1 and 2000 characters'),
    body('aboutSecondaryText').optional().trim().isLength({ min: 1, max: 2000 }).withMessage('About secondary text must be between 1 and 2000 characters'),
    body('aboutQuote').optional().trim().isLength({ min: 1, max: 500 }).withMessage('About quote must be between 1 and 500 characters'),

    // Experience Section
    body('experienceTitle').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Experience title must be between 1 and 200 characters'),
    body('experienceSubtitle').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Experience subtitle must be between 1 and 200 characters'),
    body('experiences').optional().isArray().withMessage('Experiences must be an array'),
    body('experiences.*.role').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Experience role must be between 1 and 100 characters'),
    body('experiences.*.company').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Experience company must be between 1 and 100 characters'),
    body('experiences.*.period').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Experience period must be between 1 and 50 characters'),
    body('experiences.*.location').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Experience location must be between 1 and 100 characters'),
    body('experiences.*.achievements').optional().isArray().withMessage('Experience achievements must be an array'),
    body('experiences.*.highlight').optional().trim().isLength({ min: 1, max: 300 }).withMessage('Experience highlight must be between 1 and 300 characters'),

    // Skills Section
    body('skillsTitle').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Skills title must be between 1 and 200 characters'),
    body('skillsSubtitle').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Skills subtitle must be between 1 and 200 characters'),
    body('skillsDescription').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('Skills description must be between 1 and 1000 characters'),
    body('skillsQuote').optional().trim().isLength({ min: 1, max: 500 }).withMessage('Skills quote must be between 1 and 500 characters'),
    body('skillCategories').optional().isArray().withMessage('Skill categories must be an array'),
    body('certifications').optional().isArray().withMessage('Certifications must be an array'),
    body('tools').optional().isArray().withMessage('Tools must be an array'),

    // Achievements Section
    body('achievementsTitle').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Achievements title must be between 1 and 200 characters'),
    body('achievements').optional().isArray().withMessage('Achievements must be an array'),
    body('achievements.*.metric').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Achievement metric must be between 1 and 50 characters'),
    body('achievements.*.description').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Achievement description must be between 1 and 200 characters'),

    // Contact Section
    body('contactTitle').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Contact title must be between 1 and 200 characters'),
    body('contactSubtitle').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Contact subtitle must be between 1 and 200 characters'),
    body('contactDescription').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('Contact description must be between 1 and 1000 characters')
];

/**
 * @route   GET /api/content
 * @desc    Get active content
 * @access  Public
 */
router.get('/', asyncHandler(async (req, res) => {
    let content = await Content.getActiveContent();

    // If no content exists, create default content
    if (!content) {
        content = new Content({});
        await content.save();
    }

    res.status(200).json({
        success: true,
        data: content
    });
}));

/**
 * @route   GET /api/content/admin
 * @desc    Get content with admin details
 * @access  Private (Admin only)
 */
router.get('/admin', authenticate, authorize(['admin']), asyncHandler(async (req, res) => {
    const content = await Content.getActiveContent();

    if (!content) {
        return res.status(404).json({
            success: false,
            message: 'Content not found'
        });
    }

    res.status(200).json({
        success: true,
        data: content
    });
}));

/**
 * @route   PUT /api/content
 * @desc    Update content
 * @access  Private (Admin only)
 */
router.put('/', authenticate, authorize(['admin']), contentValidation, asyncHandler(async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    let content = await Content.findOne({ isActive: true });

    if (!content) {
        // Create new content if none exists
        content = new Content(req.body);
        content.lastModifiedBy = req.user._id;
    } else {
        // Create backup before updating
        await content.createBackup();

        // Update existing content
        Object.assign(content, req.body);
        content.lastModifiedBy = req.user._id;
        content.version += 1;
    }

    await content.save();

    // Populate lastModifiedBy field
    await content.populate('lastModifiedBy', 'username');

    res.status(200).json({
        success: true,
        message: 'Content updated successfully',
        data: content
    });
}));

/**
 * @route   PATCH /api/content/section/:section
 * @desc    Update specific section
 * @access  Private (Admin only)
 */
router.patch('/section/:section', authenticate, authorize(['admin']), asyncHandler(async (req, res) => {
    const { section } = req.params;
    const allowedSections = ['hero', 'about', 'experience', 'skills', 'achievements', 'contact'];

    if (!allowedSections.includes(section)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid section name'
        });
    }

    let content = await Content.findOne({ isActive: true });

    if (!content) {
        content = new Content({});
    } else {
        // Create backup before updating
        await content.createBackup();
        content.version += 1;
    }

    // Update only fields related to the specific section
    const sectionFields = getSectionFields(section);
    const updateData = {};

    for (const field of sectionFields) {
        if (req.body[field] !== undefined) {
            updateData[field] = req.body[field];
        }
    }

    Object.assign(content, updateData);
    content.lastModifiedBy = req.user._id;

    await content.save();
    await content.populate('lastModifiedBy', 'username');

    res.status(200).json({
        success: true,
        message: `${section} section updated successfully`,
        data: content
    });
}));

/**
 * @route   GET /api/content/backups
 * @desc    Get content backups
 * @access  Private (Admin only)
 */
router.get('/backups', authenticate, authorize(['admin']), asyncHandler(async (req, res) => {
    const { limit = 20, page = 1 } = req.query;
    const content = await Content.findOne({ isActive: true });

    if (!content) {
        return res.status(404).json({
            success: false,
            message: 'Content not found'
        });
    }

    const backups = await ContentBackup.getBackupsForContent(content._id, parseInt(limit));

    res.status(200).json({
        success: true,
        data: {
            backups,
            total: backups.length,
            page: parseInt(page),
            limit: parseInt(limit)
        }
    });
}));

/**
 * @route   POST /api/content/restore/:backupId
 * @desc    Restore content from backup
 * @access  Private (Admin only)
 */
router.post('/restore/:backupId', authenticate, authorize(['admin']), asyncHandler(async (req, res) => {
    const { backupId } = req.params;

    try {
        const restoredContent = await ContentBackup.restoreFromBackup(backupId);

        if (!restoredContent) {
            return res.status(404).json({
                success: false,
                message: 'Backup not found'
            });
        }

        // Update metadata
        restoredContent.lastModifiedBy = req.user._id;
        restoredContent.version += 1;
        await restoredContent.save();

        await restoredContent.populate('lastModifiedBy', 'username');

        res.status(200).json({
            success: true,
            message: 'Content restored successfully',
            data: restoredContent
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}));

/**
 * Helper function to get fields for a specific section
 */
function getSectionFields(section) {
    const sectionMap = {
        hero: ['heroTitle', 'heroSubtitle', 'heroDescription'],
        about: ['aboutTitle', 'aboutDescription', 'aboutMainText', 'aboutSecondaryText', 'aboutQuote'],
        experience: ['experienceTitle', 'experienceSubtitle', 'experiences'],
        skills: ['skillsTitle', 'skillsSubtitle', 'skillsDescription', 'skillCategories', 'certifications', 'tools', 'skillsQuote'],
        achievements: ['achievementsTitle', 'achievements'],
        contact: ['contactTitle', 'contactSubtitle', 'contactDescription']
    };

    return sectionMap[section] || [];
}

module.exports = router;