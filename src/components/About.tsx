"use client";

import { useTextContent } from '@/lib/TextContentContext';

export default function About() {
    const { textContent } = useTextContent();

    return (
        <section id="about" className="py-32 bg-brand-deep text-brand-cream relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-cream/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-4 py-2 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-sm mb-6">
                        <span className="w-2 h-2 bg-brand-gold rounded-full mr-2"></span>
                        About Me
                    </div>
                    <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-6">
                        {textContent.aboutTitle}
                        <span className="block text-brand-gold italic">reality</span>
                    </h2>
                    <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                    {/* Left column - Main content */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <p className="text-xl md:text-2xl leading-relaxed text-brand-cream/90">
                                {textContent.aboutMainText}
                            </p>
                            <p className="text-lg leading-relaxed text-brand-cream/80">
                                {textContent.aboutSecondaryText}
                            </p>
                        </div>

                        {/* Key principles */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-serif text-brand-gold mb-6">My Approach</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="w-2 h-2 bg-brand-gold rounded-full mt-3 flex-shrink-0"></div>
                                    <div>
                                        <h4 className="font-semibold text-brand-cream mb-1">Customer-First Philosophy</h4>
                                        <p className="text-brand-cream/70">Every decision starts with understanding the customer&apos;s deepest needs and desires</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-2 h-2 bg-brand-gold rounded-full mt-3 flex-shrink-0"></div>
                                    <div>
                                        <h4 className="font-semibold text-brand-cream mb-1">Data-Driven Innovation</h4>
                                        <p className="text-brand-cream/70">Combining intuition with analytics to create breakthrough solutions</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="w-2 h-2 bg-brand-gold rounded-full mt-3 flex-shrink-0"></div>
                                    <div>
                                        <h4 className="font-semibold text-brand-cream mb-1">Cross-Functional Leadership</h4>
                                        <p className="text-brand-cream/70">Building bridges between teams to deliver cohesive, impactful products</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Stats & highlights */}
                    <div className="space-y-8">
                        {/* Impact metrics */}
                        <div className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-8 border border-brand-gold/20">
                            <h3 className="text-2xl font-serif text-brand-gold mb-6">Impact at a Glance</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-brand-cream mb-1">€50M+</div>
                                    <div className="text-sm text-brand-cream/60 uppercase tracking-wide">Revenue Generated</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-brand-cream mb-1">40%</div>
                                    <div className="text-sm text-brand-cream/60 uppercase tracking-wide">Avg Growth Rate</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-brand-cream mb-1">25+</div>
                                    <div className="text-sm text-brand-cream/60 uppercase tracking-wide">Products Launched</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-brand-cream mb-1">15+</div>
                                    <div className="text-sm text-brand-cream/60 uppercase tracking-wide">Teams Led</div>
                                </div>
                            </div>
                        </div>
                        {/* Quote */}
                        <div className="relative bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-6 border border-brand-gold/20">
                            <blockquote className="text-xl italic text-brand-cream/90 text-center">
                                &quot;{textContent.aboutQuote}&quot;
                            </blockquote>
                            <div className="text-center mt-4">
                                <cite className="text-brand-gold font-medium">— Nadia Luna</cite>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
