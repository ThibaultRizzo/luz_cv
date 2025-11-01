"use client";

import { useLanguage } from '@/lib/LanguageContext';
import Image from 'next/image';

interface SkillCard {
  title: string;
  icon: string;
  iconType: 'emoji' | 'upload';
  width: 'half' | 'full';
  items: Array<{
    title: string;
    icon: string;
    iconType?: 'emoji' | 'upload';
  }>;
}

export default function Skills() {
  const { getTranslatedContent } = useLanguage();
  const textContent = getTranslatedContent() as any;

  // Use new skill cards structure
  const skillCards: SkillCard[] = ((textContent as unknown) as Record<string, unknown>).skillCards as SkillCard[] || [];

  // Default soft skills if not defined
  const softSkills = textContent.softSkills || [];

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
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs sm:text-sm mb-4 sm:mb-6 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
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

        {/* Skill Cards */}
        {skillCards.length > 0 && (
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto mb-10 sm:mb-12 md:mb-16">
            {skillCards.map((card, index) => (
              <div
                key={index}
                className={`bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-brand-gold/20 hover:bg-brand-cream/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(199,161,122,0.2)] group ${
                  card.width === 'full' 
                    ? 'w-full' 
                    : 'w-full lg:w-[calc(50%-1rem)]'
                }`}
              >
                {/* Card Header: Icon + Title */}
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {card.iconType === 'emoji' ? (
                    <div className="text-3xl sm:text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300">
                      {card.icon}
              </div>
                  ) : (
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-gold">
                    {card.title}
                  </h3>
                </div>

                {/* Items List - Horizontal */}
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {(card.items || []).map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-brand-deep/30 rounded-lg border border-brand-gold/20 hover:bg-brand-deep/50 hover:border-brand-gold/40 transition-all duration-300"
                    >
                      {(item.iconType || 'emoji') === 'emoji' ? (
                        <span className="text-lg sm:text-xl">{item.icon}</span>
                      ) : (
                        <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
                          <Image
                            src={item.icon}
                            alt={item.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="text-sm sm:text-base text-brand-cream font-medium">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Soft Skills - Critical for Luxury Retail */}
        {softSkills.length > 0 && (
          <div className="max-w-5xl mx-auto mb-10 sm:mb-12 md:mb-16">
            <div className="bg-gradient-to-br from-brand-gold/10 to-brand-cream/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 border border-brand-gold/30">
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-brand-gold mb-6 sm:mb-8 text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <span className="text-3xl sm:text-4xl">💎</span>
                <span>{textContent.skillsSoftSkillsTitle || 'Leadership & Soft Skills'}</span>
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

          {/* Certifications */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 border border-brand-gold/20">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-brand-gold mb-4 sm:mb-6 flex items-center justify-center">
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
        </div>
      </div>
    </section>
  );
}
