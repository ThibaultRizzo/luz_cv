"use client";

import { useEffect, useState } from 'react';

export default function Nav() {
    const [isOverDark, setIsOverDark] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Get all sections
            const aboutSection = document.getElementById('about');
            const skillsSection = document.getElementById('skills');

            if (!aboutSection || !skillsSection) return;

            const scrollY = window.scrollY + 100; // Header height offset

            // Check if we're in About or Skills sections (dark backgrounds)
            const aboutTop = aboutSection.offsetTop;
            const aboutBottom = aboutTop + aboutSection.offsetHeight;
            const skillsTop = skillsSection.offsetTop;
            const skillsBottom = skillsTop + skillsSection.offsetHeight;

            const isInAbout = scrollY >= aboutTop && scrollY < aboutBottom;
            const isInSkills = scrollY >= skillsTop && scrollY < skillsBottom;

            setIsOverDark(isInAbout || isInSkills);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl border-b border-white/20" style={{backdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'}}>
            <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 flex justify-start items-center">
                <a
                    href="#hero"
                    className={`font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold transition-colors duration-500 tracking-wide sm:tracking-wider md:tracking-widest ${
                        isOverDark ? 'text-brand-gold' : 'text-brand-deep'
                    }`}
                >
                    NADIA LUNA
                </a>
            </nav>
        </header>
    );
}
