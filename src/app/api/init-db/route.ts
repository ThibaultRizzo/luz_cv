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

      console.log(`✅ Admin user '${adminUsername}' created`);
    } else {
      console.log(`ℹ️ Admin user '${adminUsername}' already exists`);
    }

    // Check if content exists
    const existingContent = await db
      .select()
      .from(content)
      .where(eq(content.isActive, true))
      .limit(1);

    if (existingContent.length === 0) {
      // Create initial content
      await db.insert(content).values({
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
              { name: "Roadmap Planning", level: 90 }
            ]
          }
        ],
        certifications: [
          "Certified Scrum Product Owner (CSPO)",
          "Google Analytics Certified"
        ],
        tools: ["Jira", "Figma", "Shopify Plus"],
        skillsQuote: "Skills are built through challenges, refined through experience, and perfected through passion.",

        achievementsTitle: "Achievements",
        achievements: [
          { metric: "+40%", description: "Increase in Online Sales" },
          { metric: "+25%", description: "Customer Retention in 1 Year" }
        ],

        contactTitle: "Ready to create",
        contactSubtitle: "something extraordinary?",
        contactDescription: "Whether you're looking to transform your luxury retail experience or explore new product opportunities, I'd love to hear from you.",

        version: 1,
        isActive: true,
      });

      console.log('✅ Initial content created');
    } else {
      console.log('ℹ️ Content already exists');
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