import { db } from './connection';
import { content } from './schema';
import { eq } from 'drizzle-orm';

export async function migrateContentFields() {
  try {
    // Get the current content
    const currentContent = await db.select().from(content).limit(1);

    if (currentContent.length === 0) {
      console.log('No content found to migrate');
      return;
    }

    const contentId = currentContent[0].id;

    // Default values from hardcoded content
    const defaultValues = {
      // Hero Section
      heroBadge: 'Product Owner • Luxury Retail Expert',
      heroStats: [
        { metric: '10+', label: 'Years Experience' },
        { metric: '€50M+', label: 'Revenue Impact' },
        { metric: '25+', label: 'Products Launched' }
      ],
      heroCtaText: "Let's create something extraordinary",
      heroScrollText: 'Scroll',

      // About Section
      aboutBadge: 'About Me',
      aboutTitleSuffix: 'reality',
      aboutApproachTitle: 'My Approach',
      aboutApproachItems: [
        {
          title: 'Customer-First Philosophy',
          description: "Every decision starts with understanding the customer's deepest needs and desires"
        },
        {
          title: 'Data-Driven Innovation',
          description: 'Combining intuition with analytics to create breakthrough solutions'
        },
        {
          title: 'Cross-Functional Leadership',
          description: 'Building bridges between teams to deliver cohesive, impactful products'
        }
      ],
      aboutImpactTitle: 'Impact at a Glance',
      aboutImpactMetrics: [
        { metric: '€50M+', label: 'Revenue Generated' },
        { metric: '40%', label: 'Avg Growth Rate' },
        { metric: '25+', label: 'Products Launched' },
        { metric: '15+', label: 'Teams Led' }
      ],
      aboutQuoteAuthor: '— Nadia Luna',

      // Experience Section
      experienceBadge: 'Career Journey',
      experienceBottomStats: [
        { metric: '10+', label: 'Years' },
        { metric: '€50M+', label: 'Impact' },
        { metric: '25+', label: 'Products' }
      ],

      // Skills Section
      skillsBadge: 'Core Expertise',
      skillsCertificationsTitle: '🏆 Certifications',
      skillsToolsTitle: '🛠️ Tools & Platforms',
      skillsQuoteAuthor: '— Nadia Luna',

      // Contact Section
      contactBadge: "Let's Connect",
      contactFormTitle: 'Send a Message',
      contactFormLabels: {
        name: 'Full Name *',
        email: 'Email Address *',
        company: 'Company',
        message: 'Message *'
      },
      contactFormPlaceholders: {
        name: 'Your name',
        email: 'your@email.com',
        company: 'Your company',
        message: 'Tell me about your project or opportunity...'
      },
      contactSubmitButton: 'Send Message',
      contactSuccessMessage: 'Thank you! Your message has been sent successfully.',
      contactErrorMessage: 'Sorry, there was an error sending your message. Please try again.',
      contactInfoTitle: 'Get in Touch Directly',
      contactEmail: 'nadia.luna@email.com',
      contactLinkedin: 'linkedin.com/in/nadialuna',
      contactPhone: '+33 1 23 45 67 89',
      contactAvailabilityTitle: 'Current Availability',
      contactAvailabilityStatus: 'Available for new opportunities',
      contactAvailabilityDescription: "I'm currently exploring exciting product leadership roles in luxury retail and fashion tech. Let's discuss how I can help transform your business.",
      contactAvailabilityItems: [
        '• Strategic consulting projects',
        '• Full-time product leadership roles',
        '• Speaking engagements & workshops'
      ],
      contactDownloadText: 'Download Full Portfolio',
      contactBottomInfo: {
        responseTime: { label: 'Response Time', value: '24h' },
        location: { label: 'Based in', value: 'Paris' },
        languages: { label: 'Languages', value: 'EN • FR • ESP' }
      }
    };

    // Update the content with default values
    await db
      .update(content)
      .set(defaultValues)
      .where(eq(content.id, contentId));

    console.log('Content migration completed successfully!');
    console.log('All hardcoded values have been moved to the database.');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateContentFields()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
