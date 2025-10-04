"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3200); // Total animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-brand-cream via-brand-cream to-brand-gold/10"
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-gold rounded-full blur-3xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.08 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-deep rounded-full blur-3xl"
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Nadia Luna text with staggered animation */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
              >
                <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-2">
                  {/* Nadia with letter animation */}
                  <span className="inline-block">
                    {['N', 'A', 'D', 'I', 'A'].map((letter, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3 + index * 0.1,
                          ease: [0.6, 0.05, 0.01, 0.9]
                        }}
                        className="inline-block text-brand-deep"
                        style={{
                          textShadow: '0 0 40px rgba(199, 161, 122, 0.3)'
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                </h1>
              </motion.div>
            </div>

            <div className="overflow-hidden mt-2">
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
              >
                <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold italic tracking-wider">
                  {/* Luna with letter animation */}
                  <span className="inline-block">
                    {['L', 'U', 'N', 'A'].map((letter, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.8 + index * 0.1,
                          ease: [0.6, 0.05, 0.01, 0.9]
                        }}
                        className="inline-block text-brand-gold"
                        style={{
                          textShadow: '0 0 40px rgba(199, 161, 122, 0.5)'
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                </h2>
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mt-8 md:mt-12"
            >
              <p className="text-brand-deep/70 text-sm md:text-base tracking-[0.3em] uppercase font-medium">
                Product Owner • Luxury Retail
              </p>
            </motion.div>

            {/* Shimmer effect overlay */}
            <motion.div
              initial={{ x: '-100%', opacity: 1 }}
              animate={{ x: '200%', opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.5,
                delay: 1.2,
                ease: "easeInOut",
                opacity: {
                  times: [0, 0.1, 0.9, 1],
                  duration: 1.5
                }
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent pointer-events-none"
              style={{ width: '50%' }}
            />

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="mt-12 md:mt-16 flex justify-center"
            >
              <div className="w-32 md:w-48 h-1 bg-brand-deep/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 1.2,
                    delay: 1.7,
                    ease: "easeInOut"
                  }}
                  className="h-full bg-gradient-to-r from-brand-gold to-brand-deep rounded-full"
                />
              </div>
            </motion.div>

            {/* Elegant dots animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
              className="mt-6 flex justify-center gap-2"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    delay: 2.2 + index * 0.2,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                  className="w-2 h-2 rounded-full bg-brand-gold"
                />
              ))}
            </motion.div>
          </div>

          {/* Decorative corner elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-brand-gold/40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-brand-gold/40"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
