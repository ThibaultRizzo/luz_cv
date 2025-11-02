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
    const [contentReady, setContentReady] = useState(false);

    useEffect(() => {
        const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
        
        if (hasLoadedBefore) {
            // Already loaded before - show content immediately
            setShowLoading(false);
            setContentReady(true);
            document.body.classList.add('loaded');
        } else {
            // First time - show loading animation
            sessionStorage.setItem('hasLoadedBefore', 'true');
            
            // Hide loading screen after animation
            const timer = setTimeout(() => {
                setShowLoading(false);
                setContentReady(true);
                document.body.classList.add('loaded');
            }, 2000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {showLoading && <LoadingScreen />}
            </AnimatePresence>
            <div className="home-layout" style={{ opacity: contentReady ? 1 : 0, transition: 'opacity 0.3s' }}>
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
