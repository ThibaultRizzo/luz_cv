"use client";

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

const LANGUAGE_INFO: Record<string, { name: string; flag: string }> = {
    en: { name: 'English', flag: '🇬🇧' },
    fr: { name: 'Français', flag: '🇫🇷' },
    es: { name: 'Español', flag: '🇪🇸' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    it: { name: 'Italiano', flag: '🇮🇹' },
    pt: { name: 'Português', flag: '🇵🇹' },
    nl: { name: 'Nederlands', flag: '🇳🇱' },
    ja: { name: '日本語', flag: '🇯🇵' },
    zh: { name: '中文', flag: '🇨🇳' },
    ko: { name: '한국어', flag: '🇰🇷' },
    ar: { name: 'العربية', flag: '🇸🇦' },
    ru: { name: 'Русский', flag: '🇷🇺' },
};

export default function LanguageSwitcher() {
    const { currentLanguage, setLanguage, enabledLanguages } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    // Don't show switcher if only one language is enabled
    if (enabledLanguages.length <= 1) return null;

    const currentLangInfo = LANGUAGE_INFO[currentLanguage] || { name: currentLanguage.toUpperCase(), flag: '🌍' };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-cream/10 hover:bg-brand-cream/20 border border-brand-cream/20 hover:border-brand-cream/30 transition-all duration-300"
                aria-label="Switch language"
            >
                <span className="text-xl">{currentLangInfo.flag}</span>
                <span className="text-sm font-medium text-brand-cream hidden sm:inline">{currentLangInfo.name}</span>
                <svg
                    className={`w-4 h-4 text-brand-cream transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 py-2 w-48 bg-brand-deep rounded-lg shadow-xl border border-brand-gold/30 z-50">
                        {enabledLanguages.map((langCode) => {
                            const langInfo = LANGUAGE_INFO[langCode] || { name: langCode.toUpperCase(), flag: '🌍' };
                            return (
                                <button
                                    key={langCode}
                                    onClick={() => {
                                        setLanguage(langCode);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-brand-gold/10 transition-colors ${
                                        currentLanguage === langCode ? 'bg-brand-gold/20' : ''
                                    }`}
                                >
                                    <span className="text-2xl">{langInfo.flag}</span>
                                    <span className={`text-sm font-medium ${
                                        currentLanguage === langCode ? 'text-brand-gold' : 'text-brand-cream'
                                    }`}>
                                        {langInfo.name}
                                    </span>
                                    {currentLanguage === langCode && (
                                        <span className="ml-auto text-brand-gold">✓</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

