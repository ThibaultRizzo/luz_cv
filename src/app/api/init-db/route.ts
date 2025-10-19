import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db/connection';
import { users, content } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { initializeDatabase } from '@/lib/db/connection';

export async function POST() {
  try {
    // Initialize database tables
    await initializeDatabase();

    const adminUsername = process.env.ADMIN_USERNAME || 'mia';
    const adminPassword = process.env.ADMIN_PASSWORD || 'himiko';

    // Check if admin user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, adminUsername))
      .limit(1);

    if (existingUser.length === 0) {
      // Create admin user
      const hashedPassword = await bcrypt.hash(adminPassword, 12);

      await db.insert(users).values({
        username: adminUsername,
        password: hashedPassword,
        role: 'admin',
      });
    }

    // Check if content exists
    const existingContent = await db
      .select()
      .from(content)
      .where(eq(content.isActive, true))
      .limit(1);

    if (existingContent.length === 0) {
      // Create initial content with complete luxury retail data
      await db.insert(content).values({
        // Hero Section
        heroTitle: "Ready to create",
        heroSubtitle: "something extraordinary?",
        heroDescription: "Transforming luxury retail experiences through innovative product leadership and strategic vision.",
        heroBadge: "Product Owner • Luxury Retail Expert",
        heroImage: "/luz.jpg",
        heroStats: [
          { metric: "10+", label: "Years Experience" },
          { metric: "€50M+", label: "Revenue Impact" },
          { metric: "25+", label: "Products Launched" }
        ],
        heroCtaText: "Let's Craft Excellence Together",
        heroScrollText: "Scroll",

        // About Section
        aboutTitle: "Turning vision into",
        aboutTitleSuffix: "reality",
        aboutDescription: "Experienced product leader with a passion for luxury retail and fashion technology.",
        aboutBadge: "About Me",
        aboutMainText: "I am a visionary Product Owner with over a decade of experience transforming luxury retail landscapes through strategic innovation and customer-obsessed design.",
        aboutSecondaryText: "My expertise lies in bridging the gap between ambitious business goals and exceptional user experiences. I've built my career on one fundamental belief: premium products deserve premium experiences.",
        aboutApproachTitle: "My Approach",
        aboutApproachItems: [
          { title: "Customer-First Philosophy", description: "Every decision starts with understanding the customer's deepest needs and desires" },
          { title: "Data-Driven Innovation", description: "Combining intuition with analytics to create breakthrough solutions" },
          { title: "Cross-Functional Leadership", description: "Building bridges between teams to deliver cohesive, impactful products" }
        ],
        aboutImpactTitle: "Impact at a Glance",
        aboutImpactMetrics: [
          { metric: "€50M+", label: "Revenue Generated" },
          { metric: "40%", label: "Avg Growth Rate" },
          { metric: "25+", label: "Products Launched" },
          { metric: "15+", label: "Teams Led" }
        ],

        // Experience Section
        experienceTitle: "A decade of",
        experienceSubtitle: "transformation",
        experienceBadge: "Career Journey",
        experienceBottomStats: [
          { metric: "10+", label: "Years" },
          { metric: "€50M+", label: "Impact" },
          { metric: "25+", label: "Products" }
        ],
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

        // Skills Section
        skillsTitle: "Mastery through",
        skillsSubtitle: "experience",
        skillsBadge: "Core Expertise",
        skillsDescription: "A decade of hands-on experience has shaped these core competencies that drive exceptional results in luxury retail product management.",
        skillsCertificationsTitle: "🏆 Certifications",
        skillsToolsTitle: "🛠️ Tools & Platforms",
        skillCards: [],
        certifications: [
          "Certified Scrum Product Owner (CSPO)",
          "Google Analytics Certified",
          "Luxury Brand Management (HEC Paris)",
          "Design Thinking Practitioner"
        ],
        tools: ["Jira", "Figma", "Shopify Plus", "Salesforce", "Tableau", "Miro", "Slack", "Notion"],
        softSkills: [
          { skill: "Executive Stakeholder Management", icon: "🤝" },
          { skill: "Cross-Cultural Communication", icon: "🌍" },
          { skill: "Luxury Customer Psychology", icon: "✨" },
          { skill: "Change Management", icon: "🔄" }
        ],

        // Contact Section
        contactTitle: "Ready to create",
        contactSubtitle: "something extraordinary?",
        contactBadge: "Let's Connect",
        contactDescription: "Whether you're looking to transform your luxury retail experience or explore new product opportunities, I'd love to hear from you.",
        contactFormTitle: "Send a Message",
        contactFormLabels: {
          name: "Name",
          email: "Email",
          company: "Company",
          message: "Message"
        },
        contactFormPlaceholders: {
          name: "Your name",
          email: "your.email@example.com",
          company: "Your company",
          message: "Tell me about your project..."
        },
        contactSubmitButton: "Send Message",
        contactSuccessMessage: "Thank you! Your message has been sent successfully.",
        contactErrorMessage: "Sorry, there was an error sending your message. Please try again.",
        contactInfoTitle: "Contact Information",
        contactEmail: "luz.quintanar@example.com",
        contactLinkedin: "linkedin.com/in/luzquintanar",
        contactPhone: "+33 6 12 34 56 78",
        contactAvailabilityTitle: "Availability",
        contactAvailabilityStatus: "Open to Opportunities",
        contactAvailabilityDescription: "Currently available for senior product leadership roles in luxury retail and fashion technology.",
        contactAvailabilityItems: [
          "Full-time positions",
          "Strategic consulting",
          "Advisory roles"
        ],
        contactDownloadText: "Download CV",
        contactCvPath: "/cv.pdf",
        contactBottomInfo: {
          responseTime: { label: "Response Time", value: "Within 24h" },
          location: { label: "Location", value: "Paris, France" },
          languages: { label: "Languages", value: "EN • FR • ESP" }
        },

        version: 1,
        isActive: true,
      });

    }

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      data: {
        adminUsername,
        tablesCreated: true,
        userCreated: existingUser.length === 0,
        contentCreated: existingContent.length === 0,
      },
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database initialization failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}