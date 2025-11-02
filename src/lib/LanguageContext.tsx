"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTextContent, type TextContent } from './TextContentContext';

interface LanguageContextType {
    currentLanguage: string;
    setLanguage: (lang: string) => void;
    enabledLanguages: string[];
    defaultLanguage: string;
    getTranslatedContent: () => TextContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const { textContent } = useTextContent();
    const [currentLanguage, setCurrentLanguage] = useState<string>('en');

    // Detect browser language on mount
    useEffect(() => {
        if (!textContent) return;

        const browserLang = navigator.language.split('-')[0]; // e.g., 'en-US' -> 'en'
        const enabledLangs = textContent.enabledLanguages || ['en'];
        const defaultLang = textContent.defaultLanguage || 'en';
        const savedLang = localStorage.getItem('preferredLanguage');

        // Priority: saved preference > browser language > default
        if (savedLang && enabledLangs.includes(savedLang)) {
            setCurrentLanguage(savedLang);
        } else if (enabledLangs.includes(browserLang)) {
            setCurrentLanguage(browserLang);
        } else {
            setCurrentLanguage(defaultLang);
        }
    }, [textContent]);

    const setLanguage = (lang: string) => {
        setCurrentLanguage(lang);
        localStorage.setItem('preferredLanguage', lang);
    };

    const getTranslatedContent = (): TextContent => {
        if (!textContent) return {} as TextContent;

        const defaultLang = textContent.defaultLanguage || 'en';
        
        // If current language is the default, return base content
        if (currentLanguage === defaultLang) {
            return textContent;
        }

        // Otherwise, merge base content with translations
        const translations = textContent.translations?.[currentLanguage] || {};
        return { ...textContent, ...translations } as TextContent;
    };

    return (
        <LanguageContext.Provider
            value={{
                currentLanguage,
                setLanguage,
                enabledLanguages: textContent?.enabledLanguages || ['en'],
                defaultLanguage: textContent?.defaultLanguage || 'en',
                getTranslatedContent,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

