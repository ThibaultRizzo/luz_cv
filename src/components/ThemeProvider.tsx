"use client";

import { useEffect } from 'react';
import { useTextContent } from '@/lib/TextContentContext';

export default function ThemeProvider() {
    const { textContent } = useTextContent();

    useEffect(() => {
        if (!textContent) return;

        // Load Google Fonts dynamically
        const loadFont = (fontUrl: string, id: string) => {
            // Remove existing font link if it exists
            const existingLink = document.getElementById(id);
            if (existingLink) {
                existingLink.remove();
            }

            // Create new link element for the font
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = fontUrl;
            document.head.appendChild(link);
        };

        // Load fonts if they exist
        if (textContent.themeFont?.primaryUrl) {
            loadFont(textContent.themeFont.primaryUrl, 'dynamic-primary-font');
        }
        if (textContent.themeFont?.secondaryUrl) {
            loadFont(textContent.themeFont.secondaryUrl, 'dynamic-secondary-font');
        }

        // Apply CSS custom properties for colors
        if (textContent.themeColors) {
            const root = document.documentElement;
            
            if (textContent.themeColors.brandDeep) {
                root.style.setProperty('--color-brand-deep', textContent.themeColors.brandDeep);
            }
            if (textContent.themeColors.brandCream) {
                root.style.setProperty('--color-brand-cream', textContent.themeColors.brandCream);
            }
            if (textContent.themeColors.brandGold) {
                root.style.setProperty('--color-brand-gold', textContent.themeColors.brandGold);
            }
        }

        // Apply font families
        if (textContent.themeFont) {
            const root = document.documentElement;
            
            if (textContent.themeFont.primary) {
                // Update the CSS custom property for serif fonts
                root.style.setProperty('--font-family-serif', `"${textContent.themeFont.primary}", ui-serif, Georgia, serif`);
            }
            if (textContent.themeFont.secondary) {
                // Update the CSS custom property for sans-serif fonts
                root.style.setProperty('--font-family-sans', `"${textContent.themeFont.secondary}", ui-sans-serif, system-ui, sans-serif`);
            }
        }
    }, [textContent]);

    return null;
}

