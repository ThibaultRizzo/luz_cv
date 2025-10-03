"use client";

import { motion } from 'framer-motion';
import { useTextContent } from '@/lib/TextContentContext';

export default function Hero() {
  const { textContent } = useTextContent();
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-cream via-brand-cream to-brand-gold/10 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32 scroll-mt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-40 h-40 sm:w-72 sm:h-72 bg-brand-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-48 h-48 sm:w-96 sm:h-96 bg-brand-deep/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left column - Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-deep/10 rounded-full text-brand-deep font-medium text-xs sm:text-sm mb-4 sm:mb-6 md:mb-8 hover:bg-brand-gold/20 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default group"
            >
              <span className="w-2 h-2 bg-brand-gold rounded-full mr-2 group-hover:scale-125 transition-transform duration-300"></span>
              {textContent.heroBadge || 'Product Owner • Luxury Retail Expert'}
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-brand-deep mb-3 sm:mb-4 md:mb-6"
            >
              {textContent.heroTitle}
              <span className="block text-brand-gold italic mt-1 sm:mt-2">{textContent.heroSubtitle}</span>
            </motion.h1>
          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-brand-deep/80 max-w-full mb-6 sm:mb-8 lg:mb-10 leading-relaxed"
          >
            {textContent.heroDescription}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          >
            {(textContent.heroStats && textContent.heroStats.length > 0 ? textContent.heroStats : [
              { metric: '10+', label: 'Years Experience' },
              { metric: '€50M+', label: 'Revenue Impact' },
              { metric: '25+', label: 'Products Launched' }
            ]).map((stat: { metric: string; label: string }, index: number) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-gold mb-1 sm:mb-2">{stat.metric}</div>
                <div className="text-xs sm:text-sm md:text-base text-brand-deep uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-start"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-brand-deep text-brand-cream font-medium rounded-full hover:bg-brand-gold hover:text-brand-deep transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl text-sm sm:text-base overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/30 to-brand-gold/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                <span className="relative">{textContent.heroCtaText || "Let's Craft Excellence Together"}</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right column - Image */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-start order-first lg:order-last mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              {/* Decorative elements behind image */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-full h-full bg-brand-gold/20 rounded-2xl transform rotate-3"></div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-full h-full bg-brand-deep/10 rounded-2xl transform -rotate-2"></div>

              {/* Main image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={textContent.heroImage || "/nadia.jpg"}
                alt="Nadia Luna - Product Owner and Luxury Retail Expert"
                className="relative z-10 w-full rounded-2xl shadow-2xl object-cover aspect-[3/4]"
              />

            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex"
      >
        <div className="flex flex-col items-center text-brand-deep/60">
          <span className="text-xs sm:text-sm uppercase tracking-wide mb-2">{textContent.heroScrollText || 'Scroll'}</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-brand-deep/20 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-brand-deep/40 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
