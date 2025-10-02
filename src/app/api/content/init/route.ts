import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/connection';
import { content, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

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
    }
  ],
  certifications: [
    "Certified Scrum Product Owner (CSPO)",
    "Google Analytics Certified"
  ],
  tools: ["Jira", "Figma", "Shopify Plus", "Salesforce"],
  skillsQuote: "Skills are built through challenges, refined through experience, and perfected through passion.",
  achievementsTitle: "Achievements",
  achievements: [
    { metric: "+40%", description: "Increase in Online Sales" },
    { metric: "+25%", description: "Customer Retention in 1 Year" }
  ],
  contactTitle: "Ready to create",
  contactSubtitle: "something extraordinary?",
  contactDescription: "Whether you're looking to transform your luxury retail experience or explore new product opportunities, I'd love to hear from you."
};

export async function POST() {
  try {
    // Check if content already exists
    const existingContent = await db
      .select()
      .from(content)
      .where(eq(content.isActive, true))
      .limit(1);

    if (existingContent.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Content already initialized',
      });
    }

    // Get admin user
    const adminUser = await db
      .select()
      .from(users)
      .where(eq(users.username, 'mia'))
      .limit(1);

    if (adminUser.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Admin user not found' },
        { status: 404 }
      );
    }

    // Insert default content
    const newContent = await db
      .insert(content)
      .values({
        ...defaultContent,
        version: 1,
        isActive: true,
        lastModifiedBy: adminUser[0].id,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Content initialized successfully',
      data: newContent[0],
    });
  } catch (error) {
    console.error('Content initialization error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to initialize content';
    return NextResponse.json(
      { success: false, message: errorMessage, error: String(error) },
      { status: 500 }
    );
  }
}
