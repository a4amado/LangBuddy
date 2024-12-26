import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">LangBuddy</h3>
                        <p className="text-gray-400">Connect with language learners worldwide</p>
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
    );
}