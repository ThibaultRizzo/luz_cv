"use client";

import { useTextContent } from '@/lib/TextContentContext';

export default function About() {
    const { textContent } = useTextContent();

    return (
        <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-brand-deep text-brand-cream relative overflow-hidden scroll-mt-20">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-brand-cream/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Section header */}
                <div className="text-center mb-12 sm:mb-16 md:mb-20">
                    <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs sm:text-sm mb-4 sm:mb-6 hover:bg-brand-gold/30 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default group">
                        <span className="w-2 h-2 bg-brand-gold rounded-full mr-2 group-hover:scale-125 group-hover:shadow-glow transition-transform duration-300"></span>
                        {textContent.aboutBadge || 'About Me'}
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4 sm:mb-6">
                        {textContent.aboutTitle}
                        <span className="block text-brand-gold italic mt-1 sm:mt-2">{textContent.aboutTitleSuffix || 'reality'}</span>
                    </h2>
                    <div className="w-16 sm:w-20 md:w-24 h-1 bg-brand-gold mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
                    {/* Left column - Main content */}
                    <div className="space-y-6 sm:space-y-8">
                        <div className="space-y-4 sm:space-y-6">
                            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-brand-cream/90">
                                {textContent.aboutMainText}
                            </p>
                            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-brand-cream/80">
                                {textContent.aboutSecondaryText}
                            </p>
                        </div>

                        {/* Key principles */}
                        <div className="space-y-4">
                            <h3 className="text-xl sm:text-2xl font-serif text-brand-gold mb-4 sm:mb-6">{textContent.aboutApproachTitle || 'My Approach'}</h3>
                            <div className="space-y-4 sm:space-y-5">
                                {(textContent.aboutApproachItems && textContent.aboutApproachItems.length > 0 ? textContent.aboutApproachItems : [
                                    { title: 'Customer-First Philosophy', description: 'Every decision starts with understanding the customer\'s deepest needs and desires' },
                                    { title: 'Data-Driven Innovation', description: 'Combining intuition with analytics to create breakthrough solutions' },
                                    { title: 'Cross-Functional Leadership', description: 'Building bridges between teams to deliver cohesive, impactful products' }
                                ]).map((item, index) => (
                                    <div key={index} className="bg-brand-cream/5 rounded-xl p-4 border-l-4 border-brand-gold">
                                        <h4 className="font-semibold text-brand-cream mb-2 text-sm sm:text-base">{item.title}</h4>
                                        <p className="text-brand-cream/70 text-sm md:text-base leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right column - Stats & highlights */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Impact metrics */}
                        <div className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-brand-gold/20">
                            <h3 className="text-xl sm:text-2xl font-serif text-brand-gold mb-4 sm:mb-6">{textContent.aboutImpactTitle || 'Impact at a Glance'}</h3>
                            <div className="grid grid-cols-2 gap-4 sm:gap-6">
                                {(textContent.aboutImpactMetrics && textContent.aboutImpactMetrics.length > 0 ? textContent.aboutImpactMetrics : [
                                    { metric: '€50M+', label: 'Revenue Generated' },
                                    { metric: '40%', label: 'Avg Growth Rate' },
                                    { metric: '25+', label: 'Products Launched' },
                                    { metric: '15+', label: 'Teams Led' }
                                ]).map((item, index) => (
                                    <div key={index} className="text-center bg-brand-gold/10 rounded-xl p-4">
                                        <div className="text-3xl sm:text-4xl font-bold text-brand-gold mb-2">{item.metric}</div>
                                        <div className="text-xs sm:text-sm text-brand-cream uppercase tracking-wide">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Quote */}
                        <div className="relative bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-brand-gold/20">
                            <blockquote className="text-base sm:text-lg md:text-xl italic text-brand-cream/90 text-center">
                                &quot;{textContent.aboutQuote}&quot;
                            </blockquote>
                            <div className="text-center mt-3 sm:mt-4">
                                <cite className="text-brand-gold font-medium text-sm sm:text-base">{textContent.aboutQuoteAuthor || '— Nadia Luna'}</cite>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
