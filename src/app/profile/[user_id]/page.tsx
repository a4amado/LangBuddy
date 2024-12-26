"use server";

import React from "react";
import { Globe, Languages, Book, Heart, LoaderCircle } from "lucide-react";

import { NextPageContext } from "next";
import { db } from "~/server/db";
import Flag from "react-world-flags";

import { redirect } from "next/navigation";

import dynamic from "next/dynamic";
import PageWrapper from "~/app/_components/page-wrapper";
import { languageCodeToCountryCode, languageToCode } from "~/data/languages";

// import Post from "~/app/_components/post/Post";

const DynamicHeader = dynamic(() => import("../../_components/start-chat"), {
    loading: () => <p>Loading...</p>,
});

// Correct way to declare a Server Component with params in App Router
export default async function ProfilePage({ params }: { params: Promise<{ user_id: string }> }) {
    // Now we can safely access params.user_id
    const user_id = (await params).user_id;
    const user = await db.user.findUnique({
        where: { id: user_id },
        include: {
            profile: true,
            languages: true,
            posts: {
                orderBy: { createdAt: "desc" },
                take: 10,
                include: {
                    createdBy: {
                        select: {
                            image: true,
                            name: true,
                            id: true,
                        },
                    },
                },
            },
        },
    });
    if (!user || !user.isBoarded) {
        redirect("/");
    }
    const native = user?.languages.find((e) => e.rank == "MOTHER")?.language;

    return (
        <PageWrapper>
            <div className="h-full overflow-x-auto bg-gray-100 p-4 md:p-8">
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="relative">
                        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                            <img
                                src={user?.image?.replace("s96-c", "s384-c") ?? ""}
                                alt={user?.name ?? ""}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="pt-20 px-4 md:px-8 pb-8">
                        {/* Name and Username */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
                            <DynamicHeader user_id={user_id} />
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <Globe className="w-5 h-5 text-blue-500 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">From: 📍</p>
                                    <p className="flex font-medium">
                                        <Flag
                                            code={user?.country ?? ""}
                                            width={30}
                                            className="m-2"
                                        />
                                        {user.country}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <Languages className="w-5 h-5 text-blue-500 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Native Language</p>
                                    <p className="font-medium">{native}</p>
                                </div>
                            </div>
                        </div>

                        {/* Learning Languages */}
                        <div className="mb-8">
                            <div className="flex items-center mb-4">
                                <Book className="w-5 h-5 text-blue-500 mr-2" />
                                <h2 className="text-lg font-semibold">Learning</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {user?.languages
                                    .filter((e) => e.rank != "MOTHER")
                                    .map((lang) => (
                                        <span
                                            key={lang.language}
                                            className=" flex px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                                        >
                                            {" "}
                                            <Flag
                                                code={languageCodeToCountryCode[languageToCode[lang.language ?? ""] ?? ""]}
                                                width={20}
                                                className="m-1"
                                            />{" "}
                                            {lang.language} (
                                            {
                                                languageCodeToCountryCode[languageToCode[lang.language ?? ""] ?? ""]
                                            }
                                            )
                                        </span>
                                    ))}
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4">Bio</h2>
                            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                                {user?.profile?.bio}
                            </p>
                        </div>

                        {/* Hobbies */}
                        <div>
                            <div className="flex items-center mb-4">
                                <Heart className="w-5 h-5 text-blue-500 mr-2" />
                                <h2 className="text-lg font-semibold">Hobbies</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {user?.profile?.hobbies.split(",").map((hobby) => (
                                    <span
                                        key={hobby}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                    >
                                        {hobby}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4">Latest Posts:</h2>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
