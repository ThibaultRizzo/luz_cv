"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-cream via-brand-cream to-brand-gold/10 pt-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-deep/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left column - Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center px-4 py-2 bg-brand-deep/10 rounded-full text-brand-deep font-medium text-sm mb-8"
            >
              <span className="w-2 h-2 bg-brand-gold rounded-full mr-2"></span>
              Product Owner • Luxury Retail Expert
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-brand-deep mb-6"
            >
              I craft
              <span className="block text-brand-gold italic">premium</span>
              <span className="block">experiences</span>
            </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-brand-deep/80 max-w-2xl mb-8 leading-relaxed"
          >
            Transforming luxury retail through strategic product leadership, 
            <span className="text-brand-gold font-medium"> data-driven innovation</span>, 
            and customer-obsessed design.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-deep">10+</div>
              <div className="text-sm text-brand-deep/60 uppercase tracking-wide">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-deep">€50M+</div>
              <div className="text-sm text-brand-deep/60 uppercase tracking-wide">Revenue Impact</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-deep">25+</div>
              <div className="text-sm text-brand-deep/60 uppercase tracking-wide">Products Launched</div>
            </div>
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
                className="group inline-flex items-center justify-center px-8 py-4 bg-brand-deep text-brand-cream font-medium rounded-full hover:bg-brand-gold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Let&apos;s create something extraordinary
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="relative pl-8"
          >
            <div className="relative">
              {/* Decorative elements behind image */}
              <div className="absolute -top-4 -right-4 w-full h-full bg-brand-gold/20 rounded-2xl transform rotate-3"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-brand-deep/10 rounded-2xl transform -rotate-2"></div>
              
              {/* Main image */}
              <img 
                src="/nadia.jpg" 
                alt="Nadia Luna - Product Owner" 
                className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover aspect-[3/4]"
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-brand-deep/60">
          <span className="text-sm uppercase tracking-wide mb-2">Scroll</span>
          <div className="w-6 h-10 border-2 border-brand-deep/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-brand-deep/40 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
