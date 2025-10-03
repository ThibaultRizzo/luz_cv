"use client";

import { useEffect, useState } from 'react';

export default function Nav() {
    const [isOverDark, setIsOverDark] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const navItems = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'skills', label: 'Skills' },
        { id: 'achievements', label: 'Achievements' },
        { id: 'contact', label: 'Contact' }
    ];

    const handleNavClick = (id: string) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl border-b border-white/20" style={{backdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'}}>
            <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 flex justify-between items-center">
                <a
                    href="#hero"
                    className={`font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold transition-colors duration-500 tracking-wide sm:tracking-wider md:tracking-widest ${
                        isOverDark ? 'text-brand-gold' : 'text-brand-deep'
                    }`}
                >
                    NADIA LUNA
                </a>

                {/* Desktop Navigation - Minimal Dot Menu */}
                <div className="hidden md:flex items-center gap-2">
                    {navItems.slice(1).map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className="group relative px-3 py-2"
                            title={item.label}
                        >
                            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                isOverDark ? 'bg-brand-cream group-hover:bg-brand-gold' : 'bg-brand-deep group-hover:bg-brand-gold'
                            } group-hover:scale-150`}></div>

                            {/* Tooltip on hover */}
                            <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
                                isOverDark ? 'bg-brand-cream text-brand-deep' : 'bg-brand-deep text-brand-cream'
                            }`}>
                                {item.label}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`md:hidden p-2 rounded-lg transition-colors ${
                        isOverDark ? 'text-brand-gold' : 'text-brand-deep'
                    }`}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-white/20 backdrop-blur-3xl" style={{background: 'rgba(255, 255, 255, 0.05)'}}>
                    <div className="container mx-auto px-4 py-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`block w-full text-left py-3 px-4 rounded-lg transition-all duration-200 hover:bg-brand-gold/10 ${
                                    isOverDark ? 'text-brand-cream hover:text-brand-gold' : 'text-brand-deep hover:text-brand-gold'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
