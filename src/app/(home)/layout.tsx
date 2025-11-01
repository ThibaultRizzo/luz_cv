"use client";

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Always start with loading hidden to avoid hydration issues
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        // Check if this is the first load in the session
        const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
        
        if (!hasLoadedBefore) {
            // First load - show loading screen
            setShowLoading(true);
            sessionStorage.setItem('hasLoadedBefore', 'true');
            
            // Hide loading screen after animation
            const timer = setTimeout(() => {
                setShowLoading(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {showLoading && <LoadingScreen />}
            </AnimatePresence>
            <div className="home-layout">
                <a href="#main-content" className="skip-nav">
                    Skip to main content
                </a>
                <Nav />
                <main id="main-content">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}
