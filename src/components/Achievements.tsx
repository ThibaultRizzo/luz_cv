"use client";

import { useTextContent } from '@/lib/TextContentContext';

export default function Achievements() {
  const { textContent } = useTextContent();

  // Default icons if none specified
  const defaultIcons = ['📈', '🎯', '🏆', '💎'];

  return (
    <section id="achievements" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-brand-deep text-brand-cream scroll-mt-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-60 h-60 bg-brand-cream/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs sm:text-sm mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2"></span>
            Key Achievements
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
            {textContent.achievementsTitle}
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>

        {/* Achievements grid - 3 columns max for luxury feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto">
          {textContent.achievements.slice(0, 3).map((achievement, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-brand-cream/5 to-brand-gold/5 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-brand-gold/20 hover:border-brand-gold/40 transition-all duration-500 hover:transform hover:-translate-y-2 shadow-xl hover:shadow-2xl"
            >
              {/* Icon */}
              <div className="text-5xl sm:text-6xl mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300">
                {achievement.icon || defaultIcons[index] || '⭐'}
              </div>

              {/* Metric */}
              <div className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-brand-gold mb-4 sm:mb-6 leading-none">
                {achievement.metric}
              </div>

              {/* Description/Context */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold text-brand-cream">
                  {achievement.description}
                </h3>

                {/* Optional: Add more context if available in future */}
                <div className="h-1 w-12 bg-brand-gold/50 rounded-full"></div>
              </div>

              {/* Hover effect decoration */}
              <div className="absolute -bottom-1 -right-1 w-20 h-20 bg-brand-gold/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Show remaining achievements in a compact row if more than 3 */}
        {textContent.achievements.length > 3 && (
          <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
            {textContent.achievements.slice(3).map((achievement, index) => (
              <div
                key={index + 3}
                className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-4 sm:py-5 border border-brand-gold/20 hover:border-brand-gold/40 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-bold text-brand-gold mb-1">
                  {achievement.metric}
                </div>
                <div className="text-sm sm:text-base text-brand-cream/80">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
