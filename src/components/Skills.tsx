"use client";

import { useTextContent } from '@/lib/TextContentContext';

export default function Skills() {
  const { textContent } = useTextContent();

  // Default soft skills if not defined
  const softSkills = textContent.softSkills || [
    { skill: 'Executive Stakeholder Management', icon: '🤝' },
    { skill: 'Cross-Cultural Communication', icon: '🌍' },
    { skill: 'Luxury Customer Psychology', icon: '✨' },
    { skill: 'Change Management', icon: '🔄' }
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-brand-deep text-brand-cream relative overflow-hidden scroll-mt-20">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-1/3 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-1/3 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-brand-cream/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs sm:text-sm mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2"></span>
            {textContent.skillsBadge || 'Core Expertise'}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4 sm:mb-6">
            {textContent.skillsTitle}
            <span className="block text-brand-gold italic mt-1 sm:mt-2">{textContent.skillsSubtitle}</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-brand-gold mx-auto mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-brand-cream/80 max-w-3xl mx-auto">
            {textContent.skillsDescription}
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto mb-10 sm:mb-12 md:mb-16">
          {textContent.skillCategories.map((category, index) => (
            <div key={index} className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border border-brand-gold/20 hover:bg-brand-cream/10 transition-all duration-300">
              <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                <div className="text-2xl sm:text-3xl md:text-4xl mr-3 md:mr-4">{category.icon}</div>
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-brand-gold">{category.category}</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-brand-cream font-medium text-sm md:text-base">{skill.name}</span>
                      <span className="text-brand-gold text-sm font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-brand-deep/30 rounded-full overflow-hidden">
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

        {/* Soft Skills - Critical for Luxury Retail */}
        {softSkills.length > 0 && (
          <div className="max-w-5xl mx-auto mb-10 sm:mb-12 md:mb-16">
            <div className="bg-gradient-to-br from-brand-gold/10 to-brand-cream/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-brand-gold/30">
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-gold mb-6 sm:mb-8 text-center">
                💎 Leadership & Soft Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {softSkills.map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                    <p className="text-sm md:text-base text-brand-cream font-medium leading-snug">{item.skill}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Certifications & Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Certifications */}
          <div className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border border-brand-gold/20">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-brand-gold mb-4 sm:mb-6 flex items-center">
              {textContent.skillsCertificationsTitle || '🏆 Certifications'}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {textContent.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-brand-gold rounded-full flex-shrink-0"></div>
                  <span className="text-sm md:text-base">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border border-brand-gold/20">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-brand-gold mb-4 sm:mb-6 flex items-center">
              {textContent.skillsToolsTitle || '🛠️ Tools & Platforms'}
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {textContent.tools.map((tool, index) => (
                <div key={index} className="bg-brand-gold/10 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-center text-sm font-medium">
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="text-center mt-12 sm:mt-16">
          <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl italic text-brand-cream/90 max-w-3xl mx-auto px-4">
            &quot;{textContent.skillsQuote}&quot;
          </blockquote>
          <cite className="text-brand-gold font-medium mt-3 sm:mt-4 block text-sm sm:text-base">{textContent.skillsQuoteAuthor || '— Nadia Luna'}</cite>
        </div>
      </div>
    </section>
  );
}
