"use client";

import { useTextContent } from '@/lib/TextContentContext';

export default function Experience() {
  const { textContent } = useTextContent();

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-brand-cream relative overflow-hidden scroll-mt-20">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-brand-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-brand-deep/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-deep/10 rounded-full text-brand-deep font-medium text-xs sm:text-sm mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2"></span>
            {textContent.experienceBadge || 'Career Journey'}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-brand-deep mb-4 sm:mb-6">
            {textContent.experienceTitle}
            <span className="block text-brand-gold italic mt-1 sm:mt-2">{textContent.experienceSubtitle}</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Simple stacked cards */}
          <div className="md:hidden space-y-6">
            {textContent.experiences.map((exp, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-5 border border-brand-gold/10">
                {/* Header */}
                <div className="mb-4 pb-4 border-b border-brand-gold/20">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-lg text-brand-deep flex-1">{exp.role}</h3>
                    <span className="inline-block bg-brand-gold/10 px-2 py-1 rounded-lg text-brand-gold font-medium text-xs ml-2 whitespace-nowrap">{exp.period}</span>
                  </div>
                  <div className="text-brand-gold font-medium">
                    <div className="text-sm">{exp.company}</div>
                    <div className="text-xs mt-0.5 opacity-80">{exp.location}</div>
                  </div>
                </div>

                {/* Highlight */}
                <div className="bg-brand-gold/5 rounded-lg p-3 mb-4 border-l-3 border-brand-gold">
                  <p className="text-brand-deep font-medium italic text-xs leading-relaxed">{exp.highlight}</p>
                </div>

                {/* Achievements */}
                <div className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-brand-deep/80 text-xs leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Timeline with alternating sides */}
          <div className="hidden md:block relative">
            {/* Vertical line - centered on desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold via-brand-deep/20 to-brand-gold transform -translate-x-1/2"></div>

            <div className="space-y-12 lg:space-y-16">
              {textContent.experiences.map((exp, index) => (
                <div key={index} className="relative flex items-center">
                  {/* Timeline dot - centered on desktop */}
                  <div className="absolute left-1/2 w-4 h-4 bg-brand-gold rounded-full border-4 border-brand-cream shadow-lg z-10 transform -translate-x-1/2"></div>

                  {/* Content card - alternating sides on desktop */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12' : 'ml-auto pl-12'} bg-white rounded-2xl shadow-xl p-8 border border-brand-gold/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
                    <div className="mb-6">
                      <h3 className="font-serif text-2xl md:text-3xl text-brand-deep mb-3">{exp.role}</h3>
                      <div className="text-brand-gold font-medium mb-2">
                        <div className="text-lg md:text-xl">{exp.company}</div>
                        <div className="text-sm md:text-base mt-1">{exp.location}</div>
                      </div>
                      <div className="mt-3">
                        <span className="inline-block bg-brand-deep/5 px-4 py-2 rounded-full text-brand-deep font-medium text-sm">{exp.period}</span>
                      </div>
                    </div>

                    {/* Highlight */}
                    <div className="bg-brand-gold/10 rounded-xl p-4 mb-6 border-l-4 border-brand-gold">
                      <p className="text-brand-deep font-medium italic text-base">{exp.highlight}</p>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-brand-gold rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-brand-deep/80 text-sm md:text-base leading-relaxed">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-8 sm:mt-12 md:mt-16">
          <div className="inline-flex flex-row items-center justify-center gap-6 sm:gap-0 sm:space-x-6 bg-brand-deep/5 rounded-2xl py-4 px-6 sm:p-6">
            {(textContent.experienceBottomStats && textContent.experienceBottomStats.length > 0 ? textContent.experienceBottomStats : [
              { metric: '10+', label: 'Years' },
              { metric: '€50M+', label: 'Impact' },
              { metric: '25+', label: 'Products' }
            ]).map((stat, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <div className="hidden sm:block w-px h-10 bg-brand-gold/30 mr-6"></div>}
                <div className="text-brand-deep text-center">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold">{stat.metric}</div>
                  <div className="text-xs uppercase tracking-wide mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
