"use client";

import { useEffect, useRef, useState } from "react";

export default function MouseFollower() {
    const [trailingPosition, setTrailingPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isOnDarkSection, setIsOnDarkSection] = useState(false);
    const [isOverInput, setIsOverInput] = useState(false);

    // Refs to hold latest mouse position without triggering re-renders
    const mouseRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number | null>(null);

    // Lerp factor for trailing (0-1). Higher = tighter to cursor.
    const LERP = 0.25;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            const isInteractive =
                !!target &&
                target.matches(
                    "a, button, [role='button'], input, textarea, select, .cursor-pointer"
                );
            setIsHovering(Boolean(isInteractive));

            // Détecter si on est sur un input (on cache le follower dans ce cas)
            const isInputElement = !!target && target.matches("input, textarea, select");
            setIsOverInput(Boolean(isInputElement));

            // Detect if we're on a dark section (ton approche d'origine)
            const aboutSection = document.getElementById("about");
            const skillsSection = document.getElementById("skills");

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

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    // trailing animation using requestAnimationFrame and refs (no interval leak)
    useEffect(() => {
        const step = () => {
            setTrailingPosition((prev) => {
                const mx = mouseRef.current.x;
                const my = mouseRef.current.y;
                const nx = prev.x + (mx - prev.x) * LERP;
                const ny = prev.y + (my - prev.y) * LERP;
                return { x: nx, y: ny };
            });

            rafRef.current = requestAnimationFrame(step);
        };

        rafRef.current = requestAnimationFrame(step);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        };
    }, []);

    // ne rien afficher si on est invisible
    if (!isVisible) return null;

    // Taille du cercle (diamètre en px) - plus petit sur les inputs
    const SIZE = isOverInput ? 64 : 128;

    // Bord selon section sombre ou non
    const borderColor = isOnDarkSection ? "rgba(255,255,255,0.9)" : "rgba(30,41,59,0.9)";

    // Effet spécial pour les inputs ou éléments interactifs
    const backdropFilterValue = isOverInput
        ? "brightness(1.2) contrast(1.2) saturate(1.3)"
        : isHovering
            ? "brightness(1.1) contrast(1.1) saturate(1.2)"
            : "none";

    return (
        <>
            {/* wrapper positionné au trailing position; translate(-50%,-50%) centre le curseur */}
            <div
                aria-hidden
                className="fixed pointer-events-none z-[9999] transition-transform duration-150 ease-out"
                style={{
                    left: trailingPosition.x,
                    top: trailingPosition.y,
                    width: SIZE,
                    height: SIZE,
                    transform: `translate(-50%, -50%)`,
                }}
            >
                {/* Cercle extérieur (bord) */}
                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{
                        width: SIZE,
                        height: SIZE,
                        border: `1px solid ${borderColor}`,
                        boxShadow: isHovering
                            ? "0 8px 30px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.12)"
                            : "0 6px 18px rgba(0,0,0,0.12)",
                        background: "rgba(255,255,255,0.02)",
                        transition: "all 140ms ease-out",
                    }}
                />

                {/* Zone interne — c'est ici qu'on invert les couleurs via backdrop-filter */}
                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden pointer-events-none"
                    style={{
                        width: SIZE,
                        height: SIZE,
                        clipPath: "circle(50% at 50% 50%)",
                        backdropFilter: backdropFilterValue,
                        WebkitBackdropFilter: backdropFilterValue,
                        transition: "backdrop-filter 140ms ease, -webkit-backdrop-filter 140ms ease",
                        background: "transparent",
                    }}
                >
                    {/* Optionnel : léger overlay pour lisser la transition */}
                    <div
                        aria-hidden
                        style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "50%",
                            pointerEvents: "none",
                            transition: "background 140ms ease",
                            background: isHovering ? "rgba(255,255,255,0.02)" : "transparent",
                        }}
                    />
                </div>

                {/* Anneau interne pour effet 'verre' */}
                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={{
                        width: SIZE,
                        height: SIZE,
                        border: `1px solid rgba(255,255,255,${isHovering ? 0.35 : 0.28})`,
                        boxShadow: isHovering
                            ? "inset 0 0 30px rgba(255,255,255,0.12), 0 10px 30px rgba(0,0,0,0.08)"
                            : "inset 0 0 18px rgba(255,255,255,0.08), 0 6px 18px rgba(0,0,0,0.06)",
                        transition: "all 160ms ease",
                        pointerEvents: "none",
                    }}
                />
            </div>
        </>
    );
}
