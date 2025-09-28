"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface TextContent {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    experienceTitle: string;
    skillsTitle: string;
    contactTitle: string;
    contactSubtitle: string;
    contactDescription: string;
}

interface TextContentContextType {
    textContent: TextContent;
    updateTextContent: (content: Partial<TextContent>) => void;
}

const defaultTextContent: TextContent = {
    heroTitle: "Ready to create",
    heroSubtitle: "something extraordinary?",
    heroDescription: "Transforming luxury retail experiences through innovative product leadership and strategic vision.",
    aboutTitle: "About Nadia",
    aboutDescription: "Experienced product leader with a passion for luxury retail and fashion technology.",
    experienceTitle: "Experience",
    skillsTitle: "Skills & Expertise",
    contactTitle: "Ready to create",
    contactSubtitle: "something extraordinary?",
    contactDescription: "Whether you're looking to transform your luxury retail experience or explore new product opportunities, I'd love to hear from you."
};

const TextContentContext = createContext<TextContentContextType | undefined>(undefined);

export function TextContentProvider({ children }: { children: React.ReactNode }) {
    const [textContent, setTextContent] = useState<TextContent>(defaultTextContent);

    useEffect(() => {
        // Load saved content from localStorage on mount
        const savedContent = localStorage.getItem('websiteContent');
        if (savedContent) {
            try {
                setTextContent(JSON.parse(savedContent));
            } catch (error) {
                console.error('Error parsing saved content:', error);
            }
        }
    }, []);

    const updateTextContent = (newContent: Partial<TextContent>) => {
        setTextContent(prev => ({ ...prev, ...newContent }));
    };

    return (
        <TextContentContext.Provider value={{ textContent, updateTextContent }}>
            {children}
        </TextContentContext.Provider>
    );
}

export function useTextContent() {
    const context = useContext(TextContentContext);
    if (context === undefined) {
        throw new Error('useTextContent must be used within a TextContentProvider');
    }
    return context;
}
