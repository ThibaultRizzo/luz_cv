const mongoose = require('mongoose');

// Sub-schemas for complex nested structures
const experienceSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    period: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    achievements: [{
        type: String,
        trim: true
    }],
    highlight: {
        type: String,
        required: true,
        trim: true
    }
}, { _id: true });

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    level: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
}, { _id: false });

const skillCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        required: true,
        trim: true
    },
    skills: [skillSchema]
}, { _id: true });

const achievementSchema = new mongoose.Schema({
    metric: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, { _id: true });

// Main content schema
const contentSchema = new mongoose.Schema({
    // Hero Section
    heroTitle: {
        type: String,
        required: true,
        trim: true,
        default: 'Ready to create'
    },
    heroSubtitle: {
        type: String,
        required: true,
        trim: true,
        default: 'something extraordinary?'
    },
    heroDescription: {
        type: String,
        required: true,
        trim: true,
        default: 'Transforming luxury retail experiences through innovative product leadership and strategic vision.'
    },

    // About Section
    aboutTitle: {
        type: String,
        required: true,
        trim: true,
        default: 'Turning vision into reality'
    },
    aboutDescription: {
        type: String,
        required: true,
        trim: true,
        default: 'Experienced product leader with a passion for luxury retail and fashion technology.'
    },
    aboutMainText: {
        type: String,
        required: true,
        trim: true,
        default: 'I am a visionary Product Owner with over a decade of experience transforming luxury retail landscapes through strategic innovation and customer-obsessed design.'
    },
    aboutSecondaryText: {
        type: String,
        required: true,
        trim: true,
        default: 'My expertise lies in bridging the gap between ambitious business goals and exceptional user experiences. I\'ve built my career on one fundamental belief: premium products deserve premium experiences.'
    },
    aboutQuote: {
        type: String,
        required: true,
        trim: true,
        default: 'Excellence isn\'t a destination—it\'s a mindset that transforms every touchpoint into an opportunity for delight.'
    },

    // Experience Section
    experienceTitle: {
        type: String,
        required: true,
        trim: true,
        default: 'A decade of'
    },
    experienceSubtitle: {
        type: String,
        required: true,
        trim: true,
        default: 'transformation'
    },
    experiences: {
        type: [experienceSchema],
        default: []
    },

    // Skills Section
    skillsTitle: {
        type: String,
        required: true,
        trim: true,
        default: 'Mastery through'
    },
    skillsSubtitle: {
        type: String,
        required: true,
        trim: true,
        default: 'experience'
    },
    skillsDescription: {
        type: String,
        required: true,
        trim: true,
        default: 'A decade of hands-on experience has shaped these core competencies that drive exceptional results in luxury retail product management.'
    },
    skillCategories: {
        type: [skillCategorySchema],
        default: []
    },
    certifications: [{
        type: String,
        trim: true
    }],
    tools: [{
        type: String,
        trim: true
    }],
    skillsQuote: {
        type: String,
        required: true,
        trim: true,
        default: 'Skills are built through challenges, refined through experience, and perfected through passion.'
    },

    // Achievements Section
    achievementsTitle: {
        type: String,
        required: true,
        trim: true,
        default: 'Achievements'
    },
    achievements: {
        type: [achievementSchema],
        default: []
    },

    // Contact Section
    contactTitle: {
        type: String,
        required: true,
        trim: true,
        default: 'Ready to create'
    },
    contactSubtitle: {
        type: String,
        required: true,
        trim: true,
        default: 'something extraordinary?'
    },
    contactDescription: {
        type: String,
        required: true,
        trim: true,
        default: 'Whether you\'re looking to transform your luxury retail experience or explore new product opportunities, I\'d love to hear from you.'
    },

    // Metadata
    version: {
        type: Number,
        default: 1
    },
    lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

// Indexes for performance
contentSchema.index({ isActive: 1 });
contentSchema.index({ updatedAt: -1 });
contentSchema.index({ lastModifiedBy: 1 });

// Static method to get active content
contentSchema.statics.getActiveContent = function() {
    return this.findOne({ isActive: true }).populate('lastModifiedBy', 'username');
};

// Instance method to create backup before update
contentSchema.methods.createBackup = function() {
    const ContentBackup = mongoose.model('ContentBackup');
    const backup = new ContentBackup(this.toObject());
    backup.originalId = this._id;
    backup.backedUpAt = new Date();
    return backup.save();
};

module.exports = mongoose.model('Content', contentSchema);