const mongoose = require('mongoose');

const contentBackupSchema = new mongoose.Schema({
    originalId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Content'
    },
    backedUpAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    backedUpBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // All the same fields as Content model for full backup
    heroTitle: String,
    heroSubtitle: String,
    heroDescription: String,
    aboutTitle: String,
    aboutDescription: String,
    aboutMainText: String,
    aboutSecondaryText: String,
    aboutQuote: String,
    experienceTitle: String,
    experienceSubtitle: String,
    experiences: [{
        role: String,
        company: String,
        period: String,
        location: String,
        achievements: [String],
        highlight: String
    }],
    skillsTitle: String,
    skillsSubtitle: String,
    skillsDescription: String,
    skillCategories: [{
        category: String,
        icon: String,
        skills: [{
            name: String,
            level: Number
        }]
    }],
    certifications: [String],
    tools: [String],
    skillsQuote: String,
    achievementsTitle: String,
    achievements: [{
        metric: String,
        description: String
    }],
    contactTitle: String,
    contactSubtitle: String,
    contactDescription: String,
    version: Number,
    lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

// Indexes for efficient querying
contentBackupSchema.index({ originalId: 1, backedUpAt: -1 });
contentBackupSchema.index({ backedUpAt: -1 });

// TTL index to automatically delete old backups after 90 days
contentBackupSchema.index({ backedUpAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

// Static method to get backups for a content item
contentBackupSchema.statics.getBackupsForContent = function(contentId, limit = 10) {
    return this.find({ originalId: contentId })
        .populate('backedUpBy', 'username')
        .sort({ backedUpAt: -1 })
        .limit(limit);
};

// Static method to restore from backup
contentBackupSchema.statics.restoreFromBackup = async function(backupId) {
    const Content = mongoose.model('Content');
    const backup = await this.findById(backupId);

    if (!backup) {
        throw new Error('Backup not found');
    }

    const contentData = backup.toObject();
    delete contentData._id;
    delete contentData.originalId;
    delete contentData.backedUpAt;
    delete contentData.backedUpBy;
    delete contentData.createdAt;
    delete contentData.updatedAt;
    delete contentData.__v;

    return Content.findByIdAndUpdate(
        backup.originalId,
        contentData,
        { new: true, runValidators: true }
    );
};

module.exports = mongoose.model('ContentBackup', contentBackupSchema);