"use client";

import { useTextContent } from '@/lib/TextContentContext';

export default function Achievements() {
  const { textContent } = useTextContent();

  return (
    <section id="achievements" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-brand-deep text-brand-cream">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-10 md:mb-12">{textContent.achievementsTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {textContent.achievements.map((achievement, index) => (
            <div key={index} className="text-center p-5 sm:p-6 border border-brand-gold rounded-lg hover:bg-brand-gold/10 transition-all duration-300">
              <p className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-gold">{achievement.metric}</p>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
