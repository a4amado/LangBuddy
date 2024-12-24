"use client";

import { useState } from "react";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./ChatState/store";
import PageWrapper from "../_components/page-wrapper";
import useProtected from "~/utils/useProtected";
import { Menu, X } from "lucide-react";
import { ChatSidebar } from "./ChatSidebar/ChatSidebar";

export default function ChatLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useProtected();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <PageWrapper>
            <Provider store={store}>
                 
                <div className="h-full flex relative">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
                        aria-label="Toggle menu"
                    >
                        {isSidebarOpen ? (
                            <X className="h-6 w-6 text-gray-600" />
                        ) : (
                            <Menu className="h-6 w-6 text-gray-600" />
                        )}
                    </button>

                    {/* Chat Sidebar */}
                    <div
                        className={`
                            fixed lg:static inset-0 z-40
                            w-80 bg-white border-r
                            transform transition-transform duration-300 ease-in-out
                            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                            lg:translate-x-0
                        `}
                    >
                        <div className="h-full overflow-y-auto pt-16 lg:pt-0">
                            <ChatSidebar />
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className="flex-1 h-full overflow-hidden">
                        {children}
                    </div>

                    {/* Overlay for mobile */}
                    {isSidebarOpen && (
                        <div
                            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}
                </div>
            </Provider>
        </PageWrapper>
    );
}
