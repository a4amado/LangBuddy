"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { Search, Globe2, Languages, Users2, MessageCircle, Filter } from "lucide-react";
import { Avatar, Button, Input, Select, Spin } from "antd";
import Link from "next/link";
import { Router } from "next/router";
import { codeToLanguage, languageToCountry } from "~/data/languages";
import { countryCodes, countryCodeToName } from "~/data/countries";
import Flag from "react-world-flags";
import { useRouter } from "next/navigation";
import PageWrapper from "../_components/page-wrapper";

export default function HomePage() {
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguages, setSelectedLanguages] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string>("");

    // Get current user's languages
    const { data: currentUser } = api.user.me.useQuery();

    // Get all available languages
    const { data: languages } = api.language.getAllLanguages.useQuery();

    // Get recommended partners based on language matching
    const { data: recommendedUsers, isLoading: isLoadingRecommended } =
        api.language.getRecommendedPartners.useQuery({
            take: 20,
            skip: 0,
        });

    // Search users with filters
    const { data: searchResults, isLoading: isLoadingSearch } = api.user.search.useQuery(
        {
            query: searchQuery,
            languages: selectedLanguages,
            take: 20,
            skip: 0,
        },
        {
            enabled: searchQuery.length > 0 || selectedLanguages.length > 0 || !!selectedCountry,
        },
    );
    const router = useRouter();
    // Create chat mutation
    const { mutate: createChat } = api.chat.createChat.useMutation({
        onSuccess(data) {
            router.push(`/chat?id=${data.chat_id}`);
        },
    });

    const handleStartChat = (userId: string) => {
        createChat({ userId });
    };

    const displayUsers =
        searchQuery || selectedLanguages.length > 0 || selectedCountry
            ? searchResults
            : recommendedUsers;

    return (
        <PageWrapper>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Find Language Partners</h1>
                        <p className="mt-2 text-gray-600">
                            Connect with native speakers and language learners worldwide
                        </p>
                    </div>

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

                            {/* Language Filter */}
                            <div>
                                <Select
                                    placeholder={
                                        <div className="flex items-center">
                                            <Languages className="mr-2" size={20} />
                                            Select Languages
                                        </div>
                                    }
                                    value={selectedLanguages}
                                    onChange={setSelectedLanguages}
                                    className="w-full"
                                    options={languages?.map((lang) => ({
                                        label: (
                                            <div className="flex">
                                                <Flag
                                                    className="w-4  mx-1"
                                                    code={languageToCountry[lang.language]}
                                                />

                                                {codeToLanguage[lang.language]}
                                            </div>
                                        ),
                                        value: lang.language,
                                    }))}
                                />
                            </div>

                            {/* Country Filter */}
                            <div>
                                <Select
                                    placeholder={
                                        <div className="flex items-center">
                                            <Globe2 className="mr-2" size={20} />
                                            Select Country
                                        </div>
                                    }
                                    value={selectedCountry}
                                    onChange={setSelectedCountry}
                                    className="w-full"
                                    allowClear
                                    options={countryCodes.map((code) => ({
                                        label: (
                                            <div className="flex">
                                                <Flag className="w-4  mx-1" code={code} />
                                                <span>{countryCodeToName[code]}</span>
                                            </div>
                                        ),
                                        value: code,
                                    }))}
                                />
                            </div>

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
                        {isLoadingRecommended || isLoadingSearch ? (
                            <div className="col-span-full flex justify-center py-12">
                                <Spin size="large" />
                            </div>
                        ) : displayUsers?.length === 0 ? (
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
                            displayUsers?.map((user) => (
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
                                            {user.UsersLanguage?.map((lang) => (
                                                <span
                                                    key={lang.id}
                                                    className={`px-2 py-1 rounded text-xs ${
                                                        lang.rank === "mother"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-blue-100 text-blue-800"
                                                    }`}
                                                >
                                                    {lang.language} ({lang.rank})
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    {user.Profile?.bio && (
                                        <p className="text-sm text-gray-600 mb-4">
                                            {user.Profile.bio}
                                        </p>
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
