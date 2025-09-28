"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

export default function BackOffice() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [textContent, setTextContent] = useState<TextContent>({
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
    });
    const [activeTab, setActiveTab] = useState('hero');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem('nadiaAuth');
        if (auth !== 'true') {
            router.push('/nadia');
        } else {
            setIsAuthenticated(true);
            // Load saved content from localStorage
            const savedContent = localStorage.getItem('websiteContent');
            if (savedContent) {
                setTextContent(JSON.parse(savedContent));
            }
        }
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('nadiaAuth');
        router.push('/nadia');
    };

    const handleTextChange = (field: keyof TextContent, value: string) => {
        setTextContent(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        setSaveStatus('saving');
        try {
            // Save to localStorage (in a real app, this would be an API call)
            localStorage.setItem('websiteContent', JSON.stringify(textContent));
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'hero':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Hero Title</label>
                            <input
                                type="text"
                                value={textContent.heroTitle}
                                onChange={(e) => handleTextChange('heroTitle', e.target.value)}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Hero Subtitle</label>
                            <input
                                type="text"
                                value={textContent.heroSubtitle}
                                onChange={(e) => handleTextChange('heroSubtitle', e.target.value)}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Hero Description</label>
                            <textarea
                                value={textContent.heroDescription}
                                onChange={(e) => handleTextChange('heroDescription', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>
                    </div>
                );
            case 'about':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">About Title</label>
                            <input
                                type="text"
                                value={textContent.aboutTitle}
                                onChange={(e) => handleTextChange('aboutTitle', e.target.value)}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">About Description</label>
                            <textarea
                                value={textContent.aboutDescription}
                                onChange={(e) => handleTextChange('aboutDescription', e.target.value)}
                                rows={6}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Contact Title</label>
                            <input
                                type="text"
                                value={textContent.contactTitle}
                                onChange={(e) => handleTextChange('contactTitle', e.target.value)}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Contact Subtitle</label>
                            <input
                                type="text"
                                value={textContent.contactSubtitle}
                                onChange={(e) => handleTextChange('contactSubtitle', e.target.value)}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-deep mb-2">Contact Description</label>
                            <textarea
                                value={textContent.contactDescription}
                                onChange={(e) => handleTextChange('contactDescription', e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent resize-none"
                            />
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
        <div className="min-h-screen bg-brand-cream">
            {/* Header */}
            <header className="bg-brand-deep text-brand-cream shadow-lg">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="font-serif text-2xl">Back Office</h1>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-brand-gold text-brand-deep rounded-lg hover:bg-brand-cream transition-colors duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-8">
                {/* Save Status */}
                <div className="mb-6">
                    {saveStatus === 'saving' && (
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </div>
                    )}
                    {saveStatus === 'saved' && (
                        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Saved successfully!
                        </div>
                    )}
                    {saveStatus === 'error' && (
                        <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            Error saving changes
                        </div>
                    )}
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="font-serif text-xl text-brand-deep mb-6">Sections</h2>
                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('hero')}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 ${
                                        activeTab === 'hero'
                                            ? 'bg-brand-gold text-brand-deep font-medium'
                                            : 'text-brand-deep/70 hover:bg-brand-cream/50'
                                    }`}
                                >
                                    Hero Section
                                </button>
                                <button
                                    onClick={() => setActiveTab('about')}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 ${
                                        activeTab === 'about'
                                            ? 'bg-brand-gold text-brand-deep font-medium'
                                            : 'text-brand-deep/70 hover:bg-brand-cream/50'
                                    }`}
                                >
                                    About Section
                                </button>
                                <button
                                    onClick={() => setActiveTab('contact')}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-300 ${
                                        activeTab === 'contact'
                                            ? 'bg-brand-gold text-brand-deep font-medium'
                                            : 'text-brand-deep/70 hover:bg-brand-cream/50'
                                    }`}
                                >
                                    Contact Section
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="font-serif text-2xl text-brand-deep capitalize">
                                    {activeTab} Section
                                </h2>
                                <button
                                    onClick={handleSave}
                                    disabled={saveStatus === 'saving'}
                                    className="px-6 py-3 bg-brand-deep text-brand-cream rounded-lg hover:bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                >
                                    {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>

                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
