"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { Search, Globe2, Languages, Users2, MessageCircle, Filter } from "lucide-react";
import { Avatar, Button, Input, Select, Spin } from "antd";
import Link from "next/link";
import Flag from "react-world-flags";
import { useRouter } from "next/navigation";
import PageWrapper from "../_components/page-wrapper";
import { useProtected } from "~/hooks/useProtected";
import LanguageSelector from "./language-selector";
import CountrySelector from "./country-selector";
import ReactTimeAgo from "react-time-ago";

export default function HomePage() {
    useProtected();
    const { data: session } = useSession();
    const router = useRouter();

    // State management
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguages, setSelectedLanguages] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Fetch user languages for the filter

    // Search users query
    const {
        data: searchResults,
        isLoading: isLoadingSearch,
        refetch,
    } = api.user.search.useQuery({
        languages: selectedLanguages,
        query: selectedCountry,
    });
    useEffect(() => {
        refetch();
    }, [selectedCountry, selectedLanguages]);

    // Create chat mutation
    const { mutate: createChat } = api.chat.create.useMutation({
        onSuccess: (data) => {
            router.push(`/chat?id=${data.id}`);
        },
    });

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Determine which users to display
    const displayUsers = searchResults ?? [];
    const isLoading = isLoadingSearch;

    const handleStartChat = (userId: string) => {
        if (!session) {
            router.push("/api/auth/signin");
            return;
        }
        createChat({ userId });
    };

    return (
        <PageWrapper>
            <div className="max-w-7xl h-full overflow-y-auto mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div>
                            <Input
                                prefix={<Search className="text-gray-400" size={20} />}
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <LanguageSelector
                            selectedLanguages={selectedLanguages}
                            setSelectedLanguages={setSelectedLanguages}
                        />
                        <CountrySelector
                            selectedCountry={selectedCountry}
                            setSelectedCountry={setSelectedCountry}
                        />
                        {/* Clear Filters */}
                        <div>
                            <Button
                                icon={<Filter size={20} />}
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedLanguages("");
                                    setSelectedCountry("");
                                }}
                                className="w-full"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </div>
                </div>

                {/* User List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        <div className="col-span-full flex justify-center py-12">
                            <Spin size="large" />
                        </div>
                    ) : displayUsers.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <Users2 className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-semibold text-gray-900">
                                No users found
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Try adjusting your search filters
                            </p>
                        </div>
                    ) : (
                        (searchResults || []).map((user) => (
                            <div
                                key={user.id}
                                className="bg-white rounded-lg shadow p-6 flex flex-col"
                            >
                                <div className="flex items-center mb-4">
                                    <Avatar
                                        src={user.image}
                                        alt={user.name ?? ""}
                                        size={64}
                                        className="mr-4"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold">{user.name}</h3>
                                        <p className="text-sm text-gray-500">{user.country}</p>
                                    </div>
                                </div>

                                {/* Languages */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                        Languages
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {user.languages?.map((lang) => (
                                            <span
                                                key={lang.language || ""}
                                                className={`px-2 py-1 rounded text-xs ${
                                                    lang.rank === "MOTHER"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-blue-100 text-blue-800"
                                                }`}
                                            >
                                                {lang.language} (
                                                {lang.rank == "MOTHER" ? "Native" : "2nd Langauge"})
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Bio */}
                                {user.profile?.bio && (
                                    <p className="text-sm text-gray-600 mb-4">{user.profile.bio}</p>
                                )}

                                {/* Action Buttons */}
                                <div className="mt-auto flex gap-2">
                                    <Button
                                        type="primary"
                                        icon={<MessageCircle size={20} />}
                                        onClick={() => handleStartChat(user.id)}
                                        className="flex-1"
                                    >
                                        Start Chat
                                    </Button>
                                    <Link href={`/profile/${user.id}`} passHref>
                                        <Button className="flex-1">View Profile</Button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </PageWrapper>
    );
}
