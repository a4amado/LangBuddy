import { LogIn, Settings, Users, MessageSquare } from "lucide-react";

export function HowItWorks() {
    return (
        <div className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
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
    );
}
