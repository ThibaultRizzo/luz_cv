"use client";

import { useTextContent } from '@/lib/TextContentContext';

export default function Achievements() {
  const { textContent } = useTextContent();

  return (
    <section id="achievements" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-brand-deep text-brand-cream scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-10 md:mb-12">{textContent.achievementsTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {textContent.achievements.map((achievement, index) => (
            <div key={index} className="text-center p-6 sm:p-8 border-2 border-brand-gold rounded-2xl bg-brand-gold/5 hover:bg-brand-gold/15 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <p className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brand-gold mb-3 sm:mb-4">{achievement.metric}</p>
              <p className="text-sm sm:text-base md:text-lg text-brand-cream/90 font-medium">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
