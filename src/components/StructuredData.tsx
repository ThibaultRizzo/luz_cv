"use client";

import { useTextContent } from '@/lib/TextContentContext';

export default function StructuredData() {
  const { textContent } = useTextContent();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nadia Luna",
    "jobTitle": "Product Owner",
    "description": textContent.heroDescription || "Product Owner with 10+ years of leadership in luxury retail — I design product & experience that scale revenue and loyalty.",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://nadialuna.com",
    "image": textContent.heroImage || "/nadia.jpg",
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
      "Agile Methodology"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Business School"
    },
    "sameAs": [
      textContent.contactLinkedin || "https://linkedin.com/in/nadialuna"
    ],
    "email": textContent.contactEmail || "nadia.luna@email.com",
    "telephone": textContent.contactPhone || "+33123456789"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
