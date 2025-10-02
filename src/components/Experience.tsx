"use client";

import { useTextContent } from '@/lib/TextContentContext';

export default function Experience() {
  const { textContent } = useTextContent();

  return (
    <section id="experience" className="py-32 bg-brand-cream relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-brand-deep/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-brand-deep/10 rounded-full text-brand-deep font-medium text-sm mb-6">
            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2"></span>
            Career Journey
          </div>
          <h2 className="font-serif text-5xl md:text-7xl leading-tight text-brand-deep mb-6">
            {textContent.experienceTitle}
            <span className="block text-brand-gold italic">{textContent.experienceSubtitle}</span>
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Vertical line - centered */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold via-brand-deep/20 to-brand-gold transform -translate-x-1/2"></div>
            
            <div className="space-y-12 md:space-y-20">
              {textContent.experiences.map((exp, index) => (
                <div key={index} className="relative flex items-center">
                  {/* Timeline dot - centered */}
                  <div className="absolute left-1/2 w-4 h-4 md:w-5 md:h-5 bg-brand-gold rounded-full border-4 border-brand-cream shadow-lg z-10 transform -translate-x-1/2"></div>
                  
                  {/* Content card - alternating sides on desktop, centered on mobile */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'} bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-brand-gold/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mx-4 md:mx-0`}>
                    <div className="mb-4 md:mb-6">
                      <h3 className="font-serif text-2xl md:text-3xl text-brand-deep mb-2">{exp.role}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 md:gap-2 text-brand-gold font-medium">
                        <span className="text-lg md:text-xl">{exp.company}</span>
                        <span className="hidden sm:block">•</span>
                        <span className="text-sm md:text-base">{exp.location}</span>
                      </div>
                      <div className="mt-2">
                        <span className="bg-brand-deep/5 px-3 md:px-4 py-2 rounded-full text-brand-deep font-medium text-sm md:text-base">{exp.period}</span>
                      </div>
                    </div>

                    {/* Highlight */}
                    <div className={`bg-brand-gold/10 rounded-xl p-4 mb-4 md:mb-6 ${index % 2 === 0 ? 'border-l-4 md:border-l-4 border-brand-gold' : 'border-r-4 md:border-r-4 border-brand-gold'}`}>
                      <p className="text-brand-deep font-medium italic">{exp.highlight}</p>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-2 md:space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className={`flex items-start ${index % 2 === 0 ? 'md:justify-end md:space-x-reverse md:space-x-3 space-x-3' : 'space-x-3'}`}>
                          <div className="w-2 h-2 bg-brand-gold rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-brand-deep/80 text-sm md:text-base">{achievement}</p>
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
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 bg-brand-deep/5 rounded-2xl p-6">
            <div className="text-brand-deep">
              <div className="text-2xl font-bold">10+</div>
              <div className="text-sm uppercase tracking-wide">Years</div>
            </div>
            <div className="w-px h-12 bg-brand-gold/30"></div>
            <div className="text-brand-deep">
              <div className="text-2xl font-bold">€50M+</div>
              <div className="text-sm uppercase tracking-wide">Impact</div>
            </div>
            <div className="w-px h-12 bg-brand-gold/30"></div>
            <div className="text-brand-deep">
              <div className="text-2xl font-bold">25+</div>
              <div className="text-sm uppercase tracking-wide">Products</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
