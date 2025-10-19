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
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        // Hide loading screen after animation
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 4000); // Reduced from 5000 to 4000ms for better UX

        return () => clearTimeout(timer);
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
