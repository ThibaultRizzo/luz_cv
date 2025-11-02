"use client";

import { useTextContent } from '@/lib/TextContentContext';
import { useEffect, useState } from 'react';

export default function StructuredData() {
  const { textContent } = useTextContent();
  const [isMounted, setIsMounted] = useState(false);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luzquintanar.com";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render on server to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Person Schema - Main entity
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    "name": "Luz Quintanar",
    "givenName": "Luz",
    "familyName": "Quintanar",
    "jobTitle": "Product Owner",
    "description": textContent.heroDescription || "Product Owner with 10+ years of leadership in luxury retail — I design product & experience that scale revenue and loyalty.",
    "url": siteUrl,
    "image": {
      "@type": "ImageObject",
      "url": `${siteUrl}${textContent.heroImage || "/luz.jpg"}`,
      "caption": "Luz Quintanar - Product Owner"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Luxury Retail"
    },
    "knowsAbout": [
      "Product Management",
      "Luxury Retail",
      "Digital Transformation",
      "Product Strategy",
      "UX Design",
      "Agile Methodology",
      "E-commerce",
      "User Experience",
      "Business Strategy"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Business School"
    },
    "sameAs": [
      textContent.contactLinkedin || "https://linkedin.com/in/luzquintanar"
    ],
    "email": textContent.contactEmail || "luz.quintanar@email.com",
    "telephone": textContent.contactPhone || "+33123456789",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": textContent.contactEmail || "luz.quintanar@email.com",
      "contactType": "professional"
    }
  };

  // ProfilePage Schema
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@id": `${siteUrl}/#person`
    },
    "name": "Luz Quintanar - Product Owner Portfolio",
    "url": siteUrl,
    "description": "Professional portfolio of Luz Quintanar, Product Owner specializing in luxury retail and digital transformation."
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteUrl,
    "name": "Luz Quintanar Portfolio",
    "description": "Product Owner with 10+ years of leadership in luxury retail",
    "author": {
      "@id": `${siteUrl}/#person`
    },
    "inLanguage": "en-US"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
