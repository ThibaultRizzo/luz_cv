"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { contentApi } from "./api";
import { DEFAULT_CONTENT } from "./constants/defaultContent";
import { logger } from "./logger";

interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    location: string;
    achievements: string[];
    highlight: string;
}

interface SoftSkill {
    skill: string;
    icon: string;
}

interface TextContent {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroBadge: string;
    heroImage: string;
    heroStats: { metric: string; label: string }[];
    heroCtaText: string;
    heroScrollText: string;
    headerFont: string;
    loadingScreenFirstName: string;
    loadingScreenLastName: string;
    loadingScreenTagline: string;
    aboutTitle: string;
    aboutDescription: string;
    aboutMainText: string;
    aboutSecondaryText: string;
    aboutBadge: string;
    aboutTitleSuffix: string;
    aboutApproachTitle: string;
    aboutApproachItems: { title: string; description: string }[];
    aboutImpactTitle: string;
    aboutImpactMetrics: { metric: string; label: string }[];
    experienceTitle: string;
    experienceSubtitle: string;
    experiences: ExperienceItem[];
    experienceBadge: string;
    experienceBottomStats: { metric: string; label: string }[];
    skillsTitle: string;
    skillsSubtitle: string;
    skillsDescription: string;
    certifications: string[];
    tools: string[];
    skillsBadge: string;
    skillsCertificationsTitle: string;
    skillsToolsTitle: string;
    softSkills: SoftSkill[];
    skillsSoftSkillsTitle: string;
    projectsTitle?: string;
    projects?: unknown[];
    themeFont?: {
        primary?: string;
        primaryUrl?: string;
        secondary?: string;
        secondaryUrl?: string;
    };
    themeColors?: {
        brandDeep?: string;
        brandCream?: string;
        brandGold?: string;
    };
    enabledLanguages?: string[];
    defaultLanguage?: string;
    translations?: Record<string, unknown>;
    contactTitle: string;
    contactSubtitle: string;
    contactDescription: string;
    contactBadge: string;
    contactFormTitle: string;
    contactFormLabels: {
        name: string;
        email: string;
        company: string;
        message: string;
    };
    contactFormPlaceholders: {
        name: string;
        email: string;
        company: string;
        message: string;
    };
    contactSubmitButton: string;
    contactSuccessMessage: string;
    contactErrorMessage: string;
    contactInfoTitle: string;
    contactEmail: string;
    contactLinkedin: string;
    contactPhone: string;
    contactAvailabilityTitle: string;
    contactAvailabilityStatus: string;
    contactAvailabilityDescription: string;
    contactAvailabilityItems: string[];
    contactDownloadText: string;
    contactCvPath: string;
    contactBottomInfo: {
        responseTime: { label: string; value: string };
        location: { label: string; value: string };
        languages: { label: string; value: string };
    };
}

interface TextContentContextType {
    textContent: TextContent;
    updateTextContent: (content: Partial<TextContent>) => void;
    refreshContent: () => Promise<void>;
}

const defaultTextContent: TextContent = DEFAULT_CONTENT as unknown as TextContent;

const TextContentContext = createContext<TextContentContextType | undefined>(
    undefined,
);

export function TextContentProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [textContent, setTextContent] =
        useState<TextContent>(defaultTextContent);

    const loadContent = async () => {
        try {
            const response = await contentApi.getContent();
            if (response.success && response.data) {
                setTextContent(response.data as unknown as TextContent);
            }
        } catch (error) {
            logger.error("Error loading content:", error);
            // Fall back to default content if API fails
        }
    };

    useEffect(() => {
        // Load content from API on mount
        loadContent();
    }, []);

    const refreshContent = async () => {
        await loadContent();
    };

    const updateTextContent = async (newContent: Partial<TextContent>) => {
        // Optimistically update UI
        setTextContent((prev) => ({ ...prev, ...newContent }));

        // Sync with backend
        try {
            const response = await contentApi.updateContent({
                ...textContent,
                ...newContent,
            } as Record<string, unknown>);
            if (response.success && response.data) {
                setTextContent(response.data as unknown as TextContent);
            }
        } catch (error) {
            logger.error("Error updating content:", error);
            // Revert on error
            setTextContent((prev) => prev);
        }
    };

    return (
        <TextContentContext.Provider value={{ textContent, updateTextContent, refreshContent }}>
            {children}
        </TextContentContext.Provider>
    );
}

export function useTextContent() {
    const context = useContext(TextContentContext);
    if (context === undefined) {
        throw new Error("useTextContent must be used within a TextContentProvider");
    }
    return context;
}
