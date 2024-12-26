import { Languages, MessagesSquare } from "lucide-react";
import { GetStarted } from "../GetStarted";

export function Hero() {
    return (
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

                    <GetStarted />
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
                            Find language exchange partners, practice with native speakers, and make
                            friends from around the world.
                        </p>
                        <GetStarted />
                    </div>
                    <div className="flex justify-center">
                        <MessagesSquare className="h-64 w-64 text-blue-600" />
                    </div>
                </div>
            </div>
        </div>
    );
}
