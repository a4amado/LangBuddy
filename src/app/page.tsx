"use client";

import { Button } from "antd";
import {
    Languages,
    MessageCircle,
    Globe,
    LogIn,
    Settings,
    Users,
    MessageSquare,
    Facebook,
    Twitter,
    Instagram,
    MessagesSquare,
} from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
    const session = useSession();
    useEffect(() => {
        if (session?.status == "authenticated") redirect("/home");
    }, [session.status]);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-0" />

                {/* Navigation */}
                <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <Languages className="h-10 w-10 text-blue-600" />
                            <span className="ml-3 text-2xl font-bold text-gray-900">LangBuddy</span>
                        </div>
                        <Button
                            onClick={() => signIn("google")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
                        >
                            Get Started
                        </Button>
                    </div>
                </nav>

                {/* Hero Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                Connect, Chat & Learn Languages Naturally
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Find language exchange partners, practice with native speakers, and
                                make friends from around the world.
                            </p>
                            <Button
                                onClick={() => signIn("google")}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full"
                            >
                                Start Learning Now
                            </Button>
                        </div>
                        <div className="flex justify-center">
                            <MessagesSquare className="h-64 w-64 text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
                        Why Choose LangBuddy?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Feature 1 */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <Users className="h-24 w-24 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Native Speakers</h3>
                            <p className="text-gray-600">
                                Connect with native speakers of your target language and help others
                                learn your language.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <MessageCircle className="h-24 w-24 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Real Conversations</h3>
                            <p className="text-gray-600">
                                Practice through natural conversations in a friendly and supportive
                                environment.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <Globe className="h-24 w-24 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Cultural Exchange</h3>
                            <p className="text-gray-600">
                                Learn about different cultures while improving your language skills.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <LogIn className="h-16 w-16 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">1. Sign Up</h3>
                            <p className="text-gray-600">Create your profile with Google</p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <Settings className="h-16 w-16 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">2. Set Languages</h3>
                            <p className="text-gray-600">Choose your native and target languages</p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <Users className="h-16 w-16 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">3. Find Partners</h3>
                            <p className="text-gray-600">Match with language exchange partners</p>
                        </div>

                        {/* Step 4 */}
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <MessageSquare className="h-16 w-16 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">4. Start Learning</h3>
                            <p className="text-gray-600">Chat and practice together</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 bg-blue-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">
                        Ready to Start Your Language Learning Journey?
                    </h2>
                    <Button
                        onClick={() => signIn("google")}
                        className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full"
                    >
                        Join LangBuddy Now
                    </Button>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">LangBuddy</h3>
                            <p className="text-gray-400">
                                Connect with language learners worldwide
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Features</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>Chat System</li>
                                <li>Language Matching</li>
                                <li>User Profiles</li>
                                <li>Cultural Exchange</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>Help Center</li>
                                <li>Contact Us</li>
                                <li>Privacy Policy</li>
                                <li>Terms of Service</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Facebook className="h-6 w-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Twitter className="h-6 w-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Instagram className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                        <p>&copy; 2024 LangBuddy. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
