import { Users, MessageCircle, Globe } from "lucide-react";

export function Features() {
    return (
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
    );
}
