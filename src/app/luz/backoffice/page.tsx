"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authApi, contentApi } from "@/lib/api";
import { useTextContent } from "@/lib/TextContentContext";
import EmojiPicker from "@/components/EmojiPicker";
import QRCode from "qrcode";

interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    location: string;
    achievements: string[];
    highlight: string;
    icon?: string;
    iconType?: 'emoji' | 'upload';
}

interface SkillCard {
    title: string;
    icon: string;
    iconType: 'emoji' | 'upload';
    width: 'half' | 'full';
    items: Array<{
        title: string;
        icon: string;
        iconType?: 'emoji' | 'upload';
    }>;
}

interface Project {
    title: string;
    subtitle: string;
    image: string;
    link?: string;
    tags?: string[];
}

interface SoftSkill {
    skill: string;
    icon: string;
}

interface StatItem {
    metric: string;
    label: string;
}

interface ApproachItem {
    title: string;
    description: string;
}

interface ContactFormLabels {
    name: string;
    email: string;
    company: string;
    message: string;
}

interface ContactBottomInfo {
    responseTime: { label: string; value: string };
    location: { label: string; value: string };
    languages: { label: string; value: string };
}

interface ThemeFont {
    primary: string;
    primaryUrl: string;
    secondary: string;
    secondaryUrl: string;
}

interface ThemeColors {
    brandDeep: string;
    brandCream: string;
    brandGold: string;
}

interface Language {
    code: string;
    name: string;
    flag: string;
}

interface TextContent {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroBadge: string;
    heroImage: string;
    heroStats: StatItem[];
    heroCtaText: string;
    heroScrollText: string;
    headerFont: string;
    aboutTitle: string;
    aboutDescription: string;
    aboutMainText: string;
    aboutSecondaryText: string;
    aboutBadge: string;
    aboutTitleSuffix: string;
    aboutApproachTitle: string;
    aboutApproachItems: ApproachItem[];
    aboutImpactTitle: string;
    aboutImpactMetrics: StatItem[];
    experienceTitle: string;
    experienceSubtitle: string;
    experienceBadge: string;
    experienceBottomStats: StatItem[];
    experiences: ExperienceItem[];
    skillsTitle: string;
    skillsSubtitle: string;
    skillsDescription: string;
    skillsBadge: string;
    skillsCertificationsTitle: string;
    skillsToolsTitle: string;
    skillsQuoteAuthor: string;
    skillCards: SkillCard[];
    certifications: string[];
    tools: string[];
    skillsQuote: string;
    softSkills: SoftSkill[];
    skillsSoftSkillsTitle: string;
    projectsTitle: string;
    projects: Project[];
    contactTitle: string;
    contactSubtitle: string;
    contactDescription: string;
    contactBadge: string;
    contactFormTitle: string;
    contactFormLabels: ContactFormLabels;
    contactFormPlaceholders: ContactFormLabels;
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
    contactBottomInfo: ContactBottomInfo;
    loadingScreenFirstName: string;
    loadingScreenLastName: string;
    loadingScreenTagline: string;
    themeFont: ThemeFont;
    themeColors: ThemeColors;
    enabledLanguages: string[];
    defaultLanguage: string;
    translations: Record<string, Partial<TextContent>>;
}

export default function BackOffice() {
    const { refreshContent } = useTextContent();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [textContent, setTextContent] = useState<TextContent>({
        heroTitle: "Ready to create",
        heroSubtitle: "something extraordinary?",
        heroDescription:
            "Transforming luxury retail experiences through innovative product leadership and strategic vision.",
        heroBadge: "",
        heroImage: "/luz.jpg",
        heroStats: [],
        heroCtaText: "",
        heroScrollText: "",
        headerFont: "playfair",
        aboutTitle: "Turning vision into reality",
        aboutDescription:
            "Experienced product leader with a passion for luxury retail and fashion technology.",
        aboutMainText:
            "I am a visionary Product Owner with over a decade of experience transforming luxury retail landscapes through strategic innovation and customer-obsessed design.",
        aboutSecondaryText:
            "My expertise lies in bridging the gap between ambitious business goals and exceptional user experiences. I've built my career on one fundamental belief: premium products deserve premium experiences.",
        aboutBadge: "",
        aboutTitleSuffix: "",
        aboutApproachTitle: "",
        aboutApproachItems: [],
        aboutImpactTitle: "",
        aboutImpactMetrics: [],
        experienceTitle: "A decade of",
        experienceSubtitle: "transformation",
        experienceBadge: "",
        experienceBottomStats: [],
        experiences: [
            {
                role: "Senior Product Owner",
                company: "Maison Lumière",
                period: "2018 - Present",
                location: "Paris, France",
                achievements: [
                    "Spearheaded digital transformation resulting in €25M+ revenue increase",
                    "Led cross-functional teams of 15+ across 3 countries",
                    "Launched omnichannel platform serving 2M+ customers globally",
                    "Achieved 40% increase in online conversion rates",
                ],
                highlight:
                    "Transformed traditional luxury retail into digital-first experiences",
            },
        ],
        skillsTitle: "Mastery through",
        skillsSubtitle: "experience",
        skillsDescription:
            "A decade of hands-on experience has shaped these core competencies that drive exceptional results in luxury retail product management.",
        skillsBadge: "",
        skillsCertificationsTitle: "",
        skillsToolsTitle: "",
        skillsQuoteAuthor: "",
        skillCards: [
            {
                title: "Product Leadership",
                icon: "🎯",
                iconType: "emoji",
                width: "half",
                items: [
                    { title: "Product Strategy", icon: "📋", iconType: "emoji" },
                    { title: "Roadmap Planning", icon: "🗺️", iconType: "emoji" },
                    { title: "Team Management", icon: "👥", iconType: "emoji" }
                ]
            },
            {
                title: "Technical Skills",
                icon: "💻",
                iconType: "emoji",
                width: "half",
                items: [
                    { title: "React & Next.js", icon: "⚛️", iconType: "emoji" },
                    { title: "TypeScript", icon: "📘", iconType: "emoji" },
                    { title: "UI/UX Design", icon: "🎨", iconType: "emoji" }
                ]
            }
        ],
        certifications: [
            "Certified Scrum Product Owner (CSPO)",
            "Google Analytics Certified",
        ],
        tools: ["Jira", "Figma", "Shopify Plus", "Salesforce"],
        skillsQuote:
            "Skills are built through challenges, refined through experience, and perfected through passion.",
        softSkills: [
            { skill: 'Executive Stakeholder Management', icon: '🤝' },
            { skill: 'Cross-Cultural Communication', icon: '🌍' },
            { skill: 'Luxury Customer Psychology', icon: '✨' },
            { skill: 'Change Management', icon: '🔄' }
        ],
        skillsSoftSkillsTitle: "Leadership & Soft Skills",
        projectsTitle: "Featured Projects",
        projects: [
            { 
                title: "Sample Project", 
                subtitle: "A description of the project", 
                image: "/luz.jpg",
                link: "",
                tags: ["Next.js", "TypeScript", "Design"]
            },
        ],
        contactTitle: "Ready to create",
        contactSubtitle: "something extraordinary?",
        contactDescription:
            "Whether you're looking to transform your luxury retail experience or explore new product opportunities, I'd love to hear from you.",
        contactBadge: "",
        contactFormTitle: "",
        contactFormLabels: { name: "", email: "", company: "", message: "" },
        contactFormPlaceholders: { name: "", email: "", company: "", message: "" },
        contactSubmitButton: "",
        contactSuccessMessage: "",
        contactErrorMessage: "",
        contactInfoTitle: "",
        contactEmail: "",
        contactLinkedin: "",
        contactPhone: "",
        contactAvailabilityTitle: "",
        contactAvailabilityStatus: "",
        contactAvailabilityDescription: "",
        contactAvailabilityItems: [],
        contactDownloadText: "",
        contactCvPath: "/cv.pdf",
        contactBottomInfo: {
            responseTime: { label: "", value: "" },
            location: { label: "", value: "" },
            languages: { label: "", value: "" },
        },
        loadingScreenFirstName: "LUZ",
        loadingScreenLastName: "QUINTANAR",
        loadingScreenTagline: "Product Owner • Luxury Retail",
        themeFont: {
            primary: "Playfair Display",
            primaryUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
            secondary: "Inter",
            secondaryUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        },
        themeColors: {
            brandDeep: "#1a1a1a",
            brandCream: "#f5f1e8",
            brandGold: "#c7a17a"
        },
        enabledLanguages: ["en"],
        defaultLanguage: "en",
        translations: {}
    });
    const [activeTab, setActiveTab] = useState("hero");
    const [currentLanguage, setCurrentLanguage] = useState("en");
    const [availableLanguages, setAvailableLanguages] = useState<Record<string, Language>>({});
    const [isTranslating, setIsTranslating] = useState(false);
    const [saveStatus, setSaveStatus] = useState<
        "idle" | "saving" | "saved" | "error"
    >("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [uploadingCv, setUploadingCv] = useState(false);
    const [cvUploadStatus, setCvUploadStatus] = useState<string>("");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageUploadStatus, setImageUploadStatus] = useState<string>("");
    const [showPreview, setShowPreview] = useState(false); // For mobile toggle
    const [showQRCode, setShowQRCode] = useState(false);
    const router = useRouter();

    // Function to load content from API
    const loadContent = useCallback(async () => {
        try {
            const contentResponse = await contentApi.getContent();
            if (contentResponse.success && contentResponse.data) {
                setTextContent(contentResponse.data as unknown as TextContent);
            }
        } catch (error) {
            console.error("Failed to load content:", error);
        }
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            if (!authApi.isLoggedIn()) {
                router.push("/luz");
                return;
            }

            try {
                // Verify token with backend
                const userResponse = await authApi.getCurrentUser();
                if (!userResponse.success) {
                    router.push("/luz");
                    return;
                }

                setIsAuthenticated(true);

                // Load content from API
                await loadContent();
            } catch (error) {
                console.error("Auth check failed:", error);
                router.push("/luz");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router, loadContent]);

    // Load available languages
    useEffect(() => {
        const loadLanguages = async () => {
            try {
                const response = await fetch('/api/translate');
                const data = await response.json();
                if (data.success) {
                    setAvailableLanguages(data.languages);
                }
            } catch (error) {
                console.error('Failed to load languages:', error);
            }
        };
        loadLanguages();
    }, []);

    // Add a new language
    const addLanguage = async (languageCode: string) => {
        if (textContent.enabledLanguages.includes(languageCode)) {
            setErrorMessage('Language already enabled');
            return;
        }

        setIsTranslating(true);
        setErrorMessage('');

        try {
            // Get current content (excluding meta fields)
            const contentToTranslate: Partial<TextContent> = {};
            Object.keys(textContent).forEach(key => {
                if (!['enabledLanguages', 'defaultLanguage', 'translations', 'themeFont', 'themeColors'].includes(key)) {
                    (contentToTranslate as Record<string, unknown>)[key] = textContent[key as keyof TextContent];
                }
            });

            // Call translation API
            const token = localStorage.getItem('accessToken');
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    content: contentToTranslate,
                    sourceLang: textContent.defaultLanguage,
                    targetLang: languageCode,
                }),
            });

            const data = await response.json();
            if (data.success) {
                setTextContent(prev => ({
                    ...prev,
                    enabledLanguages: [...prev.enabledLanguages, languageCode],
                    translations: {
                        ...prev.translations,
                        [languageCode]: data.translatedContent
                    }
                }));
                setCurrentLanguage(languageCode);
            } else {
                setErrorMessage(data.error || 'Translation failed');
            }
        } catch (error) {
            console.error('Translation error:', error);
            setErrorMessage('Failed to translate content');
        } finally {
            setIsTranslating(false);
        }
    };

    // Remove a language
    const removeLanguage = (languageCode: string) => {
        if (languageCode === textContent.defaultLanguage) {
            setErrorMessage('Cannot remove default language');
            return;
        }

        const newTranslations = { ...textContent.translations };
        delete newTranslations[languageCode];

        setTextContent(prev => ({
            ...prev,
            enabledLanguages: prev.enabledLanguages.filter(lang => lang !== languageCode),
            translations: newTranslations
        }));

        if (currentLanguage === languageCode) {
            setCurrentLanguage(textContent.defaultLanguage);
        }
    };

    // Set default language
    const setDefaultLanguageHandler = (languageCode: string) => {
        if (!textContent.enabledLanguages.includes(languageCode)) {
            setErrorMessage('Language must be enabled first');
            return;
        }

        setTextContent(prev => ({
            ...prev,
            defaultLanguage: languageCode
        }));
    };

    // Get content for current language (for preview)
    const getCurrentLanguageContent = () => {
        const defaultLang = textContent.defaultLanguage || 'en';
        
        // If current language is the default, return base content
        if (currentLanguage === defaultLang) {
            return textContent;
        }

        // Otherwise, merge base content with translations
        const translations = textContent.translations?.[currentLanguage] || {};
        return { ...textContent, ...translations };
    };

    // Helper function to get a field value for the current language
    const getFieldValue = <K extends keyof TextContent>(field: K): TextContent[K] => {
        const defaultLang = textContent.defaultLanguage || 'en';
        
        // If editing default language, return base content
        if (currentLanguage === defaultLang) {
            return textContent[field];
        }

        // Otherwise, return translation if it exists, or base content as fallback
        const translations = textContent.translations?.[currentLanguage] as Partial<TextContent> | undefined;
        return (translations?.[field] ?? textContent[field]) as TextContent[K];
    };

    // Helper function to update a field for the current language
    const setFieldValue = <K extends keyof TextContent>(field: K, value: TextContent[K]) => {
        const defaultLang = textContent.defaultLanguage || 'en';
        
        // If editing default language, update base content
        if (currentLanguage === defaultLang) {
            setTextContent((prev) => ({
                ...prev,
                [field]: value,
            }));
        } else {
            // Otherwise, update translation for current language
            setTextContent((prev) => {
                const currentTranslations = prev.translations?.[currentLanguage] as Partial<TextContent> || {};
                return {
                    ...prev,
                    translations: {
                        ...prev.translations,
                        [currentLanguage]: {
                            ...currentTranslations,
                            [field]: value,
                        },
                    },
                };
            });
        }
    };

    const handleLogout = async () => {
        try {
            await authApi.logout();
            // Refresh content so homepage shows latest changes
            await refreshContent();
        } finally {
            // Redirect to homepage
            router.push("/");
        }
    };

    // Generate QR code when modal opens
    useEffect(() => {
        if (showQRCode && typeof window !== 'undefined') {
            const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
            if (canvas) {
                QRCode.toCanvas(
                    canvas,
                    window.location.origin,
                    {
                        width: 256,
                        margin: 2,
                        color: {
                            dark: '#0B132B',
                            light: '#FFFFFF'
                        }
                    },
                    (error: Error | null | undefined) => {
                        if (error) console.error('QR Code generation error:', error);
                    }
                );
            }
        }
    }, [showQRCode]);

    const handleTextChange = (
        field: keyof TextContent,
        value: string | string[] | SoftSkill[] | Project[],
    ) => {
        setFieldValue(field, value as TextContent[typeof field]);
    };

    const handleSave = async () => {
        setSaveStatus("saving");
        setErrorMessage("");
        try {
            const response = await contentApi.updateContent(
                textContent as unknown as Record<string, unknown>,
            );

            if (response.success) {
                setSaveStatus("saved");
                // Reload content from database to ensure we're showing what was actually saved
                await loadContent();
                // Also refresh the TextContentContext so front office shows updated content
                await refreshContent();
                setTimeout(() => setSaveStatus("idle"), 3000);
            } else {
                setSaveStatus("error");
                setErrorMessage(response.message || "Failed to save changes");
                console.error("Save failed:", response);
                setTimeout(() => setSaveStatus("idle"), 5000);
            }
        } catch (error) {
            console.error("Save error:", error);

            // Check if it's an authentication error
            if (error instanceof Error && (error.message.includes('401') || error.message.includes('Unauthorized'))) {
                await authApi.logout();
                router.push('/luz');
                return;
            }

            setSaveStatus("error");
            setErrorMessage(
                error instanceof Error ? error.message : "Network error occurred",
            );
            setTimeout(() => setSaveStatus("idle"), 5000);
        }
    };

    const updateExperience = <K extends keyof ExperienceItem>(
        index: number,
        field: K,
        value: ExperienceItem[K],
    ) => {
        const newExperiences = [...getFieldValue("experiences")];
        newExperiences[index][field] = value;
        setFieldValue("experiences", newExperiences);
    };

    const addExperience = () => {
        const newExperience: ExperienceItem = {
            role: "New Role",
            company: "Company Name",
            period: "2023 - Present",
            location: "Location",
            achievements: ["Achievement 1", "Achievement 2"],
            highlight: "Main highlight",
            icon: "💼",
            iconType: "emoji",
        };
        const experiences = getFieldValue("experiences");
        setFieldValue("experiences", [...experiences, newExperience]);
    };

    // Image Upload handler for experience icons
    const handleExperienceIconUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        expIndex: number
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            alert('Only JPG, PNG, WebP, or SVG images are allowed');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            updateExperience(expIndex, 'icon', data.path);
            updateExperience(expIndex, 'iconType', 'upload');
        } catch (error) {
            console.error('Error uploading icon:', error);
            alert('Failed to upload icon. Please try again.');
        }
    };

    const removeExperience = (index: number) => {
        const experiences = getFieldValue("experiences");
        setFieldValue("experiences", experiences.filter((_, i) => i !== index));
    };

    const updateProject = (
        index: number,
        field: Exclude<keyof Project, 'tags'>,
        value: string,
    ) => {
        const newProjects = [...getFieldValue("projects")];
        newProjects[index][field] = value;
        setFieldValue("projects", newProjects);
    };

    const addProject = () => {
        const newProject: Project = {
            title: "New Project",
            subtitle: "Project description",
            image: "/luz.jpg",
            link: "",
            tags: [],
        };
        const projects = getFieldValue("projects");
        setFieldValue("projects", [...projects, newProject]);
    };

    const removeProject = (index: number) => {
        const projects = getFieldValue("projects");
        setFieldValue("projects", projects.filter((_, i) => i !== index));
    };

    const addProjectTag = (projectIndex: number, tag: string) => {
        if (!tag.trim()) return;
        const newProjects = [...getFieldValue("projects")];
        if (!newProjects[projectIndex].tags) {
            newProjects[projectIndex].tags = [];
        }
        newProjects[projectIndex].tags!.push(tag.trim());
        setFieldValue("projects", newProjects);
    };

    const removeProjectTag = (projectIndex: number, tagIndex: number) => {
        const newProjects = [...getFieldValue("projects")];
        if (newProjects[projectIndex].tags) {
            newProjects[projectIndex].tags = newProjects[projectIndex].tags!.filter((_, i) => i !== tagIndex);
        }
        setFieldValue("projects", newProjects);
    };

    // Helper functions for StatItem arrays (heroStats, aboutImpactMetrics, experienceBottomStats)
    const updateStatItem = (
        field: "heroStats" | "aboutImpactMetrics" | "experienceBottomStats",
        index: number,
        key: keyof StatItem,
        value: string,
    ) => {
        const newStats = [...getFieldValue(field)];
        newStats[index][key] = value;
        setFieldValue(field, newStats);
    };

    const addStatItem = (
        field: "heroStats" | "aboutImpactMetrics" | "experienceBottomStats",
    ) => {
        const newStat: StatItem = { metric: "", label: "" };
        const stats = getFieldValue(field);
        setFieldValue(field, [...stats, newStat]);
    };

    const removeStatItem = (
        field: "heroStats" | "aboutImpactMetrics" | "experienceBottomStats",
        index: number,
    ) => {
        const stats = getFieldValue(field);
        setFieldValue(field, stats.filter((_, i) => i !== index));
    };

    // Helper functions for ApproachItem array
    const updateApproachItem = (
        index: number,
        key: keyof ApproachItem,
        value: string,
    ) => {
        const newItems = [...getFieldValue("aboutApproachItems")];
        newItems[index][key] = value;
        setFieldValue("aboutApproachItems", newItems);
    };

    const addApproachItem = () => {
        const newItem: ApproachItem = { title: "", description: "" };
        const items = getFieldValue("aboutApproachItems");
        setFieldValue("aboutApproachItems", [...items, newItem]);
    };

    const removeApproachItem = (index: number) => {
        const items = getFieldValue("aboutApproachItems");
        setFieldValue("aboutApproachItems", items.filter((_, i) => i !== index));
    };

    // Helper functions for SkillCard management
    const updateSkillCard = <K extends keyof SkillCard>(
        index: number,
        key: K,
        value: SkillCard[K],
    ) => {
        const newCards = [...getFieldValue("skillCards")];
        newCards[index][key] = value;
        setFieldValue("skillCards", newCards);
    };

    const addSkillCard = () => {
        const newCard: SkillCard = {
            title: "New Skill Category",
            icon: "⭐",
            iconType: "emoji",
            width: "half",
            items: [
                { title: "Skill 1", icon: "✨", iconType: "emoji" }
            ]
        };
        const cards = getFieldValue("skillCards");
        setFieldValue("skillCards", [...cards, newCard]);
    };

    const addSkillCardItem = (cardIndex: number) => {
        const newCards = [...getFieldValue("skillCards")];
        // Initialize items array if it doesn't exist
        if (!newCards[cardIndex].items) {
            newCards[cardIndex].items = [];
        }
        newCards[cardIndex].items.push({ title: "New Skill", icon: "✨", iconType: "emoji" });
        setFieldValue("skillCards", newCards);
    };

    const removeSkillCardItem = (cardIndex: number, itemIndex: number) => {
        const newCards = [...getFieldValue("skillCards")];
        if (newCards[cardIndex].items) {
            newCards[cardIndex].items = newCards[cardIndex].items.filter((_, i) => i !== itemIndex);
        }
        setFieldValue("skillCards", newCards);
    };

    const updateSkillCardItem = (cardIndex: number, itemIndex: number, field: 'title' | 'icon' | 'iconType', value: string) => {
        const newCards = [...getFieldValue("skillCards")];
        if (newCards[cardIndex].items && newCards[cardIndex].items[itemIndex]) {
            if (field === 'iconType') {
                newCards[cardIndex].items[itemIndex][field] = value as 'emoji' | 'upload';
            } else {
                newCards[cardIndex].items[itemIndex][field] = value;
            }
        }
        setFieldValue("skillCards", newCards);
    };

    // Image Upload handler for skill card item icons
    const handleSkillCardItemIconUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        cardIndex: number,
        itemIndex: number
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            alert('Only JPG, PNG, WebP, or SVG images are allowed');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            updateSkillCardItem(cardIndex, itemIndex, 'icon', data.path);
            updateSkillCardItem(cardIndex, itemIndex, 'iconType', 'upload');
        } catch (error) {
            console.error('Error uploading icon:', error);
            alert('Failed to upload icon. Please try again.');
        }
    };

    const removeSkillCard = (index: number) => {
        setTextContent((prev) => ({
            ...prev,
            skillCards: prev.skillCards.filter((_, i) => i !== index),
        }));
    };

    // Image Upload handler for skill card icons
    const handleSkillCardIconUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        cardIndex: number
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
        if (!allowedTypes.includes(file.type)) {
            alert('Only JPG, PNG, WebP, or SVG images are allowed');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            updateSkillCard(cardIndex, 'icon', data.path);
            updateSkillCard(cardIndex, 'iconType', 'upload');
        } catch (error) {
            console.error('Error uploading icon:', error);
            alert('Failed to upload icon. Please try again.');
        }
    };

    // Helper functions for ContactFormLabels
    const updateContactFormLabels = (
        key: keyof ContactFormLabels,
        value: string,
    ) => {
        setTextContent((prev) => ({
            ...prev,
            contactFormLabels: { ...prev.contactFormLabels, [key]: value },
        }));
    };

    const updateContactFormPlaceholders = (
        key: keyof ContactFormLabels,
        value: string,
    ) => {
        setTextContent((prev) => ({
            ...prev,
            contactFormPlaceholders: {
                ...prev.contactFormPlaceholders,
                [key]: value,
            },
        }));
    };

    // Helper functions for ContactBottomInfo
    const updateContactBottomInfo = (
        section: keyof ContactBottomInfo,
        key: "label" | "value",
        value: string,
    ) => {
        setTextContent((prev) => ({
            ...prev,
            contactBottomInfo: {
                ...prev.contactBottomInfo,
                [section]: { ...prev.contactBottomInfo[section], [key]: value },
            },
        }));
    };

    // Helper functions for Theme Settings
    const updateThemeFont = (key: keyof ThemeFont, value: string) => {
        setTextContent((prev) => ({
            ...prev,
            themeFont: {
                ...prev.themeFont,
                [key]: value,
            },
        }));
    };

    const updateThemeColor = (key: keyof ThemeColors, value: string) => {
        setTextContent((prev) => ({
            ...prev,
            themeColors: {
                ...prev.themeColors,
                [key]: value,
            },
        }));
    };

    // Image Upload handler (for hero section)
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setImageUploadStatus('Only JPG, PNG, or WebP images are allowed');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setImageUploadStatus('File size must be less than 5MB');
            return;
        }

        setUploadingImage(true);
        setImageUploadStatus('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'image');

            const token = localStorage.getItem('accessToken');
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (response.status === 401) {
                await authApi.logout();
                router.push('/luz');
                return;
            }

            if (result.success) {
                // Add timestamp to force browser to reload the image
                const cacheBustingPath = `${result.data.path}?t=${Date.now()}`;
                setTextContent(prev => ({
                    ...prev,
                    heroImage: cacheBustingPath
                }));
                setImageUploadStatus('Image uploaded successfully!');
            } else {
                setImageUploadStatus(result.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setImageUploadStatus('Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    // CV Upload handler
    const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setCvUploadStatus('Only PDF files are allowed');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setCvUploadStatus('File size must be less than 10MB');
            return;
        }

        setUploadingCv(true);
        setCvUploadStatus('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'cv');

            const token = localStorage.getItem('accessToken');
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (response.status === 401) {
                // Token expired or invalid - logout and redirect
                await authApi.logout();
                router.push('/luz');
                return;
            }

            if (result.success) {
                setTextContent(prev => ({
                    ...prev,
                    contactCvPath: result.data.path
                }));
                setCvUploadStatus('CV uploaded successfully!');
            } else {
                setCvUploadStatus(result.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setCvUploadStatus('Failed to upload CV');
        } finally {
            setUploadingCv(false);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "hero":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div className="bg-gradient-to-br from-brand-gold/10 to-brand-cream/5 p-4 sm:p-5 md:p-6 rounded-2xl border border-brand-gold/30">
                            <label className="block text-xs sm:text-sm font-semibold text-brand-gold mb-3">
                                Header Font (LUZ QUINTANAR)
                            </label>
                            <div className="relative">
                                <select
                                    value={textContent.headerFont || 'playfair'}
                                    onChange={(e) =>
                                        handleTextChange("headerFont", e.target.value)
                                    }
                                    className="w-full px-4 py-3.5 text-sm md:text-base bg-brand-deep/40 backdrop-blur-sm border-2 border-brand-gold/40 text-brand-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all duration-300 cursor-pointer hover:border-brand-gold/60 appearance-none"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23C7A17A'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 0.75rem center',
                                        backgroundSize: '1.5em 1.5em',
                                    }}
                                >
                                    <option value="playfair">Playfair Display — Bold & Dramatic</option>
                                    <option value="cormorant">Cormorant Garamond — Refined & Elegant</option>
                                    <option value="bodoni">Bodoni Moda — Ultra-Luxury</option>
                                </select>
                            </div>
                            <p className="text-xs text-brand-cream/70 mt-3 italic">
                                Choose the luxury font for the header navigation &quot;LUZ QUINTANAR&quot;
                            </p>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero Badge
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("heroBadge")}
                                onChange={(e) => handleTextChange("heroBadge", e.target.value)}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero Title
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("heroTitle")}
                                onChange={(e) => handleTextChange("heroTitle", e.target.value)}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero Subtitle
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("heroSubtitle")}
                                onChange={(e) =>
                                    handleTextChange("heroSubtitle", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero Description
                            </label>
                            <textarea
                                value={getFieldValue("heroDescription")}
                                onChange={(e) =>
                                    handleTextChange("heroDescription", e.target.value)
                                }
                                rows={4}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero Image
                            </label>
                            <div className="space-y-4">
                                {/* Image Preview */}
                                {textContent.heroImage && (
                                    <div className="relative w-full max-w-sm">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            key={textContent.heroImage}
                                            src={textContent.heroImage}
                                            alt="Hero preview"
                                            className="w-full h-auto rounded-xl border-2 border-brand-gold/30 shadow-lg"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = '/luz.jpg';
                                            }}
                                        />
                                    </div>
                                )}

                                {/* File Upload */}
                                <div className="space-y-3">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={handleImageUpload}
                                        disabled={uploadingImage}
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-deep hover:file:bg-brand-cream disabled:opacity-50"
                                    />
                                    {uploadingImage && (
                                        <p className="text-sm text-brand-gold">Uploading image...</p>
                                    )}
                                    {imageUploadStatus && (
                                        <p className={`text-sm ${imageUploadStatus.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                                            {imageUploadStatus}
                                        </p>
                                    )}
                                    <p className="text-xs text-brand-cream/60">
                                        Upload an image (JPG, PNG, WebP) - max 5MB. The image will be saved and used for the hero section.
                                    </p>
                                </div>

                                {/* Manual URL Input (optional) */}
                                <div className="border-t border-white/20 pt-4">
                                    <label className="block text-xs font-medium text-brand-cream/70 mb-2">
                                        Or enter image URL manually
                                    </label>
                                    <input
                                        type="text"
                                        value={getFieldValue("heroImage")}
                                        onChange={(e) =>
                                            handleTextChange("heroImage", e.target.value)
                                        }
                                        placeholder="/luz.jpg or https://example.com/image.jpg"
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero CTA Text
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("heroCtaText")}
                                onChange={(e) =>
                                    handleTextChange("heroCtaText", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Hero Scroll Text
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("heroScrollText")}
                                onChange={(e) =>
                                    handleTextChange("heroScrollText", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Hero Stats
                                </h3>
                                <button
                                    onClick={() => addStatItem("heroStats")}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Stat
                                </button>
                            </div>
                            <div className="space-y-4">
                                {getFieldValue("heroStats").map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium text-brand-cream">
                                                Stat {index + 1}
                                            </h4>
                                            <button
                                                onClick={() => removeStatItem("heroStats", index)}
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Metric
                                                </label>
                                                <input
                                                    type="text"
                                                    value={stat.metric}
                                                    onChange={(e) =>
                                                        updateStatItem(
                                                            "heroStats",
                                                            index,
                                                            "metric",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Label
                                                </label>
                                                <input
                                                    type="text"
                                                    value={stat.label}
                                                    onChange={(e) =>
                                                        updateStatItem(
                                                            "heroStats",
                                                            index,
                                                            "label",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case "about":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                About Badge
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("aboutBadge")}
                                onChange={(e) => handleTextChange("aboutBadge", e.target.value)}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    About Title
                                </label>
                                <input
                                    type="text"
                                    value={getFieldValue("aboutTitle")}
                                    onChange={(e) =>
                                        handleTextChange("aboutTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    About Title Suffix
                                </label>
                                <input
                                    type="text"
                                    value={getFieldValue("aboutTitleSuffix")}
                                    onChange={(e) =>
                                        handleTextChange("aboutTitleSuffix", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Main Text
                            </label>
                            <textarea
                                value={getFieldValue("aboutMainText")}
                                onChange={(e) =>
                                    handleTextChange("aboutMainText", e.target.value)
                                }
                                rows={4}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Secondary Text
                            </label>
                            <textarea
                                value={getFieldValue("aboutSecondaryText")}
                                onChange={(e) =>
                                    handleTextChange("aboutSecondaryText", e.target.value)
                                }
                                rows={4}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Approach Title
                                </label>
                                <input
                                    type="text"
                                    value={getFieldValue("aboutApproachTitle")}
                                    onChange={(e) =>
                                        handleTextChange("aboutApproachTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div className="flex justify-between items-center mb-4 mt-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Approach Items
                                </h3>
                                <button
                                    onClick={addApproachItem}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Item
                                </button>
                            </div>
                            <div className="space-y-4">
                                {getFieldValue("aboutApproachItems").map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium text-brand-cream">
                                                Item {index + 1}
                                            </h4>
                                            <button
                                                onClick={() => removeApproachItem(index)}
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) =>
                                                        updateApproachItem(index, "title", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={item.description}
                                                    onChange={(e) =>
                                                        updateApproachItem(
                                                            index,
                                                            "description",
                                                            e.target.value,
                                                        )
                                                    }
                                                    rows={2}
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Impact Title
                                </label>
                                <input
                                    type="text"
                                    value={getFieldValue("aboutImpactTitle")}
                                    onChange={(e) =>
                                        handleTextChange("aboutImpactTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div className="flex justify-between items-center mb-4 mt-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Impact Metrics
                                </h3>
                                <button
                                    onClick={() => addStatItem("aboutImpactMetrics")}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Metric
                                </button>
                            </div>
                            <div className="space-y-4">
                                {getFieldValue("aboutImpactMetrics").map((metric, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium text-brand-cream">
                                                Metric {index + 1}
                                            </h4>
                                            <button
                                                onClick={() =>
                                                    removeStatItem("aboutImpactMetrics", index)
                                                }
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Metric
                                                </label>
                                                <input
                                                    type="text"
                                                    value={metric.metric}
                                                    onChange={(e) =>
                                                        updateStatItem(
                                                            "aboutImpactMetrics",
                                                            index,
                                                            "metric",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Label
                                                </label>
                                                <input
                                                    type="text"
                                                    value={metric.label}
                                                    onChange={(e) =>
                                                        updateStatItem(
                                                            "aboutImpactMetrics",
                                                            index,
                                                            "label",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case "experience":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Experience Badge
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("experienceBadge")}
                                onChange={(e) =>
                                    handleTextChange("experienceBadge", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Experience Title
                                </label>
                                <input
                                    type="text"
                                    value={getFieldValue("experienceTitle")}
                                    onChange={(e) =>
                                        handleTextChange("experienceTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Experience Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={getFieldValue("experienceSubtitle")}
                                    onChange={(e) =>
                                        handleTextChange("experienceSubtitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Bottom Stats
                                </h3>
                                <button
                                    onClick={() => addStatItem("experienceBottomStats")}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Stat
                                </button>
                            </div>
                            <div className="space-y-4">
                                {getFieldValue("experienceBottomStats").map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium text-brand-cream">
                                                Stat {index + 1}
                                            </h4>
                                            <button
                                                onClick={() =>
                                                    removeStatItem("experienceBottomStats", index)
                                                }
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Metric
                                                </label>
                                                <input
                                                    type="text"
                                                    value={stat.metric}
                                                    onChange={(e) =>
                                                        updateStatItem(
                                                            "experienceBottomStats",
                                                            index,
                                                            "metric",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Label
                                                </label>
                                                <input
                                                    type="text"
                                                    value={stat.label}
                                                    onChange={(e) =>
                                                        updateStatItem(
                                                            "experienceBottomStats",
                                                            index,
                                                            "label",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Experience Items
                                </h3>
                                <button
                                    onClick={addExperience}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Experience
                                </button>
                            </div>
                            <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                {getFieldValue("experiences").map((exp, index) => (
                                    <div
                                        key={index}
                                        className="bg-brand-cream/30 p-6 rounded-xl border border-brand-deep/10"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-medium text-brand-cream">
                                                Experience {index + 1}
                                            </h4>
                                            <button
                                                onClick={() => removeExperience(index)}
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Role
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.role}
                                                    onChange={(e) =>
                                                        updateExperience(index, "role", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Company
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.company}
                                                    onChange={(e) =>
                                                        updateExperience(index, "company", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Period
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.period}
                                                    onChange={(e) =>
                                                        updateExperience(index, "period", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    value={exp.location}
                                                    onChange={(e) =>
                                                        updateExperience(index, "location", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Icon Type Selection */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-brand-cream/80 mb-2">
                                                Icon Type
                                            </label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`expIconType-${index}`}
                                                        value="emoji"
                                                        checked={(exp.iconType || 'emoji') === 'emoji'}
                                                        onChange={(e) =>
                                                            updateExperience(index, "iconType", e.target.value as 'emoji' | 'upload')
                                                        }
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-brand-cream">Emoji</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`expIconType-${index}`}
                                                        value="upload"
                                                        checked={exp.iconType === 'upload'}
                                                        onChange={(e) =>
                                                            updateExperience(index, "iconType", e.target.value as 'emoji' | 'upload')
                                                        }
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-brand-cream">Upload Image</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Icon Input - Emoji Picker or File Upload */}
                                        {(exp.iconType || 'emoji') === 'emoji' ? (
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Icon (emoji)
                                                </label>
                                                <EmojiPicker
                                                    value={exp.icon || '💼'}
                                                    onChange={(emoji) =>
                                                        updateExperience(index, "icon", emoji)
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Upload Icon
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleExperienceIconUpload(e, index)}
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-gold file:text-brand-deep hover:file:bg-brand-gold/80"
                                                />
                                                {exp.icon && exp.iconType === 'upload' && (
                                                    <div className="mt-2">
                                                        <p className="text-xs text-brand-cream/70">Current icon: {exp.icon}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                Highlight
                                            </label>
                                            <textarea
                                                value={exp.highlight}
                                                onChange={(e) =>
                                                    updateExperience(index, "highlight", e.target.value)
                                                }
                                                rows={2}
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                Achievements (one per line)
                                            </label>
                                            <textarea
                                                value={exp.achievements.join("\n")}
                                                onChange={(e) =>
                                                    updateExperience(
                                                        index,
                                                        "achievements",
                                                        e.target.value
                                                            .split("\n")
                                                            .filter((line) => line.trim()),
                                                    )
                                                }
                                                rows={4}
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm resize-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case "skills":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Skills Badge
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("skillsBadge")}
                                onChange={(e) =>
                                    handleTextChange("skillsBadge", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Skills Title
                                </label>
                                <input
                                    type="text"
                                    value={getFieldValue("skillsTitle")}
                                    onChange={(e) =>
                                        handleTextChange("skillsTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Skills Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={getFieldValue("skillsSubtitle")}
                                    onChange={(e) =>
                                        handleTextChange("skillsSubtitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Skills Description
                            </label>
                            <textarea
                                value={getFieldValue("skillsDescription")}
                                onChange={(e) =>
                                    handleTextChange("skillsDescription", e.target.value)
                                }
                                rows={3}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>

                        {/* Skill Cards */}
                        <div className="border-t border-white/10 pt-6 mt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Skill Cards
                                </h3>
                                <button
                                    onClick={addSkillCard}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Skill Card
                                </button>
                            </div>
                            <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                {getFieldValue("skillCards").map((card, cardIndex) => (
                                    <div
                                        key={cardIndex}
                                        className="bg-brand-cream/30 p-6 rounded-xl border border-brand-deep/10"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-medium text-brand-cream">
                                                Card {cardIndex + 1}
                                            </h4>
                                            <button
                                                onClick={() => removeSkillCard(cardIndex)}
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove Card"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        
                                        {/* Title */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                Card Title
                                            </label>
                                            <input
                                                type="text"
                                                value={card.title}
                                                onChange={(e) =>
                                                    updateSkillCard(cardIndex, "title", e.target.value)
                                                }
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            />
                                        </div>

                                        {/* Icon Type Selection */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-brand-cream/80 mb-2">
                                                Icon Type
                                            </label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`iconType-${cardIndex}`}
                                                        value="emoji"
                                                        checked={card.iconType === 'emoji'}
                                                        onChange={(e) =>
                                                            updateSkillCard(cardIndex, "iconType", e.target.value as 'emoji' | 'upload')
                                                        }
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-brand-cream">Emoji</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`iconType-${cardIndex}`}
                                                        value="upload"
                                                        checked={card.iconType === 'upload'}
                                                        onChange={(e) =>
                                                            updateSkillCard(cardIndex, "iconType", e.target.value as 'emoji' | 'upload')
                                                        }
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-brand-cream">Upload Image</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Icon Input - Emoji Picker or File Upload */}
                                        {card.iconType === 'emoji' ? (
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Icon (emoji)
                                                </label>
                                                <EmojiPicker
                                                    value={card.icon}
                                                    onChange={(emoji) =>
                                                        updateSkillCard(cardIndex, "icon", emoji)
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Upload Icon
                                                </label>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleSkillCardIconUpload(e, cardIndex)}
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-brand-gold file:text-brand-deep hover:file:bg-brand-gold/80"
                                                />
                                                {card.icon && card.iconType === 'upload' && (
                                                    <div className="mt-2">
                                                        <p className="text-xs text-brand-cream/70">Current icon: {card.icon}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Width Selection */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-brand-cream/80 mb-2">
                                                Card Width
                                            </label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`width-${cardIndex}`}
                                                        value="half"
                                                        checked={card.width === 'half'}
                                                        onChange={(e) =>
                                                            updateSkillCard(cardIndex, "width", e.target.value as 'half' | 'full')
                                                        }
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-brand-cream">50% Width</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`width-${cardIndex}`}
                                                        value="full"
                                                        checked={card.width === 'full'}
                                                        onChange={(e) =>
                                                            updateSkillCard(cardIndex, "width", e.target.value as 'half' | 'full')
                                                        }
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm text-brand-cream">100% Width</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Items Management */}
                                        <div className="border-t border-brand-deep/10 pt-4 mt-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <h5 className="font-medium text-brand-cream text-sm">
                                                    Skills in this Card
                                                </h5>
                                                <button
                                                    onClick={() => addSkillCardItem(cardIndex)}
                                                    className="px-3 py-1 bg-brand-gold/80 text-brand-deep text-sm rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                                >
                                                    Add Item
                                                </button>
                                            </div>
                                            <div className="space-y-3">
                                                {(card.items || []).map((item, itemIndex) => (
                                                    <div
                                                        key={itemIndex}
                                                        className="bg-white/10 p-3 rounded-lg"
                                                    >
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-xs font-medium text-brand-cream/80">
                                                                Item {itemIndex + 1}
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    removeSkillCardItem(cardIndex, itemIndex)
                                                                }
                                                                className="text-red-500 hover:text-red-700 text-sm"
                                                                title="Remove Item"
                                                            >
                                                                🗑️
                                                            </button>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div>
                                                                <label className="block text-xs text-brand-cream/70 mb-1">
                                                                    Skill Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={item.title}
                                                                    onChange={(e) =>
                                                                        updateSkillCardItem(
                                                                            cardIndex,
                                                                            itemIndex,
                                                                            "title",
                                                                            e.target.value,
                                                                        )
                                                                    }
                                                                    className="w-full px-2 py-1 bg-white border border-brand-deep/20 rounded text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold"
                                                                />
                                                            </div>
                                                            
                                                            {/* Icon Type Selection for Item */}
                                                            <div>
                                                                <label className="block text-xs text-brand-cream/70 mb-1">
                                                                    Icon Type
                                                                </label>
                                                                <div className="flex gap-2">
                                                                    <label className="flex items-center gap-1 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name={`itemIconType-${cardIndex}-${itemIndex}`}
                                                                            value="emoji"
                                                                            checked={(item.iconType || 'emoji') === 'emoji'}
                                                                            onChange={(e) =>
                                                                                updateSkillCardItem(cardIndex, itemIndex, "iconType", e.target.value)
                                                                            }
                                                                            className="w-3 h-3"
                                                                        />
                                                                        <span className="text-xs text-brand-cream">Emoji</span>
                                                                    </label>
                                                                    <label className="flex items-center gap-1 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name={`itemIconType-${cardIndex}-${itemIndex}`}
                                                                            value="upload"
                                                                            checked={item.iconType === 'upload'}
                                                                            onChange={(e) =>
                                                                                updateSkillCardItem(cardIndex, itemIndex, "iconType", e.target.value)
                                                                            }
                                                                            className="w-3 h-3"
                                                                        />
                                                                        <span className="text-xs text-brand-cream">Upload</span>
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            {/* Icon Input - Emoji or Upload */}
                                                            {(item.iconType || 'emoji') === 'emoji' ? (
                                                                <div>
                                                                    <label className="block text-xs text-brand-cream/70 mb-1">
                                                                        Icon (emoji)
                                                                    </label>
                                                                    <EmojiPicker
                                                                        value={item.icon}
                                                                        onChange={(emoji) =>
                                                                            updateSkillCardItem(
                                                                                cardIndex,
                                                                                itemIndex,
                                                                                "icon",
                                                                                emoji,
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <label className="block text-xs text-brand-cream/70 mb-1">
                                                                        Upload Icon
                                                                    </label>
                                                                    <input
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => handleSkillCardItemIconUpload(e, cardIndex, itemIndex)}
                                                                        className="w-full px-2 py-1 bg-white border border-brand-deep/20 rounded text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-medium file:bg-brand-gold file:text-brand-deep hover:file:bg-brand-gold/80"
                                                                    />
                                                                    {item.icon && item.iconType === 'upload' && (
                                                                        <p className="text-xs text-brand-cream/70 mt-1">Current: {item.icon}</p>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Soft Skills Section */}
                        <div className="border-t border-white/10 pt-6">
                            <div className="mb-4">
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    💎 Soft Skills & Leadership Title
                                </label>
                                <input
                                    type="text"
                                    value={getFieldValue("skillsSoftSkillsTitle")}
                                    onChange={(e) =>
                                        handleTextChange("skillsSoftSkillsTitle", e.target.value)
                                    }
                                    placeholder="Leadership & Soft Skills"
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Soft Skills Items
                                </h3>
                                <button
                                    onClick={() => {
                                        const updated = [...getFieldValue("softSkills"), { skill: '', icon: '🤝' }];
                                        handleTextChange("softSkills", updated);
                                    }}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Soft Skill
                                </button>
                            </div>
                            <div className="space-y-4">
                                {getFieldValue("softSkills").map((softSkill, index) => (
                                    <div key={index} className="bg-brand-cream/30 p-4 rounded-xl">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium text-brand-deep">Soft Skill {index + 1}</h4>
                                            <button
                                                onClick={() => {
                                                    const updated = getFieldValue("softSkills").filter((_, i) => i !== index);
                                                    handleTextChange("softSkills", updated);
                                                }}
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-deep/80 mb-1">
                                                    Skill Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={softSkill.skill}
                                                    onChange={(e) => {
                                                        const updated = [...getFieldValue("softSkills")];
                                                        updated[index].skill = e.target.value;
                                                        handleTextChange("softSkills", updated);
                                                    }}
                                                    placeholder="e.g., Executive Stakeholder Management, Leadership"
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-deep/80 mb-1">
                                                    Icon (emoji)
                                                </label>
                                                <EmojiPicker
                                                    value={softSkill.icon}
                                                    onChange={(emoji) => {
                                                        const updated = [...getFieldValue("softSkills")];
                                                        updated[index].icon = emoji;
                                                        handleTextChange("softSkills", updated);
                                                    }}
                                                    placeholder="🤝"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Certifications Title
                                </label>
                                <input
                                    type="text"
                                    value={getFieldValue("skillsCertificationsTitle")}
                                    onChange={(e) =>
                                        handleTextChange(
                                            "skillsCertificationsTitle",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Tools Title
                                </label>
                                <input
                                    type="text"
                                    value={textContent.skillsToolsTitle}
                                    onChange={(e) =>
                                        handleTextChange("skillsToolsTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Certifications (one per line)
                                </label>
                                <textarea
                                    value={getFieldValue("certifications").join("\n")}
                                    onChange={(e) =>
                                        handleTextChange(
                                            "certifications",
                                            e.target.value.split("\n").filter((line) => line.trim()),
                                        )
                                    }
                                    rows={6}
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Tools (one per line)
                                </label>
                                <textarea
                                    value={getFieldValue("tools").join("\n")}
                                    onChange={(e) =>
                                        handleTextChange(
                                            "tools",
                                            e.target.value.split("\n").filter((line) => line.trim()),
                                        )
                                    }
                                    rows={6}
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                                />
                            </div>
                        </div>
                    </div>
                );
            case "projects":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Projects Title
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("projectsTitle")}
                                onChange={(e) =>
                                    handleTextChange("projectsTitle", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div className="border-t border-white/10 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-serif text-lg text-brand-cream">
                                    Project Items
                                </h3>
                                <button
                                    onClick={addProject}
                                    className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                >
                                    Add Project
                                </button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {getFieldValue("projects").map((project, index) => (
                                    <div
                                        key={index}
                                        className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium text-brand-cream">
                                                Project {index + 1}
                                            </h4>
                                            <button
                                                onClick={() => removeProject(index)}
                                                className="text-red-500 hover:text-red-700 text-lg"
                                                title="Remove"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={project.title}
                                                    onChange={(e) =>
                                                        updateProject(index, "title", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Subtitle
                                                </label>
                                                <textarea
                                                    value={project.subtitle}
                                                    onChange={(e) =>
                                                        updateProject(index, "subtitle", e.target.value)
                                                    }
                                                    rows={2}
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm resize-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Project Image
                                                </label>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const formData = new FormData();
                                                                formData.append('file', file);
                                                                try {
                                                                    const response = await fetch('/api/upload', {
                                                                        method: 'POST',
                                                                        body: formData,
                                                                    });
                                                                    const data = await response.json();
                                                                    if (response.ok) {
                                                                        updateProject(index, "image", data.path);
                                                                    } else {
                                                                        console.error('Upload failed:', data.message);
                                                                    }
                                                                } catch (error) {
                                                                    console.error('Error uploading file:', error);
                                                                }
                                                            }
                                                        }}
                                                        className="hidden"
                                                        id={`project-image-upload-${index}`}
                                                    />
                                                    <label
                                                        htmlFor={`project-image-upload-${index}`}
                                                        className="cursor-pointer bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-cream px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-brand-gold/30"
                                                    >
                                                        Upload Image
                                                    </label>
                                                    {project.image && (
                                                        <div className="flex items-center gap-2">
                                                            <img
                                                                src={project.image}
                                                                alt="Project preview"
                                                                className="w-12 h-12 object-cover rounded-lg border border-brand-gold/30"
                                                            />
                                                            <button
                                                                onClick={() => updateProject(index, "image", "")}
                                                                className="text-red-500 hover:text-red-700 text-sm"
                                                                title="Remove image"
                                                            >
                                                                ✕
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                {!project.image && (
                                                    <p className="text-xs text-brand-cream/50 mt-1">
                                                        Or enter a URL:
                                                    </p>
                                                )}
                                                <input
                                                    type="text"
                                                    value={project.image || ''}
                                                    onChange={(e) =>
                                                        updateProject(index, "image", e.target.value)
                                                    }
                                                    placeholder="/uploads/project-image.jpg or https://..."
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm mt-2"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Link (optional)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={project.link || ''}
                                                    onChange={(e) =>
                                                        updateProject(index, "link", e.target.value)
                                                    }
                                                    placeholder="https://example.com"
                                                    className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                                    Tags (optional)
                                                </label>
                                                <div className="space-y-2">
                                                    {project.tags && project.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {project.tags.map((tag, tagIndex) => (
                                                                <span
                                                                    key={tagIndex}
                                                                    className="inline-flex items-center gap-1 px-3 py-1 bg-brand-gold/20 text-brand-gold text-xs font-medium rounded-full border border-brand-gold/30"
                                                                >
                                                                    {tag}
                                                                    <button
                                                                        onClick={() => removeProjectTag(index, tagIndex)}
                                                                        className="hover:text-red-500 transition-colors"
                                                                        title="Remove tag"
                                                                    >
                                                                        ×
                                                                    </button>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Add a tag..."
                                                            className="flex-1 px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    const input = e.target as HTMLInputElement;
                                                                    if (input.value.trim()) {
                                                                        addProjectTag(index, input.value);
                                                                        input.value = '';
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                        <button
                                                            onClick={(e) => {
                                                                const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                                                                if (input.value.trim()) {
                                                                    addProjectTag(index, input.value);
                                                                    input.value = '';
                                                                }
                                                            }}
                                                            className="px-4 py-2 bg-brand-gold/20 text-brand-gold rounded-lg hover:bg-brand-gold/30 transition-colors text-sm font-medium"
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case "contact":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Contact Badge
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("contactBadge")}
                                onChange={(e) =>
                                    handleTextChange("contactBadge", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Contact Title
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("contactTitle")}
                                onChange={(e) =>
                                    handleTextChange("contactTitle", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Contact Subtitle
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("contactSubtitle")}
                                onChange={(e) =>
                                    handleTextChange("contactSubtitle", e.target.value)
                                }
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Contact Description
                            </label>
                            <textarea
                                value={getFieldValue("contactDescription")}
                                onChange={(e) =>
                                    handleTextChange("contactDescription", e.target.value)
                                }
                                rows={4}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                                Contact Form
                            </h3>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Form Title
                                </label>
                                <input
                                    type="text"
                                    value={getFieldValue("contactFormTitle")}
                                    onChange={(e) =>
                                        handleTextChange("contactFormTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div className="mt-4 bg-brand-cream/30 p-4 rounded-xl">
                                <h4 className="font-medium text-brand-cream mb-3">
                                    Form Labels
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Name Label
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormLabels.name}
                                            onChange={(e) =>
                                                updateContactFormLabels("name", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Email Label
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormLabels.email}
                                            onChange={(e) =>
                                                updateContactFormLabels("email", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Company Label
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormLabels.company}
                                            onChange={(e) =>
                                                updateContactFormLabels("company", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Message Label
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormLabels.message}
                                            onChange={(e) =>
                                                updateContactFormLabels("message", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 bg-brand-cream/30 p-4 rounded-xl">
                                <h4 className="font-medium text-brand-cream mb-3">
                                    Form Placeholders
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Name Placeholder
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormPlaceholders.name}
                                            onChange={(e) =>
                                                updateContactFormPlaceholders("name", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Email Placeholder
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormPlaceholders.email}
                                            onChange={(e) =>
                                                updateContactFormPlaceholders("email", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Company Placeholder
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormPlaceholders.company}
                                            onChange={(e) =>
                                                updateContactFormPlaceholders("company", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-brand-cream/80 mb-1">
                                            Message Placeholder
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.contactFormPlaceholders.message}
                                            onChange={(e) =>
                                                updateContactFormPlaceholders("message", e.target.value)
                                            }
                                            className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Submit Button Text
                                    </label>
                                    <input
                                        type="text"
                                        value={getFieldValue("contactSubmitButton")}
                                        onChange={(e) =>
                                            handleTextChange("contactSubmitButton", e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Success Message
                                    </label>
                                    <input
                                        type="text"
                                        value={getFieldValue("contactSuccessMessage")}
                                        onChange={(e) =>
                                            handleTextChange("contactSuccessMessage", e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Error Message
                                    </label>
                                    <input
                                        type="text"
                                        value={getFieldValue("contactErrorMessage")}
                                        onChange={(e) =>
                                            handleTextChange("contactErrorMessage", e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                                Contact Information
                            </h3>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Info Title
                                </label>
                                <input
                                    type="text"
                                    value={getFieldValue("contactInfoTitle")}
                                    onChange={(e) =>
                                        handleTextChange("contactInfoTitle", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4 mt-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        value={getFieldValue("contactEmail")}
                                        onChange={(e) =>
                                            handleTextChange("contactEmail", e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        LinkedIn
                                    </label>
                                    <input
                                        type="text"
                                        value={getFieldValue("contactLinkedin")}
                                        onChange={(e) =>
                                            handleTextChange("contactLinkedin", e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        value={getFieldValue("contactPhone")}
                                        onChange={(e) =>
                                            handleTextChange("contactPhone", e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Download Resume Text
                                </label>
                                <input
                                    type="text"
                                    value={getFieldValue("contactDownloadText")}
                                    onChange={(e) =>
                                        handleTextChange("contactDownloadText", e.target.value)
                                    }
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    CV/Portfolio File
                                </label>
                                <div className="space-y-3">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleCvUpload}
                                        disabled={uploadingCv}
                                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-deep hover:file:bg-brand-cream"
                                    />
                                    {cvUploadStatus && (
                                        <p className={`text-sm ${cvUploadStatus.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                                            {cvUploadStatus}
                                        </p>
                                    )}
                                    <p className="text-xs text-brand-cream/60">
                                        Current CV: {textContent.contactCvPath || '/cv.pdf'}
                                    </p>
                                    <p className="text-xs text-brand-cream/60">
                                        Upload a PDF file (max 10MB). The file will be saved as cv.pdf.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                                Availability
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Availability Title
                                    </label>
                                    <input
                                        type="text"
                                        value={getFieldValue("contactAvailabilityTitle")}
                                        onChange={(e) =>
                                            handleTextChange(
                                                "contactAvailabilityTitle",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                        Availability Status
                                    </label>
                                    <input
                                        type="text"
                                        value={getFieldValue("contactAvailabilityStatus")}
                                        onChange={(e) =>
                                            handleTextChange(
                                                "contactAvailabilityStatus",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Availability Description
                                </label>
                                <textarea
                                    value={getFieldValue("contactAvailabilityDescription")}
                                    onChange={(e) =>
                                        handleTextChange(
                                            "contactAvailabilityDescription",
                                            e.target.value,
                                        )
                                    }
                                    rows={3}
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                    Availability Items (one per line)
                                </label>
                                <textarea
                                    value={textContent.contactAvailabilityItems.join("\n")}
                                    onChange={(e) =>
                                        handleTextChange(
                                            "contactAvailabilityItems",
                                            e.target.value.split("\n").filter((line) => line.trim()),
                                        )
                                    }
                                    rows={4}
                                    className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="font-serif text-lg text-brand-cream/90 mb-4">
                                Bottom Info
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-brand-cream/30 p-4 rounded-xl">
                                    <h4 className="font-medium text-brand-cream mb-3">
                                        Response Time
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm text-brand-cream/80 mb-1">
                                                Label
                                            </label>
                                            <input
                                                type="text"
                                                value={textContent.contactBottomInfo.responseTime.label}
                                                onChange={(e) =>
                                                    updateContactBottomInfo(
                                                        "responseTime",
                                                        "label",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-brand-cream/80 mb-1">
                                                Value
                                            </label>
                                            <input
                                                type="text"
                                                value={textContent.contactBottomInfo.responseTime.value}
                                                onChange={(e) =>
                                                    updateContactBottomInfo(
                                                        "responseTime",
                                                        "value",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-brand-cream/30 p-4 rounded-xl">
                                    <h4 className="font-medium text-brand-cream mb-3">
                                        Location
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm text-brand-cream/80 mb-1">
                                                Label
                                            </label>
                                            <input
                                                type="text"
                                                value={textContent.contactBottomInfo.location.label}
                                                onChange={(e) =>
                                                    updateContactBottomInfo(
                                                        "location",
                                                        "label",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-brand-cream/80 mb-1">
                                                Value
                                            </label>
                                            <input
                                                type="text"
                                                value={textContent.contactBottomInfo.location.value}
                                                onChange={(e) =>
                                                    updateContactBottomInfo(
                                                        "location",
                                                        "value",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-brand-cream/30 p-4 rounded-xl">
                                    <h4 className="font-medium text-brand-cream mb-3">
                                        Languages
                                    </h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm text-brand-cream/80 mb-1">
                                                Label
                                            </label>
                                            <input
                                                type="text"
                                                value={textContent.contactBottomInfo.languages.label}
                                                onChange={(e) =>
                                                    updateContactBottomInfo(
                                                        "languages",
                                                        "label",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-brand-cream/80 mb-1">
                                                Value
                                            </label>
                                            <input
                                                type="text"
                                                value={textContent.contactBottomInfo.languages.value}
                                                onChange={(e) =>
                                                    updateContactBottomInfo(
                                                        "languages",
                                                        "value",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full px-3 py-2 bg-white border border-brand-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "loading":
                return (
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                First Name <span className="text-brand-gold">*</span>
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("loadingScreenFirstName")}
                                onChange={(e) => handleTextChange("loadingScreenFirstName", e.target.value)}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                placeholder="LUZ"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Last Name <span className="text-brand-gold">*</span>
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("loadingScreenLastName")}
                                onChange={(e) => handleTextChange("loadingScreenLastName", e.target.value)}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                placeholder="QUINTANAR"
                            />
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-brand-cream/90 mb-1.5 sm:mb-2">
                                Tagline
                            </label>
                            <input
                                type="text"
                                value={getFieldValue("loadingScreenTagline")}
                                onChange={(e) => handleTextChange("loadingScreenTagline", e.target.value)}
                                className="w-full px-3 py-3 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm md:text-base bg-white/10 backdrop-blur-sm border border-white/30 text-brand-cream placeholder:text-brand-cream/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                                placeholder="Product Owner • Luxury Retail"
                            />
                            <p className="text-xs text-brand-cream/60 mt-2">
                                This appears below your name in the loading screen
                            </p>
                        </div>
                    </div>
                );
            case "theme":
                return (
                    <div className="space-y-8">
                        {/* Font Settings */}
                        <div className="bg-gradient-to-br from-brand-gold/10 to-brand-cream/5 p-4 sm:p-5 md:p-6 rounded-2xl border border-brand-gold/30">
                            <h3 className="text-xl font-medium mb-6 text-brand-cream">Typography Settings</h3>
                            
                            {/* Primary Font */}
                            <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                                <h4 className="font-medium text-brand-gold">Primary Font (Headings)</h4>
                                <div>
                                    <label className="block text-sm text-brand-cream/70 mb-2">
                                        Font Name
                                    </label>
                                    <input
                                        type="text"
                                        value={textContent.themeFont.primary}
                                        onChange={(e) => updateThemeFont('primary', e.target.value)}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/30 text-brand-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
                                        placeholder="e.g., Playfair Display"
                                    />
                                    <p className="text-xs text-brand-cream/60 mt-1">
                                        Enter the exact Google Font name
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm text-brand-cream/70 mb-2">
                                        Google Fonts URL
                                    </label>
                                    <input
                                        type="text"
                                        value={textContent.themeFont.primaryUrl}
                                        onChange={(e) => updateThemeFont('primaryUrl', e.target.value)}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/30 text-brand-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold font-mono text-xs"
                                        placeholder="https://fonts.googleapis.com/css2?family=..."
                                    />
                                    <p className="text-xs text-brand-cream/60 mt-1">
                                        Get this from <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">Google Fonts</a>
                                    </p>
                                </div>
                            </div>

                            {/* Secondary Font */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-brand-gold">Secondary Font (Body Text)</h4>
                                <div>
                                    <label className="block text-sm text-brand-cream/70 mb-2">
                                        Font Name
                                    </label>
                                    <input
                                        type="text"
                                        value={textContent.themeFont.secondary}
                                        onChange={(e) => updateThemeFont('secondary', e.target.value)}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/30 text-brand-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
                                        placeholder="e.g., Inter"
                                    />
                                    <p className="text-xs text-brand-cream/60 mt-1">
                                        Enter the exact Google Font name
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm text-brand-cream/70 mb-2">
                                        Google Fonts URL
                                    </label>
                                    <input
                                        type="text"
                                        value={textContent.themeFont.secondaryUrl}
                                        onChange={(e) => updateThemeFont('secondaryUrl', e.target.value)}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/30 text-brand-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold font-mono text-xs"
                                        placeholder="https://fonts.googleapis.com/css2?family=..."
                                    />
                                    <p className="text-xs text-brand-cream/60 mt-1">
                                        Get this from <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">Google Fonts</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Color Settings */}
                        <div className="bg-gradient-to-br from-brand-gold/10 to-brand-cream/5 p-4 sm:p-5 md:p-6 rounded-2xl border border-brand-gold/30">
                            <h3 className="text-xl font-medium mb-6 text-brand-cream">Color Palette</h3>
                            
                            <div className="space-y-6">
                                {/* Brand Deep */}
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        <input
                                            type="color"
                                            value={textContent.themeColors.brandDeep}
                                            onChange={(e) => updateThemeColor('brandDeep', e.target.value)}
                                            className="w-16 h-16 rounded-lg cursor-pointer border-2 border-brand-gold/40"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                            Primary Dark (Background)
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.themeColors.brandDeep}
                                            onChange={(e) => updateThemeColor('brandDeep', e.target.value)}
                                            className="w-full px-3 py-2 bg-white/10 border border-white/30 text-brand-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold font-mono text-sm"
                                            placeholder="#1a1a1a"
                                        />
                                    </div>
                                </div>

                                {/* Brand Cream */}
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        <input
                                            type="color"
                                            value={textContent.themeColors.brandCream}
                                            onChange={(e) => updateThemeColor('brandCream', e.target.value)}
                                            className="w-16 h-16 rounded-lg cursor-pointer border-2 border-brand-gold/40"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                            Light Background (Cream)
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.themeColors.brandCream}
                                            onChange={(e) => updateThemeColor('brandCream', e.target.value)}
                                            className="w-full px-3 py-2 bg-white/10 border border-white/30 text-brand-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold font-mono text-sm"
                                            placeholder="#f5f1e8"
                                        />
                                    </div>
                                </div>

                                {/* Brand Gold */}
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        <input
                                            type="color"
                                            value={textContent.themeColors.brandGold}
                                            onChange={(e) => updateThemeColor('brandGold', e.target.value)}
                                            className="w-16 h-16 rounded-lg cursor-pointer border-2 border-brand-gold/40"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-brand-cream/80 mb-1">
                                            Accent Color (Gold)
                                        </label>
                                        <input
                                            type="text"
                                            value={textContent.themeColors.brandGold}
                                            onChange={(e) => updateThemeColor('brandGold', e.target.value)}
                                            className="w-full px-3 py-2 bg-white/10 border border-white/30 text-brand-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold font-mono text-sm"
                                            placeholder="#c7a17a"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-brand-gold/10 rounded-lg border border-brand-gold/20">
                                <p className="text-sm text-brand-cream/70">
                                    <strong className="text-brand-cream">💡 Tip:</strong> Changes will apply across your entire portfolio. 
                                    Make sure to save and preview your changes before sharing your site.
                                </p>
                            </div>
                        </div>
                    </div>
                );
            case "languages":
                return (
                    <div className="space-y-8">
                        {/* Current Languages */}
                        <div className="bg-gradient-to-br from-brand-gold/10 to-brand-cream/5 p-4 sm:p-5 md:p-6 rounded-2xl border border-brand-gold/30">
                            <h3 className="text-xl font-medium mb-6 text-brand-cream">Enabled Languages</h3>
                            
                            <div className="space-y-3">
                                {textContent.enabledLanguages.map((langCode) => {
                                    const lang = availableLanguages[langCode];
                                    if (!lang) return null;
                                    return (
                                        <div key={langCode} className="flex items-center justify-between p-4 bg-white/5 border border-white/30 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl">{lang.flag}</span>
                                                <div>
                                                    <p className="font-medium text-brand-cream">{lang.name}</p>
                                                    <p className="text-sm text-brand-cream/60">{lang.code}</p>
                                                </div>
                                                {langCode === textContent.defaultLanguage && (
                                                    <span className="ml-2 px-2 py-1 bg-brand-gold/20 text-brand-cream text-xs rounded-full border border-brand-gold/40">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {langCode !== textContent.defaultLanguage && (
                                                    <button
                                                        onClick={() => setDefaultLanguageHandler(langCode)}
                                                        className="px-3 py-1 text-sm text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-colors"
                                                    >
                                                        Set as Default
                                                    </button>
                                                )}
                                                {langCode !== textContent.defaultLanguage && (
                                                    <button
                                                        onClick={() => removeLanguage(langCode)}
                                                        className="px-3 py-1 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Add New Language */}
                        <div className="bg-gradient-to-br from-brand-gold/10 to-brand-cream/5 p-4 sm:p-5 md:p-6 rounded-2xl border border-brand-gold/30">
                            <h3 className="text-xl font-medium mb-6 text-brand-cream">Add New Language</h3>
                            
                            {isTranslating ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <svg className="animate-spin h-12 w-12 text-brand-gold mb-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <p className="text-lg font-medium text-brand-cream mb-2">Translating content...</p>
                                    <p className="text-sm text-brand-cream/60">This may take a few minutes</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {Object.entries(availableLanguages).map(([code, lang]) => {
                                        const isEnabled = textContent.enabledLanguages.includes(code);
                                        return (
                                            <button
                                                key={code}
                                                onClick={() => !isEnabled && addLanguage(code)}
                                                disabled={isEnabled}
                                                className={`p-4 rounded-lg border-2 transition-all ${
                                                    isEnabled
                                                        ? 'bg-white/5 border-white/20 opacity-50 cursor-not-allowed'
                                                        : 'bg-white/5 border-white/30 hover:border-brand-gold hover:bg-brand-gold/5 cursor-pointer'
                                                }`}
                                            >
                                                <div className="flex flex-col items-center gap-2">
                                                    <span className="text-4xl">{lang.flag}</span>
                                                    <span className="font-medium text-brand-cream">{lang.name}</span>
                                                    <span className="text-xs text-brand-cream/60">{code}</span>
                                                    {isEnabled && (
                                                        <span className="text-xs text-green-400 font-medium">✓ Enabled</span>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            <div className="mt-6 p-4 bg-brand-gold/10 rounded-lg border border-brand-gold/20">
                                <p className="text-sm text-brand-cream/70">
                                    <strong className="text-brand-cream">ℹ️ How it works:</strong> When you add a new language, all your content will be automatically translated using LibreTranslate. 
                                    You can then edit the translations in the backoffice by switching to that language using the language switcher at the top of the page.
                                </p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-deep flex items-center justify-center">
                <div className="text-brand-cream">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect to login
    }

    return (
        <div className="min-h-screen bg-brand-deep">
            {/* Save Status - Fixed at top */}
            {saveStatus !== "idle" && (
                <div className="fixed top-4 right-4 z-50 animate-fade-in">
                    {saveStatus === "saving" && (
                        <div className="flex items-center px-6 py-3 bg-blue-100 text-blue-700 rounded-lg shadow-lg">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Saving...
                        </div>
                    )}
                    {saveStatus === "saved" && (
                        <div className="flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-lg shadow-lg">
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Saved successfully!
                        </div>
                    )}
                    {saveStatus === "error" && (
                        <div className="flex flex-col px-6 py-3 bg-red-100 text-red-700 rounded-lg shadow-lg max-w-md">
                            <div className="flex items-center">
                                <svg
                                    className="w-5 h-5 mr-3 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="font-medium">Error saving changes</span>
                            </div>
                            {errorMessage && (
                                <p className="mt-1 ml-8 text-sm">{errorMessage}</p>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="w-full px-2 sm:px-4 md:px-6 py-2 md:py-4 pb-24 md:pb-4">
                <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                    {/* Enhanced Sidebar - Desktop Only */}
                    <div className="hidden md:block w-64 flex-shrink-0">
                        <div className="sticky top-4 bg-gradient-to-br from-brand-deep to-brand-deep/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-brand-gold/20 p-4">
                            {/* Header */}
                            <div className="mb-6 pb-4 border-b border-brand-gold/20">
                                <h2 className="text-brand-gold font-serif text-xl mb-1">Content Editor</h2>
                                <p className="text-brand-cream/60 text-xs">Manage your portfolio</p>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-2 mb-6">
                                {[
                                    { id: "hero", label: "Hero Section", icon: "🏠", desc: "Main banner" },
                                    { id: "about", label: "About", icon: "👤", desc: "Your story" },
                                    { id: "skills", label: "Skills", icon: "⚡", desc: "Expertise" },
                                    { id: "projects", label: "Projects", icon: "📁", desc: "Portfolio" },
                                    { id: "experience", label: "Experience", icon: "💼", desc: "Career path" },
                                    { id: "contact", label: "Contact", icon: "📧", desc: "Get in touch" },
                                    { id: "theme", label: "Theme", icon: "🎨", desc: "Fonts & Colors" },
                                    { id: "languages", label: "Languages", icon: "🌍", desc: "Translations" },
                                    { id: "loading", label: "Loading Screen", icon: "✨", desc: "Opening animation" },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full p-3 rounded-xl transition-all duration-300 flex items-start gap-3 group backdrop-blur-sm border ${activeTab === tab.id
                                            ? "bg-brand-gold/90 shadow-lg scale-[1.02] border-brand-gold"
                                            : "bg-brand-gold/10 border-brand-gold/20 hover:bg-brand-gold/20 hover:border-brand-gold/40"
                                            }`}
                                        title={tab.label}
                                    >
                                        <span className="text-2xl flex-shrink-0">{tab.icon}</span>
                                        <div className="flex-1 text-left">
                                            <div className={`font-medium text-sm ${activeTab === tab.id ? 'text-brand-deep' : 'text-brand-cream'}`}>
                                                {tab.label}
                                            </div>
                                            <div className={`text-xs ${activeTab === tab.id ? 'text-brand-deep/70' : 'text-brand-cream/50'}`}>
                                                {tab.desc}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </nav>

                            {/* Actions */}
                            <div className="pt-4 border-t border-brand-gold/20 space-y-2">
                                {/* QR Code Button */}
                                <button
                                    onClick={() => setShowQRCode(true)}
                                    className="w-full p-3 bg-brand-gold/20 backdrop-blur-sm text-brand-cream rounded-xl hover:bg-brand-gold hover:text-brand-deep transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.3)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.5)] hover:-translate-y-0.5 flex items-center gap-3 group border border-brand-gold/30 hover:border-brand-gold"
                                >
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-sm">QR Code</div>
                                        <div className="text-xs text-brand-cream/50 group-hover:text-brand-deep/70">Share your site</div>
                                    </div>
                                </button>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="w-full p-3 bg-red-500/20 backdrop-blur-sm text-brand-cream rounded-xl hover:bg-red-500 hover:text-white transition-all duration-500 shadow-[0_4px_14px_0_rgba(239,68,68,0.3)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.5)] hover:-translate-y-0.5 flex items-center gap-3 group border border-red-500/30 hover:border-red-500"
                                >
                                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <div className="flex-1 text-left">
                                        <div className="font-medium text-sm">Logout</div>
                                        <div className="text-xs text-brand-cream/50 group-hover:text-white/70">Exit dashboard</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Split View: Editor + Preview */}
                    <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-4">
                        {/* Mobile Toggle Buttons */}
                        <div className="md:hidden flex gap-2 mb-2">
                            <button
                                onClick={() => setShowPreview(false)}
                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${!showPreview
                                    ? 'bg-brand-gold text-brand-deep shadow-lg'
                                    : 'bg-white/10 text-brand-cream border border-white/20'
                                    }`}
                            >
                                ✏️ Edit
                            </button>
                            <button
                                onClick={() => setShowPreview(true)}
                                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${showPreview
                                    ? 'bg-brand-gold text-brand-deep shadow-lg'
                                    : 'bg-white/10 text-brand-cream border border-white/20'
                                    }`}
                            >
                                👁️ Preview
                            </button>
                        </div>

                        {/* Editor Panel */}
                        <div className={`${showPreview ? 'hidden md:block' : 'block'} w-full md:w-[45%] flex-shrink-0`}>
                            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-3 sm:p-4 md:p-6 md:sticky md:top-4 max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-custom pb-32 md:pb-6">
                                <div className="flex items-center justify-between mb-4 md:mb-6 gap-3 flex-wrap">
                                    <div className="flex items-center gap-3">
                                        <h2 className="font-serif text-lg md:text-xl text-brand-cream capitalize">
                                            Edit {activeTab}
                                        </h2>
                                        {/* Language Selector */}
                                        {!["theme", "languages", "loading"].includes(activeTab) && textContent.enabledLanguages.length > 1 && (
                                            <div className="relative">
                                                <select
                                                    value={currentLanguage}
                                                    onChange={(e) => setCurrentLanguage(e.target.value)}
                                                    className="pl-8 pr-3 py-1.5 bg-brand-gold/20 text-brand-cream border border-brand-gold/40 rounded-lg text-sm font-medium appearance-none cursor-pointer hover:bg-brand-gold/30 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold"
                                                >
                                                    {textContent.enabledLanguages.map((langCode) => {
                                                        const lang = availableLanguages[langCode];
                                                        if (!lang) return null;
                                                        return (
                                                            <option key={langCode} value={langCode}>
                                                                {lang.flag} {lang.name} {langCode === textContent.defaultLanguage ? '(default)' : ''}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm pointer-events-none">🌍</span>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleSave}
                                        disabled={saveStatus === "saving"}
                                        className="hidden md:block px-4 py-2 bg-brand-gold text-brand-deep rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 font-medium text-sm relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                    >
                                        {saveStatus === "saving" ? "Saving..." : "Save"}
                                    </button>
                                </div>

                                {renderTabContent()}
                            </div>
                        </div>

                        {/* Live Preview Panel */}
                        <div className={`${!showPreview ? 'hidden md:block' : 'block'} flex-1`}>
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-3 sm:p-4 md:p-6 md:sticky md:top-4 max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-custom pb-32 md:pb-6">
                                <div className="mb-4">
                                    <h3 className="font-serif text-lg text-brand-cream">Live Preview</h3>
                                </div>
                                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                                    {/* Header Preview - Only shown for Hero section */}
                                    {activeTab === "hero" && (
                                        <div className="sticky top-0 z-50 backdrop-blur-3xl border-b border-white/20 bg-white/80" style={{ backdropFilter: 'blur(20px) saturate(180%)', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}>
                                            <div className="px-6 py-6 md:py-8 flex justify-between items-center">
                                                <div
                                                    className={`text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold transition-colors duration-500 tracking-wider sm:tracking-wider md:tracking-widest ${textContent.headerFont === 'cormorant' ? 'font-[family-name:var(--font-cormorant)]' :
                                                        textContent.headerFont === 'bodoni' ? 'font-[family-name:var(--font-bodoni)]' :
                                                            'font-serif'
                                                        } text-brand-deep`}
                                                >
                                                    LUZ QUINTANAR
                                                </div>
                                                <div className="hidden md:flex items-center gap-2">
                                                    {['about', 'experience', 'skills', 'contact'].map((item) => (
                                                        <div key={item} className="px-3 py-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-deep"></div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Mobile Menu Button */}
                                                <button className="md:hidden p-2 rounded-lg text-brand-deep">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Preview content will be rendered here based on activeTab */}
                                    <div className="transform scale-90 origin-top-left w-[111%]">
                                        {activeTab === "hero" && (
                                            <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-cream via-brand-cream to-brand-gold/10 pt-20 pb-16">
                                                {/* Background decorative elements */}
                                                <div className="absolute inset-0">
                                                    <div className="absolute top-20 right-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl"></div>
                                                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-deep/5 rounded-full blur-3xl"></div>
                                                </div>

                                                <div className="container mx-auto px-6 relative z-10">
                                                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                                                        {/* Left column - Content */}
                                                        <div>
                                                            {/* Badge */}
                                                            <div className="inline-flex items-center px-4 py-2 bg-brand-deep/10 rounded-full text-brand-deep font-medium text-sm mb-6 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
                                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                                                                <span className="w-2 h-2 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
                                                                {textContent.heroBadge || 'Product Owner • Luxury Retail Expert'}
                                                            </div>

                                                            {/* Main headline */}
                                                            <h1 className="font-serif text-4xl lg:text-5xl leading-tight text-brand-deep mb-4">
                                                                {textContent.heroTitle}
                                                                <span className="block text-brand-gold italic mt-2">{textContent.heroSubtitle}</span>
                                                            </h1>

                                                            {/* Subtitle */}
                                                            <p className="text-base lg:text-lg text-brand-deep/80 mb-8 leading-relaxed max-w-full">
                                                                {textContent.heroDescription}
                                                            </p>

                                                            {/* Stats */}
                                                            <div className="grid grid-cols-3 gap-6 lg:gap-8 mb-12">
                                                                {(textContent.heroStats && textContent.heroStats.length > 0 ? textContent.heroStats : [
                                                                    { metric: '10+', label: 'Years Experience' },
                                                                    { metric: '€50M+', label: 'Revenue Impact' },
                                                                    { metric: '25+', label: 'Products Launched' }
                                                                ]).map((stat, index) => (
                                                                    <div key={index} className="text-center">
                                                                        <div className="text-3xl lg:text-4xl font-bold text-brand-gold mb-2">{stat.metric}</div>
                                                                        <div className="text-xs sm:text-sm text-brand-deep uppercase tracking-wider font-medium">{stat.label}</div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* CTA Button */}
                                                            <div className="flex justify-start">
                                                                <button className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-brand-deep text-brand-cream font-medium rounded-full transition-all duration-500 shadow-[0_4px_14px_0_rgba(11,19,43,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.5)] hover:-translate-y-0.5 text-sm sm:text-base relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-gold/0 before:via-brand-gold/90 before:to-brand-gold/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700">
                                                                    <span className="relative z-10 transition-colors duration-500 group-hover:text-brand-gold">{textContent.heroCtaText || "Let's Craft Excellence Together"}</span>
                                                                    <svg className="ml-2 w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Right column - Image */}
                                                        <div className="relative flex justify-center lg:justify-start order-first lg:order-last mt-8 lg:mt-0">
                                                            <div className="relative w-full max-w-xs sm:max-w-sm">
                                                                {/* Decorative elements behind image */}
                                                                <div className="absolute -top-4 -right-4 w-full h-full bg-brand-gold/20 rounded-2xl transform rotate-3"></div>
                                                                <div className="absolute -bottom-4 -left-4 w-full h-full bg-brand-deep/10 rounded-2xl transform -rotate-2"></div>

                                                                {/* Main image */}
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img
                                                                    key={textContent.heroImage}
                                                                    src={textContent.heroImage || "/luz.jpg"}
                                                                    alt="Hero"
                                                                    className="relative z-10 w-full rounded-2xl shadow-2xl object-cover aspect-[3/4]"
                                                                    onError={(e) => {
                                                                        (e.target as HTMLImageElement).src = '/luz.jpg';
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Scroll indicator */}
                                                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:flex">
                                                    <div className="flex flex-col items-center text-brand-deep/60">
                                                        <span className="text-xs uppercase tracking-wide mb-2">{textContent.heroScrollText || 'Scroll'}</span>
                                                        <div className="w-6 h-10 border-2 border-brand-deep/20 rounded-full flex justify-center">
                                                            <div className="w-1 h-3 bg-brand-deep/40 rounded-full mt-2 animate-bounce"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "about" && (
                                            <div className="bg-brand-deep text-brand-cream p-8 min-h-[500px] relative overflow-hidden">
                                                {/* Background elements */}
                                                <div className="absolute inset-0">
                                                    <div className="absolute top-0 left-1/4 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl"></div>
                                                    <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-brand-cream/5 rounded-full blur-3xl"></div>
                                                </div>

                                                <div className="relative z-10">
                                                    {/* Section header */}
                                                    <div className="text-center mb-12">
                                                        <div className="inline-flex items-center px-3 py-1.5 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs mb-4 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
                                                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                                                            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
                                                            {textContent.aboutBadge || 'About Me'}
                                                        </div>
                                                        <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4">
                                                            {textContent.aboutTitle}
                                                            <span className="block text-brand-gold italic mt-1">{textContent.aboutTitleSuffix || 'reality'}</span>
                                                        </h2>
                                                        <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
                                                    </div>

                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
                                                        {/* Left column - Main content */}
                                                        <div className="space-y-6">
                                                            <div className="space-y-4">
                                                                <p className="text-sm md:text-base leading-relaxed text-brand-cream/90">{textContent.aboutMainText}</p>
                                                                <p className="text-xs md:text-sm leading-relaxed text-brand-cream/80">{textContent.aboutSecondaryText}</p>
                                                            </div>

                                                            {/* Key principles */}
                                                            <div className="space-y-4">
                                                                <h3 className="text-lg font-serif text-brand-gold mb-4">{textContent.aboutApproachTitle || 'My Approach'}</h3>
                                                                <div className="space-y-4">
                                                                    {(textContent.aboutApproachItems && textContent.aboutApproachItems.length > 0 ? textContent.aboutApproachItems : [
                                                                        { title: 'Customer-First Philosophy', description: 'Every decision starts with understanding the customer\'s deepest needs and desires' },
                                                                        { title: 'Data-Driven Innovation', description: 'Combining intuition with analytics to create breakthrough solutions' },
                                                                        { title: 'Cross-Functional Leadership', description: 'Building bridges between teams to deliver cohesive, impactful products' }
                                                                    ]).map((item, index) => (
                                                                        <div key={index} className="bg-brand-cream/5 rounded-xl p-4 border-l-4 border-brand-gold">
                                                                            <h4 className="font-semibold text-brand-cream mb-2 text-sm">{item.title}</h4>
                                                                            <p className="text-brand-cream/70 text-xs leading-relaxed">{item.description}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Right column - Stats & highlights */}
                                                        <div className="space-y-6">
                                                            {/* Impact metrics */}
                                                            <div className="bg-brand-cream/5 backdrop-blur-sm rounded-2xl p-6 border border-brand-gold/20">
                                                                <h3 className="text-lg font-serif text-brand-gold mb-4">{textContent.aboutImpactTitle || 'Impact at a Glance'}</h3>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    {(textContent.aboutImpactMetrics && textContent.aboutImpactMetrics.length > 0 ? textContent.aboutImpactMetrics : [
                                                                        { metric: '€50M+', label: 'Revenue Generated' },
                                                                        { metric: '40%', label: 'Avg Growth Rate' },
                                                                        { metric: '25+', label: 'Products Launched' },
                                                                        { metric: '15+', label: 'Teams Led' }
                                                                    ]).map((item, index) => (
                                                                        <div key={index} className="text-center bg-brand-gold/10 rounded-xl p-4">
                                                                            <div className="text-2xl font-bold text-brand-gold mb-2">{item.metric}</div>
                                                                            <div className="text-xs text-brand-cream uppercase tracking-wide">{item.label}</div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "experience" && (
                                            <div className="bg-brand-cream p-8 min-h-[500px] relative overflow-hidden">
                                                {/* Background elements */}
                                                <div className="absolute inset-0">
                                                    <div className="absolute top-1/4 right-0 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl"></div>
                                                    <div className="absolute bottom-1/4 left-0 w-40 h-40 bg-brand-deep/5 rounded-full blur-3xl"></div>
                                                </div>

                                                <div className="relative z-10">
                                                    {/* Section header */}
                                                    <div className="text-center mb-12">
                                                        <div className="inline-flex items-center px-4 py-2 bg-brand-deep/10 rounded-full text-brand-deep font-medium text-sm mb-6 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
                                                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                                                            <span className="w-2 h-2 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
                                                            {textContent.experienceBadge || 'Career Journey'}
                                                        </div>
                                                        <h2 className="font-serif text-4xl leading-tight text-brand-deep mb-6">
                                                            {textContent.experienceTitle}
                                                            <span className="block text-brand-gold italic">{textContent.experienceSubtitle}</span>
                                                        </h2>
                                                        <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
                                                    </div>

                                                    {/* Timeline */}
                                                    <div className="max-w-4xl mx-auto">
                                                        <div className="relative">
                                                            {/* Vertical line - centered */}
                                                            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-gold via-brand-deep/20 to-brand-gold transform -translate-x-1/2"></div>

                                                            <div className="space-y-12">
                                                                {getFieldValue("experiences").map((exp, index) => (
                                                                    <div key={index} className="relative flex items-center">
                                                                        {/* Timeline dot - centered */}
                                                                        <div className="absolute left-1/2 w-4 h-4 bg-brand-gold rounded-full border-4 border-brand-cream shadow-lg z-10 transform -translate-x-1/2"></div>

                                                                        {/* Content card - alternating sides */}
                                                                        <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'ml-auto pl-8'} bg-white rounded-2xl shadow-xl p-6 border border-brand-gold/10`}>
                                                                            <div className="mb-4">
                                                                                <div className="flex items-start gap-3 mb-2">
                                                                                    {/* Icon */}
                                                                                    {exp.icon && (
                                                                                        <div className="flex-shrink-0">
                                                                                            {(exp.iconType || 'emoji') === 'emoji' ? (
                                                                                                <div className="text-4xl">{exp.icon}</div>
                                                                                            ) : (
                                                                                                <div className="relative w-12 h-12">
                                                                                                    <img
                                                                                                        src={exp.icon}
                                                                                                        alt={exp.role}
                                                                                                        className="w-full h-full object-contain"
                                                                                                    />
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    )}
                                                                                    <div className="flex-1 min-w-0">
                                                                                        <h3 className="font-serif text-2xl text-brand-deep">{exp.role}</h3>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="text-brand-gold font-medium mb-2">
                                                                                    <div className="text-lg">{exp.company}</div>
                                                                                    <div className="text-sm mt-1">{exp.location}</div>
                                                                                </div>
                                                                                <div className="mt-2">
                                                                                    <span className="inline-block bg-brand-deep/5 px-3 py-1 rounded-full text-brand-deep font-medium text-xs">{exp.period}</span>
                                                                                </div>
                                                                            </div>

                                                                            {/* Highlight */}
                                                                            <div className="bg-brand-gold/10 rounded-xl p-3 mb-4 border-l-4 border-brand-gold">
                                                                                <p className="text-brand-deep font-medium italic text-sm">{exp.highlight}</p>
                                                                            </div>

                                                                            {/* Achievements */}
                                                                            <div className="space-y-2">
                                                                                {exp.achievements.map((achievement, i) => (
                                                                                    <div key={i} className="flex items-start space-x-3">
                                                                                        <div className="w-2 h-2 bg-brand-gold rounded-full mt-2 flex-shrink-0"></div>
                                                                                        <p className="text-brand-deep/80 text-sm leading-relaxed">{achievement}</p>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Bottom stats */}
                                                    <div className="text-center mt-12">
                                                        <div className="inline-flex items-center space-x-4 bg-brand-deep/5 rounded-2xl p-6">
                                                            {(textContent.experienceBottomStats && textContent.experienceBottomStats.length > 0 ? textContent.experienceBottomStats : [
                                                                { metric: '10+', label: 'Years' },
                                                                { metric: '€50M+', label: 'Impact' },
                                                                { metric: '25+', label: 'Products' }
                                                            ]).map((stat, index) => (
                                                                <div key={index} className="flex items-center">
                                                                    {index > 0 && <div className="w-px h-12 bg-brand-gold/30 mr-4"></div>}
                                                                    <div className="text-brand-deep">
                                                                        <div className="text-xl font-bold">{stat.metric}</div>
                                                                        <div className="text-xs uppercase tracking-wide">{stat.label}</div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "skills" && (
                                            <div className="bg-brand-deep text-brand-cream p-8 min-h-[500px] relative overflow-hidden">
                                                {/* Background elements */}
                                                <div className="absolute inset-0">
                                                    <div className="absolute top-10 left-1/3 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl"></div>
                                                    <div className="absolute bottom-10 right-1/3 w-40 h-40 bg-brand-cream/5 rounded-full blur-3xl"></div>
                                                </div>

                                                <div className="relative z-10">
                                                    {/* Section header */}
                                                    <div className="text-center mb-8">
                                                        {textContent.skillsBadge && (
                                                            <div className="inline-flex items-center px-3 py-1.5 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs mb-3 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
                                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                                                                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
                                                                {textContent.skillsBadge}
                                                            </div>
                                                        )}
                                                        <h2 className="font-serif text-2xl md:text-4xl leading-tight mb-3">
                                                            {textContent.skillsTitle}
                                                            <span className="block text-brand-gold italic text-xl md:text-3xl">{textContent.skillsSubtitle}</span>
                                                        </h2>
                                                        <div className="w-16 h-0.5 bg-brand-gold mx-auto mb-4"></div>
                                                        <p className="text-sm text-brand-cream/80 max-w-2xl mx-auto">
                                                            {textContent.skillsDescription}
                                                        </p>
                                                    </div>

                                                    {/* Skill Cards */}
                                                    {textContent.skillCards && textContent.skillCards.length > 0 && (
                                                        <div className="flex flex-wrap gap-3 mb-6">
                                                            {getFieldValue("skillCards").map((card, index) => (
                                                                <div
                                                                    key={index}
                                                                    className={`bg-brand-cream/5 backdrop-blur-sm rounded-xl p-5 border border-brand-gold/20 hover:bg-brand-cream/10 transition-all duration-300 ${
                                                                        card.width === 'full' 
                                                                            ? 'w-full' 
                                                                            : 'w-full md:w-[calc(50%-0.375rem)]'
                                                                    }`}
                                                                >
                                                                    {/* Card Header: Icon + Title */}
                                                                    <div className="flex items-center gap-2 mb-4">
                                                                        {card.iconType === 'emoji' ? (
                                                                            <div className="text-3xl">
                                                                                {card.icon}
                                                                            </div>
                                                                        ) : (
                                                                            <div className="relative w-10 h-10 flex-shrink-0">
                                                                                <img
                                                                                    src={card.icon}
                                                                                    alt={card.title}
                                                                                    className="w-full h-full object-contain"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        <h3 className="font-serif text-lg text-brand-gold">
                                                                            {card.title}
                                                                        </h3>
                                                                    </div>

                                                                    {/* Items List - Horizontal */}
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {(card.items || []).map((item, itemIndex) => (
                                                                            <div
                                                                                key={itemIndex}
                                                                                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-brand-deep/30 rounded-lg border border-brand-gold/20"
                                                                            >
                                                                                {(item.iconType || 'emoji') === 'emoji' ? (
                                                                                    <span className="text-base">{item.icon}</span>
                                                                                ) : (
                                                                                    <div className="relative w-4 h-4 flex-shrink-0">
                                                                                        <img
                                                                                            src={item.icon}
                                                                                            alt={item.title}
                                                                                            className="w-full h-full object-contain"
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                                <span className="text-xs text-brand-cream font-medium">{item.title}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Soft Skills Section */}
                                                    {textContent.softSkills && textContent.softSkills.length > 0 && (
                                                        <div className="max-w-4xl mx-auto mb-8">
                                                            <div className="bg-gradient-to-br from-brand-gold/10 to-brand-cream/5 backdrop-blur-sm rounded-2xl p-6 border border-brand-gold/30">
                                                                <h3 className="font-serif text-xl text-brand-gold mb-6 text-center flex flex-col sm:flex-row items-center justify-center gap-2">
                                                                    <span className="text-2xl">💎</span>
                                                                    <span>Leadership & Soft Skills</span>
                                                                </h3>
                                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                                    {getFieldValue("softSkills").map((item, index) => (
                                                                        <div key={index} className="text-center group">
                                                                            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                                                            <p className="text-xs text-brand-cream font-medium leading-snug">{item.skill}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Certifications */}
                                                    <div className="max-w-xl mx-auto mb-6">
                                                        <div className="bg-brand-cream/5 backdrop-blur-sm rounded-xl p-4 border border-brand-gold/20">
                                                            <h3 className="font-serif text-base text-brand-gold mb-3 flex items-center justify-center">
                                                                {textContent.skillsCertificationsTitle || '🏆 Certifications'}
                                                            </h3>
                                                            <div className="space-y-2">
                                                                {textContent.certifications.slice(0, 4).map((cert, index) => (
                                                                    <div key={index} className="flex items-center space-x-2">
                                                                        <div className="w-1.5 h-1.5 bg-brand-gold rounded-full"></div>
                                                                        <span className="text-xs">{cert}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "projects" && (
                                            <div className="bg-brand-deep text-brand-cream p-4 sm:p-6 md:p-8 min-h-[500px]">
                                                {/* Section header */}
                                                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                                                    <div className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs mb-3 sm:mb-4 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
                                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                                                        <span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
                                                        Featured Projects
                                                    </div>
                                                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">{textContent.projectsTitle}</h2>
                                                    <div className="w-12 sm:w-16 h-1 bg-brand-gold mx-auto"></div>
                                                </div>

                                                {/* Projects grid - responsive */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
                                                    {getFieldValue("projects").map((project, idx) => {
                                                        const CardWrapper = project.link ? 'a' : 'div';
                                                        const cardProps = project.link 
                                                            ? { 
                                                                href: project.link, 
                                                                target: '_blank', 
                                                                rel: 'noopener noreferrer'
                                                            } 
                                                            : {};

                                                        return (
                                                            <CardWrapper
                                                                key={idx}
                                                                {...cardProps}
                                                            >
                                                                <div className="group relative bg-gradient-to-br from-brand-cream/5 to-brand-gold/5 backdrop-blur-sm rounded-2xl border border-brand-gold/20 hover:border-brand-gold/40 transition-all duration-300 overflow-hidden h-full flex flex-col">
                                                                    {/* Image section - 60% */}
                                                                    <div className="relative w-full h-0 pb-[60%] overflow-hidden">
                                                                        {project.image ? (
                                                                            <img
                                                                                src={project.image}
                                                                                alt={project.title}
                                                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                                            />
                                                                        ) : (
                                                                            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-brand-cream/10 flex items-center justify-center">
                                                                                <span className="text-4xl opacity-50">📁</span>
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    {/* Content section - 40% */}
                                                                    <div className="flex-1 p-4 sm:p-5 flex flex-col justify-start">
                                                                        <h3 className="text-lg sm:text-xl font-semibold text-brand-cream mb-1 leading-tight group-hover:text-brand-gold transition-colors duration-300">
                                                                            {project.title}
                                                                        </h3>
                                                                        {project.subtitle && (
                                                                            <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed mb-2">
                                                                                {project.subtitle}
                                                                            </p>
                                                                        )}
                                                                        {project.tags && project.tags.length > 0 && (
                                                                            <div className="flex flex-wrap gap-1.5 mb-2">
                                                                                {project.tags.map((tag: string, tagIndex: number) => (
                                                                                    <span
                                                                                        key={tagIndex}
                                                                                        className="px-2 py-0.5 bg-brand-gold/20 text-brand-gold text-xs font-medium rounded-full border border-brand-gold/30"
                                                                                    >
                                                                                        {tag}
                                                                                    </span>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                        {project.link && (
                                                                            <div className="mt-2 flex items-center text-brand-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                                                <span>View Project</span>
                                                                                <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                                </svg>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </CardWrapper>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "contact" && (
                                            <div className="bg-brand-cream p-6 min-h-[500px] relative overflow-hidden">
                                                {/* Background elements */}
                                                <div className="absolute inset-0">
                                                    <div className="absolute top-1/4 left-0 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl"></div>
                                                    <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-brand-deep/5 rounded-full blur-3xl"></div>
                                                </div>

                                                <div className="relative z-10">
                                                    {/* Section header */}
                                                    <div className="text-center mb-6">
                                                        {textContent.contactBadge && (
                                                            <div className="inline-flex items-center px-2 py-1 bg-brand-deep/10 rounded-full text-brand-deep font-medium text-xs mb-2 hover:bg-brand-gold/30 hover:shadow-[0_0_20px_rgba(199,161,122,0.4)] transition-all duration-500 cursor-default group relative overflow-hidden">
                                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
                                                                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full mr-2 relative z-10 group-hover:scale-125 transition-transform duration-300"></span>
                                                                {textContent.contactBadge}
                                                            </div>
                                                        )}
                                                        <h2 className="font-serif text-2xl leading-tight text-brand-deep mb-2">
                                                            {textContent.contactTitle}
                                                            <span className="block text-brand-gold italic text-xl">{textContent.contactSubtitle}</span>
                                                        </h2>
                                                        <div className="w-12 h-0.5 bg-brand-gold mx-auto mb-3"></div>
                                                        <p className="text-xs text-brand-deep/80 max-w-xl mx-auto">
                                                            {textContent.contactDescription}
                                                        </p>
                                                    </div>

                                                    {/* Two-column grid */}
                                                    <div className="grid lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
                                                        {/* Contact Form */}
                                                        <div className="bg-white rounded-2xl shadow-xl p-4 border border-brand-gold/10">
                                                            <h3 className="font-serif text-sm text-brand-deep mb-3">{textContent.contactFormTitle || 'Send a Message'}</h3>
                                                            <div className="space-y-2">
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <div>
                                                                        <label className="block text-xs font-medium text-brand-deep mb-1">
                                                                            {textContent.contactFormLabels?.name || 'Full Name'} <span className="text-brand-gold">*</span>
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            placeholder={textContent.contactFormPlaceholders?.name || 'Your name'}
                                                                            className="w-full px-2 py-1.5 bg-brand-cream/50 border border-brand-deep/20 rounded-lg text-xs"
                                                                            disabled
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-xs font-medium text-brand-deep mb-1">
                                                                            {textContent.contactFormLabels?.email || 'Email'} <span className="text-brand-gold">*</span>
                                                                        </label>
                                                                        <input
                                                                            type="email"
                                                                            placeholder={textContent.contactFormPlaceholders?.email || 'your@email.com'}
                                                                            className="w-full px-2 py-1.5 bg-brand-cream/50 border border-brand-deep/20 rounded-lg text-xs"
                                                                            disabled
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-brand-deep mb-1">{textContent.contactFormLabels?.company || 'Company'}</label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder={textContent.contactFormPlaceholders?.company || 'Your company'}
                                                                        className="w-full px-2 py-1.5 bg-brand-cream/50 border border-brand-deep/20 rounded-lg text-xs"
                                                                        disabled
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-xs font-medium text-brand-deep mb-1">
                                                                        {textContent.contactFormLabels?.message || 'Message'} <span className="text-brand-gold">*</span>
                                                                    </label>
                                                                    <textarea
                                                                        placeholder={textContent.contactFormPlaceholders?.message || 'Tell me about your project...'}
                                                                        rows={3}
                                                                        className="w-full px-2 py-1.5 bg-brand-cream/50 border border-brand-deep/20 rounded-lg text-xs resize-none"
                                                                        disabled
                                                                    ></textarea>
                                                                </div>
                                                                <button className="w-full bg-brand-deep text-brand-cream font-medium py-2 px-3 rounded-xl text-xs" disabled>
                                                                    {textContent.contactSubmitButton || 'Send Message'}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Contact Info & CTA */}
                                                        <div className="space-y-3">
                                                            {/* Direct contact */}
                                                            <div className="bg-brand-deep rounded-2xl p-3 border-2 border-brand-gold shadow-lg">
                                                                <h3 className="font-serif text-sm text-brand-cream mb-3">{textContent.contactInfoTitle || 'Get in Touch Directly'}</h3>
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center space-x-2">
                                                                        <div className="w-6 h-6 bg-brand-gold/20 rounded-full flex items-center justify-center text-xs">📧</div>
                                                                        <div>
                                                                            <div className="font-medium text-brand-cream text-xs">Email</div>
                                                                            <div className="text-brand-gold text-xs break-all font-medium">{textContent.contactEmail || 'luz.quintanar@email.com'}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <div className="w-6 h-6 bg-brand-gold/20 rounded-full flex items-center justify-center text-xs">💼</div>
                                                                        <div>
                                                                            <div className="font-medium text-brand-cream text-xs">LinkedIn</div>
                                                                            <div className="text-brand-gold text-xs break-all font-medium">{textContent.contactLinkedin ? textContent.contactLinkedin.replace('https://', '').replace('http://', '') : 'linkedin.com/in/luzquintanar'}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <div className="w-6 h-6 bg-brand-gold/20 rounded-full flex items-center justify-center text-xs">📱</div>
                                                                        <div>
                                                                            <div className="font-medium text-brand-cream text-xs">Phone</div>
                                                                            <div className="text-brand-gold text-xs font-medium">{textContent.contactPhone || '+33 1 23 45 67 89'}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Availability */}
                                                            <div className="bg-brand-gold/10 rounded-2xl p-3 border border-brand-gold/30">
                                                                <h3 className="font-serif text-sm text-brand-deep mb-2">{textContent.contactAvailabilityTitle || 'Current Availability'}</h3>
                                                                <div className="flex items-center space-x-2 mb-2">
                                                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                                    <span className="text-brand-deep font-medium text-xs">{textContent.contactAvailabilityStatus || 'Available for new opportunities'}</span>
                                                                </div>
                                                                <p className="text-brand-deep/80 mb-2 text-xs">
                                                                    {textContent.contactAvailabilityDescription || "I'm currently exploring exciting product leadership roles."}
                                                                </p>
                                                                <div className="space-y-0.5 text-xs text-brand-deep/70">
                                                                    {(textContent.contactAvailabilityItems && textContent.contactAvailabilityItems.length > 0 ? textContent.contactAvailabilityItems : [
                                                                        'Strategic consulting projects',
                                                                        'Full-time product leadership roles',
                                                                        'Speaking engagements & workshops'
                                                                    ]).slice(0, 3).map((item, index) => (
                                                                        <div key={index}>• {item}</div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Download CV */}
                                                            <div className="text-center">
                                                                <button
                                                                    className="group inline-flex items-center justify-center px-4 py-2 bg-brand-deep text-brand-cream font-medium rounded-full text-xs transition-all duration-500 shadow-[0_4px_14px_0_rgba(11,19,43,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.5)] hover:-translate-y-0.5 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-gold/0 before:via-brand-gold/90 before:to-brand-gold/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                                                                    disabled
                                                                >
                                                                    <span className="text-sm mr-1.5">📄</span>
                                                                    {textContent.contactDownloadText || 'Download Full Portfolio'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Bottom section */}
                                                    <div className="text-center mt-6">
                                                        <div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 bg-brand-deep/5 rounded-2xl p-3">
                                                            <div className="text-brand-deep text-center">
                                                                <div className="text-xs font-medium">{textContent.contactBottomInfo?.responseTime?.label || 'Response Time'}</div>
                                                                <div className="text-sm font-bold text-brand-gold">{textContent.contactBottomInfo?.responseTime?.value || '24h'}</div>
                                                            </div>
                                                            <div className="hidden sm:block w-px h-8 bg-brand-gold/30"></div>
                                                            <div className="text-brand-deep text-center">
                                                                <div className="text-xs font-medium">{textContent.contactBottomInfo?.location?.label || 'Based in'}</div>
                                                                <div className="text-sm font-bold text-brand-gold">{textContent.contactBottomInfo?.location?.value || 'Paris'}</div>
                                                            </div>
                                                            <div className="hidden sm:block w-px h-8 bg-brand-gold/30"></div>
                                                            <div className="text-brand-deep text-center">
                                                                <div className="text-xs font-medium">{textContent.contactBottomInfo?.languages?.label || 'Languages'}</div>
                                                                <div className="text-sm font-bold text-brand-gold">{textContent.contactBottomInfo?.languages?.value || 'EN • FR • ESP'}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* For theme tab, show a live preview with current theme */}
                                        {activeTab === "theme" && (
                                            <div className="space-y-4 h-full flex flex-col">
                                                {/* Preview banner */}
                                                <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg p-3 text-center flex-shrink-0">
                                                    <p className="text-sm text-brand-cream">
                                                        <span className="font-semibold">🎨 Live Theme Preview</span> - Scroll to see your colors and fonts across different sections
                                                    </p>
                                                </div>
                                                
                                                {/* Scrollable preview container */}
                                                <div className="flex-1 overflow-y-auto rounded-2xl" style={{ 
                                                    maxHeight: 'calc(100vh - 12rem)',
                                                    backgroundColor: textContent.themeColors?.brandDeep || '#0B132B',
                                                    color: textContent.themeColors?.brandCream || '#F5F1E8',
                                                    fontFamily: textContent.themeFont?.secondary || 'Inter, sans-serif'
                                                }}>
                                                    {/* About Section */}
                                                    <div className="p-6 relative">
                                                        <div className="absolute inset-0" style={{ backgroundColor: textContent.themeColors?.brandDeep || '#0B132B' }}>
                                                            <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full blur-3xl" style={{ backgroundColor: `${textContent.themeColors?.brandGold || '#C7A17A'}20` }}></div>
                                                        </div>

                                                        <div className="relative z-10">
                                                            <div className="text-center mb-8">
                                                                <div className="inline-flex items-center px-3 py-1.5 rounded-full font-medium text-xs mb-4" style={{ 
                                                                    backgroundColor: `${textContent.themeColors?.brandGold || '#C7A17A'}33`,
                                                                    color: textContent.themeColors?.brandGold || '#C7A17A'
                                                                }}>
                                                                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: textContent.themeColors?.brandGold || '#C7A17A' }}></span>
                                                                    {textContent.aboutBadge || 'About Me'}
                                                                </div>
                                                                <h2 className="text-3xl md:text-4xl leading-tight mb-4" style={{ fontFamily: textContent.themeFont?.primary || 'Playfair Display, serif' }}>
                                                                    {textContent.aboutTitle}
                                                                    <span className="block italic mt-1" style={{ color: textContent.themeColors?.brandGold || '#C7A17A' }}>
                                                                        {textContent.aboutTitleSuffix || 'reality'}
                                                                    </span>
                                                                </h2>
                                                                <div className="w-16 h-1 mx-auto" style={{ backgroundColor: textContent.themeColors?.brandGold || '#C7A17A' }}></div>
                                                            </div>

                                                            <div className="max-w-2xl mx-auto space-y-4">
                                                                <p className="text-base leading-relaxed" style={{ color: `${textContent.themeColors?.brandCream || '#F5F1E8'}e6` }}>
                                                                    {textContent.aboutMainText}
                                                                </p>
                                                                <p className="text-sm leading-relaxed" style={{ color: `${textContent.themeColors?.brandCream || '#F5F1E8'}cc` }}>
                                                                    {textContent.aboutSecondaryText}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Experience Section Preview */}
                                                    <div className="p-6 relative" style={{ backgroundColor: textContent.themeColors?.brandCream || '#F5F1E8', color: textContent.themeColors?.brandDeep || '#0B132B' }}>
                                                        <div className="text-center mb-6">
                                                            <h2 className="text-2xl md:text-3xl leading-tight" style={{ fontFamily: textContent.themeFont?.primary || 'Playfair Display, serif' }}>
                                                                {textContent.experienceTitle}
                                                                <span className="block italic" style={{ color: textContent.themeColors?.brandGold || '#C7A17A' }}>
                                                                    {textContent.experienceSubtitle}
                                                                </span>
                                                            </h2>
                                                            <div className="w-16 h-1 mx-auto mt-3" style={{ backgroundColor: textContent.themeColors?.brandGold || '#C7A17A' }}></div>
                                                        </div>
                                                        <div className="max-w-xl mx-auto p-4 rounded-lg border" style={{ 
                                                            backgroundColor: `${textContent.themeColors?.brandDeep || '#0B132B'}0d`,
                                                            borderColor: `${textContent.themeColors?.brandGold || '#C7A17A'}33`
                                                        }}>
                                                            <p className="text-sm" style={{ color: textContent.themeColors?.brandDeep || '#0B132B' }}>
                                                                Experience cards would appear here with your custom theme...
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Skills Section Preview */}
                                                    <div className="p-6 relative" style={{ backgroundColor: textContent.themeColors?.brandDeep || '#0B132B' }}>
                                                        <div className="text-center mb-6">
                                                            <h2 className="text-2xl md:text-3xl leading-tight" style={{ 
                                                                fontFamily: textContent.themeFont?.primary || 'Playfair Display, serif',
                                                                color: textContent.themeColors?.brandCream || '#F5F1E8'
                                                            }}>
                                                                {textContent.skillsTitle}
                                                                <span className="block italic" style={{ color: textContent.themeColors?.brandGold || '#C7A17A' }}>
                                                                    {textContent.skillsSubtitle}
                                                                </span>
                                                            </h2>
                                                            <div className="w-16 h-1 mx-auto mt-3" style={{ backgroundColor: textContent.themeColors?.brandGold || '#C7A17A' }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* For languages tab, show a live preview with language selector */}
                                        {activeTab === "languages" && (
                                            <div className="space-y-4 h-full flex flex-col">
                                                {/* Language preview selector */}
                                                <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg p-4 flex-shrink-0">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <p className="text-sm font-medium">
                                                            <span className="font-bold text-brand-gold">🌍 Language Preview</span>
                                                            <span className="text-brand-gold/80"> - Select to see translations</span>
                                                        </p>
                                                        <select
                                                            value={currentLanguage}
                                                            onChange={(e) => setCurrentLanguage(e.target.value)}
                                                            className="px-3 py-2 bg-white/10 text-brand-cream border border-brand-gold/40 rounded-lg text-sm font-medium cursor-pointer hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold"
                                                        >
                                                            {textContent.enabledLanguages.map((langCode) => {
                                                                const lang = availableLanguages[langCode];
                                                                if (!lang) return null;
                                                                return (
                                                                    <option key={langCode} value={langCode} className="bg-brand-deep text-brand-cream">
                                                                        {lang.flag} {lang.name}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                                {/* Scrollable preview container */}
                                                <div className="flex-1 overflow-y-auto rounded-2xl bg-brand-deep" style={{ maxHeight: 'calc(100vh - 12rem)' }}>
                                                    {/* About Section */}
                                                    <div className="bg-brand-deep text-brand-cream p-6 relative">
                                                        <div className="absolute inset-0">
                                                            <div className="absolute top-0 left-1/4 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl"></div>
                                                        </div>

                                                        <div className="relative z-10">
                                                            <div className="text-center mb-8">
                                                                <div className="inline-flex items-center px-3 py-1.5 bg-brand-gold/20 rounded-full text-brand-gold font-medium text-xs mb-4">
                                                                    <span className="w-2 h-2 bg-brand-gold rounded-full mr-2"></span>
                                                                    {getCurrentLanguageContent().aboutBadge || textContent.aboutBadge || 'About Me'}
                                                                </div>
                                                                <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4">
                                                                    {getCurrentLanguageContent().aboutTitle || textContent.aboutTitle}
                                                                    <span className="block text-brand-gold italic mt-1">
                                                                        {getCurrentLanguageContent().aboutTitleSuffix || textContent.aboutTitleSuffix || 'reality'}
                                                                    </span>
                                                                </h2>
                                                                <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
                                                            </div>

                                                            <div className="max-w-2xl mx-auto space-y-4">
                                                                <p className="text-base leading-relaxed text-brand-cream/90">
                                                                    {getCurrentLanguageContent().aboutMainText || textContent.aboutMainText}
                                                                </p>
                                                                <p className="text-sm leading-relaxed text-brand-cream/80">
                                                                    {getCurrentLanguageContent().aboutSecondaryText || textContent.aboutSecondaryText}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Experience Section Preview */}
                                                    <div className="bg-brand-cream text-brand-deep p-6 relative">
                                                        <div className="text-center mb-6">
                                                            <h2 className="font-serif text-2xl md:text-3xl leading-tight">
                                                                {getCurrentLanguageContent().experienceTitle || textContent.experienceTitle}
                                                                <span className="block text-brand-gold italic">
                                                                    {getCurrentLanguageContent().experienceSubtitle || textContent.experienceSubtitle}
                                                                </span>
                                                            </h2>
                                                            <div className="w-16 h-1 bg-brand-gold mx-auto mt-3"></div>
                                                        </div>
                                                        <div className="max-w-xl mx-auto p-4 bg-brand-deep/5 rounded-lg border border-brand-gold/20">
                                                            <p className="text-sm text-brand-deep/80">
                                                                Experience cards would appear here in {availableLanguages[currentLanguage]?.name || 'selected language'}...
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Skills Section Preview */}
                                                    <div className="bg-brand-deep text-brand-cream p-6 relative">
                                                        <div className="text-center mb-6">
                                                            <h2 className="font-serif text-2xl md:text-3xl leading-tight">
                                                                {getCurrentLanguageContent().skillsTitle || textContent.skillsTitle}
                                                                <span className="block text-brand-gold italic">
                                                                    {getCurrentLanguageContent().skillsSubtitle || textContent.skillsSubtitle}
                                                                </span>
                                                            </h2>
                                                            <div className="w-16 h-1 bg-brand-gold mx-auto mt-3"></div>
                                                            <p className="text-sm text-brand-cream/70 mt-4 max-w-2xl mx-auto">
                                                                {getCurrentLanguageContent().skillsDescription || textContent.skillsDescription}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Contact Section Preview */}
                                                    <div className="bg-brand-cream text-brand-deep p-6 relative">
                                                        <div className="text-center mb-6">
                                                            <h2 className="font-serif text-2xl md:text-3xl leading-tight">
                                                                {getCurrentLanguageContent().contactTitle || textContent.contactTitle}
                                                                <span className="block text-brand-gold italic text-xl">
                                                                    {getCurrentLanguageContent().contactSubtitle || textContent.contactSubtitle}
                                                                </span>
                                                            </h2>
                                                            <div className="w-16 h-1 bg-brand-gold mx-auto mt-3"></div>
                                                            <p className="text-sm text-brand-deep/80 mt-4 max-w-xl mx-auto">
                                                                {getCurrentLanguageContent().contactDescription || textContent.contactDescription}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === "loading" && (
                                            <div className="bg-gradient-to-br from-brand-cream via-brand-cream to-brand-gold/10 min-h-screen flex items-center justify-center relative overflow-hidden">
                                                {/* Background decorative elements */}
                                                <div className="absolute inset-0">
                                                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"></div>
                                                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-deep/5 rounded-full blur-3xl"></div>
                                                </div>

                                                {/* Loading screen preview */}
                                                <div className="relative z-10 text-center">
                                                    <div className="overflow-hidden">
                                                        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-2">
                                                            <span className="text-brand-deep">{textContent.loadingScreenFirstName || "LUZ"}</span>
                                                        </h1>
                                                    </div>
                                                    <div className="overflow-hidden mt-2">
                                                        <h2 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold italic tracking-wider">
                                                            <span className="text-brand-gold">{textContent.loadingScreenLastName || "QUINTANAR"}</span>
                                                        </h2>
                                                    </div>
                                                    <div className="mt-8 md:mt-12">
                                                        <p className="text-brand-deep/70 text-sm md:text-base tracking-[0.3em] uppercase font-medium">
                                                            {textContent.loadingScreenTagline || "Product Owner • Luxury Retail"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-deep border-t border-brand-gold/20 shadow-2xl z-40">
                {/* Tab Navigation */}
                <div className="flex justify-around sm:justify-around overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    {[
                        { id: "hero", label: "Hero", icon: "🏠" },
                        { id: "about", label: "About", icon: "👤" },
                        { id: "experience", label: "Experience", icon: "💼" },
                        { id: "skills", label: "Skills", icon: "⚡" },
                        { id: "projects", label: "Projects", icon: "📁" },
                        { id: "contact", label: "Contact", icon: "📧" },
                        { id: "theme", label: "Theme", icon: "🎨" },
                        { id: "languages", label: "Lang", icon: "🌍" },
                        { id: "loading", label: "Loading", icon: "✨" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setShowPreview(false); // Switch to edit view when changing tabs
                            }}
                            className={`flex-shrink-0 flex flex-col items-center justify-center px-3 py-2 min-w-[60px] transition-all duration-300 snap-center ${activeTab === tab.id
                                ? 'bg-brand-gold/20 border-t-2 border-brand-gold'
                                : 'border-t-2 border-transparent'
                                }`}
                        >
                            <span className="text-lg mb-0.5">{tab.icon}</span>
                            <span className={`text-[10px] font-medium ${activeTab === tab.id ? 'text-brand-gold' : 'text-brand-cream/70'}`}>
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Action Bar */}
                <div className="flex gap-2 p-2 bg-brand-deep/95 border-t border-brand-gold/10">
                    <button
                        onClick={handleSave}
                        disabled={saveStatus === "saving"}
                        className="flex-1 py-3 px-4 bg-brand-gold text-brand-deep rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-[0_4px_14px_0_rgba(199,161,122,0.4)] hover:shadow-[0_6px_20px_rgba(199,161,122,0.6)] hover:-translate-y-0.5 font-medium text-sm flex items-center justify-center gap-2 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-brand-cream/0 before:via-brand-cream/50 before:to-brand-cream/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                    >
                        {saveStatus === "saving" ? (
                            <>
                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                💾 Save Changes
                            </>
                        )}
                    </button>
                    <button
                        onClick={() => setShowQRCode(true)}
                        className="py-3 px-4 bg-brand-gold/20 text-brand-cream rounded-xl hover:bg-brand-gold/30 transition-all duration-300 font-medium border border-brand-gold/30 text-sm flex items-center justify-center"
                        title="QR Code"
                    >
                        📱
                    </button>
                    <button
                        onClick={handleLogout}
                        className="py-3 px-4 bg-red-500/20 text-brand-cream rounded-xl hover:bg-red-500 hover:text-white transition-all duration-500 shadow-[0_4px_14px_0_rgba(239,68,68,0.3)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.5)] hover:-translate-y-0.5 font-medium border border-red-500/30 hover:border-red-500 text-sm flex items-center justify-center gap-2"
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>

            {/* QR Code Modal */}
            {showQRCode && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-gradient-to-br from-brand-deep to-brand-deep/95 rounded-2xl shadow-2xl border border-brand-gold/30 p-6 md:p-8 max-w-md w-full relative">
                        {/* Close button */}
                        <button
                            onClick={() => setShowQRCode(false)}
                            className="absolute top-4 right-4 text-brand-cream hover:text-brand-gold transition-colors"
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Title */}
                        <h3 className="text-2xl font-serif text-brand-gold mb-2">Share Your Portfolio</h3>
                        <p className="text-brand-cream/70 text-sm mb-6">Scan this QR code to visit your site</p>

                        {/* QR Code */}
                        <div className="bg-white p-6 rounded-xl mb-6 flex items-center justify-center">
                            <canvas id="qr-code-canvas" className="max-w-full" />
                        </div>

                        {/* Site URL */}
                        <div className="mb-6">
                            <label className="block text-xs text-brand-cream/70 mb-2">Site URL</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={typeof window !== 'undefined' ? window.location.origin : ''}
                                    readOnly
                                    className="flex-1 px-3 py-2 bg-white/10 border border-brand-gold/30 rounded-lg text-brand-cream text-sm"
                                />
                                <button
                                    onClick={() => {
                                        if (typeof window !== 'undefined') {
                                            navigator.clipboard.writeText(window.location.origin);
                                            alert('URL copied to clipboard!');
                                        }
                                    }}
                                    className="px-4 py-2 bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-cream rounded-lg transition-colors text-sm"
                                    title="Copy URL"
                                >
                                    📋
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
                                    if (canvas) {
                                        const url = canvas.toDataURL('image/png');
                                        const link = document.createElement('a');
                                        link.download = 'portfolio-qr-code.png';
                                        link.href = url;
                                        link.click();
                                    }
                                }}
                                className="flex-1 py-3 px-4 bg-brand-gold text-brand-deep rounded-xl hover:bg-brand-gold/90 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                💾 Download QR Code
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
