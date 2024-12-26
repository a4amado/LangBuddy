import { GetStarted } from "../GetStarted";

export function CTASection() {
    return (
        <div className="py-24 bg-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-8">
                    Ready to Start Your Language Learning Journey?
                </h2>
                <GetStarted />
            </div>
        </div>
    );
}
