"use client";

import { useTextContent } from '@/lib/TextContentContext';

export default function Skills() {
  const { textContent } = useTextContent();

  return (
    <section id="skills" className="py-32 bg-brand-deep text-brand-cream relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-brand-cream/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-sm mb-6">
            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2"></span>
            {textContent.skillsBadge || 'Core Expertise'}
          </div>
          <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
            {textContent.skillsTitle}
            <span className="block text-brand-gold italic">{textContent.skillsSubtitle}</span>
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-8"></div>
          <p className="text-xl text-brand-cream/80 max-w-3xl mx-auto">
            {textContent.skillsDescription}
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto mb-12 md:mb-16">
          {textContent.skillCategories.map((category, index) => (
            <div key={index} className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-brand-gold/20 hover:bg-brand-cream/10 transition-all duration-300">
              <div className="flex items-center mb-4 md:mb-6">
                <div className="text-3xl md:text-4xl mr-3 md:mr-4">{category.icon}</div>
                <h3 className="font-serif text-xl md:text-2xl text-brand-gold">{category.category}</h3>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-1 md:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-brand-cream font-medium text-sm md:text-base">{skill.name}</span>
                      <span className="text-brand-gold text-xs md:text-sm font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 md:h-2 bg-brand-deep/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-brand-gold to-brand-cream rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications & Tools */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Certifications */}
          <div className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-8 border border-brand-gold/20">
            <h3 className="font-serif text-2xl text-brand-gold mb-6 flex items-center">
              {textContent.skillsCertificationsTitle || '🏆 Certifications'}
            </h3>
            <div className="space-y-3">
              {textContent.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-gold rounded-full"></div>
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-8 border border-brand-gold/20">
            <h3 className="font-serif text-2xl text-brand-gold mb-6 flex items-center">
              {textContent.skillsToolsTitle || '🛠️ Tools & Platforms'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {textContent.tools.map((tool, index) => (
                <div key={index} className="bg-brand-gold/10 rounded-lg px-3 py-2 text-center text-sm font-medium">
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="text-center mt-16">
          <blockquote className="text-2xl italic text-brand-cream/90 max-w-3xl mx-auto">
            &quot;{textContent.skillsQuote}&quot;
          </blockquote>
          <cite className="text-brand-gold font-medium mt-4 block">{textContent.skillsQuoteAuthor || '— Nadia Luna'}</cite>
        </div>
      </div>
    </section>
  );
}
