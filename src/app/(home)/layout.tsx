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
    // Check if this is the first load in the session
    const [showLoading, setShowLoading] = useState(() => {
        // Only show loading on the very first page load in the session
        if (typeof window !== 'undefined') {
            const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
            return !hasLoadedBefore;
        }
        return true;
    });

    useEffect(() => {
        // Mark that we've loaded the page
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('hasLoadedBefore', 'true');
        }

        // Hide loading screen after animation only if we're showing it
        if (showLoading) {
            const timer = setTimeout(() => {
                setShowLoading(false);
            }, 2000); // Matches the 2x faster animation speed

            return () => clearTimeout(timer);
        }
    }, [showLoading]);

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
