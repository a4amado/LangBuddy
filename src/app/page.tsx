"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Hero } from "./_components/landing/Hero";
import { Features } from "./_components/landing/Features";
import { HowItWorks } from "./_components/landing/HowItWorks";
import { CTASection } from "./_components/landing/CTASection";
import { Footer } from "./_components/landing/Footer";

export default function LandingPage() {
    const session = useSession();

    return (
        <div className="min-h-screen bg-white">
            <Hero />
            <Features />
            <HowItWorks />
            <CTASection />
            <Footer />
        </div>
    );
}
