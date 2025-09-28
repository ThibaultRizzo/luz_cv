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
                        borderColor: '#1e293b', // Always dark blue
                        boxShadow: '0 0 15px rgba(30, 41, 59, 0.3)'
                    }}
                />

                {/* Real Magnifying Glass Effect */}
                <div
                    className="absolute w-24 h-24 rounded-full overflow-hidden"
                    style={{
                        background: 'transparent',
                        clipPath: 'circle(48px at center)',
                    }}
                >
                    {/* Strong magnification effect */}
                    <div
                        className="absolute w-full h-full"
                        style={{
                            backdropFilter: 'brightness(1.5) contrast(1.4) saturate(1.3) blur(0.5px)',
                            WebkitBackdropFilter: 'brightness(1.5) contrast(1.4) saturate(1.3) blur(0.5px)',
                            transform: 'scale(1.8)',
                            transformOrigin: 'center',
                            mixBlendMode: 'screen',
                        }}
                    />
                    
                    {/* Glass lens shine */}
                    <div
                        className="absolute w-full h-full rounded-full"
                        style={{
                            background: `
                                radial-gradient(circle at 25% 25%, 
                                    rgba(255, 255, 255, 0.4) 0%, 
                                    rgba(255, 255, 255, 0.15) 15%, 
                                    transparent 35%),
                                radial-gradient(circle at 75% 75%, 
                                    rgba(255, 255, 255, 0.1) 0%, 
                                    transparent 25%)
                            `,
                            mixBlendMode: 'overlay',
                        }}
                    />
                </div>
                
                {/* Glass edge highlight */}
                <div
                    className="absolute w-24 h-24 rounded-full pointer-events-none"
                    style={{
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.2), 0 0 20px rgba(255, 255, 255, 0.1)',
                    }}
                />
            </div>

        </>
    );
}
