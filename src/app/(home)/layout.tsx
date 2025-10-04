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
    const [showLoading, setShowLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Show loading screen on every page load
        setShowLoading(true);
        // Hide loading screen after animation
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    // Don't render anything until mounted to avoid hydration mismatch
    if (!mounted) {
        return (
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
        );
    }

    return (
        <>
            <AnimatePresence mode="wait">
                {showLoading && <LoadingScreen />}
            </AnimatePresence>
            {!showLoading && (
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
            )}
        </>
    );
}
