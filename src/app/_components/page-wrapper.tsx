"use client";

import { PropsWithChildren, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Home, MessageCircle, Globe, LogOut, User, GlobeIcon } from "lucide-react";
import { Avatar, Button, Dropdown, Spin } from "antd";
import type { MenuProps } from "antd";

export default function PageWrapper({ children }: PropsWithChildren) {
    const { data: session, status } = useSession(); // Add status
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle loading state
    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Spin size="large" />
            </div>
        );
    }

    // // Handle unauthenticated state
    // if (status === "unauthenticated") {
    //     router.push("/auth/signin");
    //     return null;
    // }

    const navigationItems = [
        {
            key: "home",
            label: "Home",
            icon: <Home size={20} />,
            href: "/home",
        },
        {
            key: "chat",
            label: "Chat",
            icon: <MessageCircle size={20} />,
            href: "/chat",
        },
        {
            key: "explore",
            label: "Explore",
            icon: <GlobeIcon size={20} />,
            href: "/explore",
        },
    ];

    const profileMenuItems: MenuProps["items"] = [
        {
            key: "profile",
            label: "Profile",
            icon: <User size={16} />,
            onClick: () => router.push(`/profile/${session?.user.id}`),
        },
        {
            key: "logout",
            label: "Logout",
            icon: <LogOut size={16} />,
            onClick: () => router.push("/api/auth/signout"),
        },
    ];

    return (
        <div className="h-dvh flex-1 bg-gray-50 overflow-hidden">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 left-0 w-full z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/home" className="flex items-center">
                            <Globe className="h-8 w-8 text-primary" />
                            <span className="ml-2 text-xl font-bold text-gray-900">
                                LangExchange
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-4">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.label}</span>
                                </Link>
                            ))}
                        </nav>

                        {/* Profile and Mobile Menu Button */}
                        <div className="flex items-center">
                            {/* Profile Dropdown */}
                            <Dropdown
                                menu={{ items: profileMenuItems }}
                                placement="bottomRight"
                                trigger={["click"]}
                            >
                                <Button
                                    type="text"
                                    className="flex items-center ml-4"
                                    icon={
                                        <Avatar
                                            src={session?.user.image}
                                            alt={session?.user.name ?? ""}
                                            size="small"
                                        />
                                    }
                                />
                            </Dropdown>

                            {/* Mobile Menu Button */}
                            <button
                                type="button"
                                className="md:hidden ml-4 text-gray-500 hover:text-gray-600"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.icon}
                                    <span className="ml-2">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <div className="overflow-hidden h-[calc(100dvh-60px)] pb-5">{children}</div>
        </div>
    );
}
