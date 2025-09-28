"use client";

import { useEffect, useState } from 'react';

export default function MouseFollower() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [trailingPosition, setTrailingPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isOnDarkSection, setIsOnDarkSection] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.matches('a, button, [role="button"], input, textarea, select, .cursor-pointer');
            setIsHovering(isInteractive);

            // Detect if we're on a dark section
            const aboutSection = document.getElementById('about');
            const skillsSection = document.getElementById('skills');

            if (aboutSection && skillsSection) {
                const scrollY = window.scrollY + 100;
                const aboutTop = aboutSection.offsetTop;
                const aboutBottom = aboutTop + aboutSection.offsetHeight;
                const skillsTop = skillsSection.offsetTop;
                const skillsBottom = skillsTop + skillsSection.offsetHeight;

                const isInAbout = scrollY >= aboutTop && scrollY < aboutBottom;
                const isInSkills = scrollY >= skillsTop && scrollY < skillsBottom;

                setIsOnDarkSection(isInAbout || isInSkills);
            }
        };

        // Faster trailing animation
        const animateTrailing = () => {
            setTrailingPosition(prev => ({
                x: prev.x + (mousePosition.x - prev.x) * 0.25,
                y: prev.y + (mousePosition.y - prev.y) * 0.25,
            }));
        };

        const trailingInterval = setInterval(animateTrailing, 8);

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseover', handleMouseOver);
            clearInterval(trailingInterval);
        };
    }, [mousePosition]);

    if (!isVisible) return null;

    return (
        <>
            {/* Magnifying Glass Circle with Zoom Effect */}
            <div
                className="fixed pointer-events-none z-[9999] transition-all duration-100 ease-out"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    transform: `translate(-50%, -50%) scale(${isHovering ? 1.2 : 1})`,
                }}
            >
                {/* Border Circle */}
                <div
                    className="absolute w-24 h-24 rounded-full border"
                    style={{
                        borderWidth: '1px',
                        borderColor: isOnDarkSection
                            ? '#D4AF37' // Gold on dark sections
                            : '#1e293b', // Dark blue on light sections
                        boxShadow: isOnDarkSection
                            ? '0 0 15px rgba(212, 175, 55, 0.3)'
                            : '0 0 15px rgba(30, 41, 59, 0.3)'
                    }}
                />

                {/* Zoom Effect - Shows magnified content */}
                <div
                    className="absolute w-24 h-24 rounded-full overflow-hidden"
                    style={{
                        background: 'transparent',
                        clipPath: 'circle(48px at center)',
                    }}
                >
                    <div
                        className="absolute w-full h-full"
                        style={{
                            background: `radial-gradient(circle at center, 
                                rgba(255, 255, 255, 0.1) 0%, 
                                rgba(255, 255, 255, 0.05) 30%, 
                                transparent 70%)`,
                            backdropFilter: 'brightness(1.3) contrast(1.2)',
                            transform: 'scale(1.5)',
                        }}
                    />
                </div>
            </div>

        </>
    );
}
