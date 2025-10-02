"use client";

import { useTextContent } from '@/lib/TextContentContext';

export default function Achievements() {
  const { textContent } = useTextContent();

  return (
    <section id="achievements" className="py-20 bg-brand-deep text-brand-cream">
      <div className="container mx-auto px-6">
        <h2 className="font-serif text-4xl text-center mb-12">{textContent.achievementsTitle}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {textContent.achievements.map((achievement, index) => (
            <div key={index} className="text-center p-6 border border-brand-gold rounded-lg">
              <p className="font-serif text-5xl font-bold text-brand-gold">{achievement.metric}</p>
              <p className="mt-4 text-lg">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
