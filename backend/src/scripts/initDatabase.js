const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Content = require('../models/Content');
const { connectDB } = require('../config/database');

const defaultContent = {
    heroTitle: "Ready to create",
    heroSubtitle: "something extraordinary?",
    heroDescription: "Transforming luxury retail experiences through innovative product leadership and strategic vision.",
    aboutTitle: "Turning vision into reality",
    aboutDescription: "Experienced product leader with a passion for luxury retail and fashion technology.",
    aboutMainText: "I am a visionary Product Owner with over a decade of experience transforming luxury retail landscapes through strategic innovation and customer-obsessed design.",
    aboutSecondaryText: "My expertise lies in bridging the gap between ambitious business goals and exceptional user experiences. I've built my career on one fundamental belief: premium products deserve premium experiences.",
    aboutQuote: "Excellence isn't a destination—it's a mindset that transforms every touchpoint into an opportunity for delight.",
    experienceTitle: "A decade of",
    experienceSubtitle: "transformation",
    experiences: [
        {
            role: "Senior Product Owner",
            company: "Maison Lumière",
            period: "2018 - Present",
            location: "Paris, France",
            achievements: [
                "Spearheaded digital transformation resulting in €25M+ revenue increase",
                "Led cross-functional teams of 15+ across 3 countries",
                "Launched omnichannel platform serving 2M+ customers globally",
                "Achieved 40% increase in online conversion rates"
            ],
            highlight: "Transformed traditional luxury retail into digital-first experiences"
        },
        {
            role: "Product Manager",
            company: "RetailTech Innovations",
            period: "2015 - 2018",
            location: "London, UK",
            achievements: [
                "Managed €15M product portfolio across 8 retail brands",
                "Increased customer engagement by 35% through AI-driven personalization",
                "Reduced time-to-market by 50% with agile methodologies",
                "Built and scaled product team from 5 to 20 members"
            ],
            highlight: "Pioneered data-driven product strategies in luxury retail"
        },
        {
            role: "Junior Product Manager",
            company: "Fashion Forward Startup",
            period: "2012 - 2015",
            location: "Milan, Italy",
            achievements: [
                "Co-launched mobile app with 500K+ downloads in first year",
                "Featured in Vogue Business and WWD for innovation",
                "Grew user base by 300% through strategic partnerships",
                "Established product development processes from ground up"
            ],
            highlight: "Laid foundation for product excellence in emerging fashion tech"
        }
    ],
    skillsTitle: "Mastery through",
    skillsSubtitle: "experience",
    skillsDescription: "A decade of hands-on experience has shaped these core competencies that drive exceptional results in luxury retail product management.",
    skillCategories: [
        {
            category: "Product Leadership",
            icon: "🎯",
            skills: [
                { name: "Product Strategy", level: 95 },
                { name: "Roadmap Planning", level: 90 },
                { name: "Stakeholder Management", level: 92 },
                { name: "Cross-functional Leadership", level: 88 }
            ]
        },
        {
            category: "Retail Excellence",
            icon: "🏪",
            skills: [
                { name: "Luxury Retail Strategy", level: 95 },
                { name: "Omnichannel Experience", level: 90 },
                { name: "Customer Journey Mapping", level: 85 },
                { name: "Brand Positioning", level: 88 }
            ]
        },
        {
            category: "Digital Innovation",
            icon: "⚡",
            skills: [
                { name: "Digital Transformation", level: 92 },
                { name: "E-commerce Platforms", level: 88 },
                { name: "Data Analytics", level: 85 },
                { name: "AI/ML Applications", level: 80 }
            ]
        },
        {
            category: "Business Impact",
            icon: "📈",
            skills: [
                { name: "Revenue Growth", level: 95 },
                { name: "Market Expansion", level: 88 },
                { name: "Process Optimization", level: 90 },
                { name: "Team Scaling", level: 85 }
            ]
        }
    ],
    certifications: [
        "Certified Scrum Product Owner (CSPO)",
        "Google Analytics Certified",
        "Luxury Brand Management (HEC Paris)",
        "Design Thinking Practitioner"
    ],
    tools: ["Jira", "Figma", "Shopify Plus", "Salesforce", "Tableau", "Miro", "Slack", "Notion"],
    skillsQuote: "Skills are built through challenges, refined through experience, and perfected through passion.",
    achievementsTitle: "Achievements",
    achievements: [
        { metric: "+40%", description: "Increase in Online Sales" },
        { metric: "+25%", description: "Customer Retention in 1 Year" },
        { metric: "10+", description: "New Boutiques Opened Worldwide" },
        { metric: "+30%", description: "Improvement in Customer Engagement" }
    ],
    contactTitle: "Ready to create",
    contactSubtitle: "something extraordinary?",
    contactDescription: "Whether you're looking to transform your luxury retail experience or explore new product opportunities, I'd love to hear from you."
};

const initDatabase = async () => {
    try {
        console.log('🔄 Connecting to database...');
        await connectDB();

        // Create admin user if doesn't exist
        const adminExists = await User.findOne({ username: process.env.ADMIN_USERNAME });

        if (!adminExists) {
            console.log('👤 Creating admin user...');
            const adminUser = new User({
                username: process.env.ADMIN_USERNAME || 'mia',
                password: process.env.ADMIN_PASSWORD || 'himiko',
                role: 'admin'
            });

            await adminUser.save();
            console.log('✅ Admin user created successfully');
        } else {
            console.log('👤 Admin user already exists');
        }

        // Create default content if doesn't exist
        const contentExists = await Content.findOne({ isActive: true });

        if (!contentExists) {
            console.log('📝 Creating default content...');
            const content = new Content(defaultContent);
            content.lastModifiedBy = adminExists ? adminExists._id : (await User.findOne({ username: process.env.ADMIN_USERNAME }))._id;

            await content.save();
            console.log('✅ Default content created successfully');
        } else {
            console.log('📝 Content already exists');
        }

        console.log('🎉 Database initialization completed successfully!');
        console.log('🔐 Admin credentials:');
        console.log(`   Username: ${process.env.ADMIN_USERNAME || 'mia'}`);
        console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'himiko'}`);

    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('📊 Database connection closed');
        process.exit(0);
    }
};

// Run if called directly
if (require.main === module) {
    initDatabase();
}

module.exports = { initDatabase, defaultContent };