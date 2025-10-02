import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL || 'postgresql://neondb_owner:npg_cqjJS9QfL3PF@ep-billowing-night-adgyenbb-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require');

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

async function seedContent() {
  try {
    console.log('🔄 Checking for existing content...');

    // Check if content already exists
    const existingContent = await sql`
      SELECT id FROM content WHERE is_active = true LIMIT 1
    `;

    if (existingContent.length > 0) {
      console.log('✅ Content already exists. Skipping seed.');
      process.exit(0);
    }

    console.log('📝 Seeding initial content...');

    // Get admin user
    const adminUser = await sql`
      SELECT id FROM users WHERE username = 'mia' LIMIT 1
    `;

    if (adminUser.length === 0) {
      console.error('❌ Admin user not found. Please create admin user first.');
      process.exit(1);
    }

    // Insert content
    await sql`
      INSERT INTO content (
        hero_title, hero_subtitle, hero_description,
        about_title, about_description, about_main_text, about_secondary_text, about_quote,
        experience_title, experience_subtitle, experiences,
        skills_title, skills_subtitle, skills_description, skill_categories, certifications, tools, skills_quote,
        achievements_title, achievements,
        contact_title, contact_subtitle, contact_description,
        version, is_active, last_modified_by
      ) VALUES (
        ${defaultContent.heroTitle}, ${defaultContent.heroSubtitle}, ${defaultContent.heroDescription},
        ${defaultContent.aboutTitle}, ${defaultContent.aboutDescription}, ${defaultContent.aboutMainText}, ${defaultContent.aboutSecondaryText}, ${defaultContent.aboutQuote},
        ${defaultContent.experienceTitle}, ${defaultContent.experienceSubtitle}, ${JSON.stringify(defaultContent.experiences)},
        ${defaultContent.skillsTitle}, ${defaultContent.skillsSubtitle}, ${defaultContent.skillsDescription}, ${JSON.stringify(defaultContent.skillCategories)}, ${JSON.stringify(defaultContent.certifications)}, ${JSON.stringify(defaultContent.tools)}, ${defaultContent.skillsQuote},
        ${defaultContent.achievementsTitle}, ${JSON.stringify(defaultContent.achievements)},
        ${defaultContent.contactTitle}, ${defaultContent.contactSubtitle}, ${defaultContent.contactDescription},
        1, true, ${adminUser[0].id}
      )
    `;

    console.log('✅ Content seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding content:', error);
    process.exit(1);
  }
}

seedContent();
