"use client";

import { Input, Select, SelectProps, Button } from "antd";
import { useEffect, useState } from "react";
import { languageCodes, codeToLanguage, languageToCountry } from "~/data/languages";
import { api } from "~/trpc/react";
import { countryCodes, countryCodeToName } from "~/data/countries";
import { UserCircle, Globe, Languages, Heart } from "lucide-react";
import Flag from "react-world-flags";
import { useSession } from "next-auth/react";

const options = languageCodes.map((language: string) => ({
    label: (
        <div className="flex items-center space-x-2">
            <Flag code={languageToCountry[language]} style={{ width: 24, height: 16 }} />
            <span>{codeToLanguage[language] ?? ""}</span>
        </div>
    ),
    value: language,
}));

const countriesOptions: SelectProps["options"] = countryCodes.map((code: any) => ({
    label: (
        <div className="flex items-center space-x-2">
            <Flag code={code} style={{ width: 24, height: 16 }} />
            <span>{countryCodeToName[code] ?? ""}</span>
        </div>
    ),
    value: code,
}));

const hobbiesSuggestions = [
    "🎨 Art",
    "📚 Reading",
    "🎮 Gaming",
    "🎵 Music",
    "🏃‍♂️ Sports",
    "✈️ Travel",
    "📷 Photography",
    "🧘‍♀️ Yoga",
    "🎬 Movies",
    "👨‍🍳 Cooking",
];

export default function Onboarding() {
    const board = api.boarding.board.useMutation({
        onSuccess: () => location.replace("/"),
    });
    const session = useSession();
    useEffect(() => {
        if (session.status == "authenticated" && session.data.user.isBoarded) {
            location.replace("/");
        }
    }, [session]);
    const [mother, setMother] = useState("");
    const [country, setCountry] = useState("");
    const [other, setOther] = useState([]);
    const [bio, setBio] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [step, setStep] = useState(1);

    const isStepComplete = (stepNumber: number) => {
        switch (stepNumber) {
            case 1:
                return mother !== "" && country !== "";
            case 2:
                return bio.length >= 10;
            case 3:
                return hobbies !== "";
            default:
                return false;
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Languages className="w-5 h-5 mr-2 text-blue-500" />
                                    Mother Language 🌟
                                </label>
                                <Select
                                    value={mother}
                                    onChange={(value) => setMother(value)}
                                    className="max-w-full w-full"
                                    options={options}
                                    aria-required
                                    placeholder="What's your native language?"
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Languages className="w-5 h-5 mr-2 text-green-500" />
                                    Other Languages 🗣️
                                </label>
                                <Select
                                    mode="multiple"
                                    value={other}
                                    onChange={(value) => setOther(value)}
                                    className="max-w-full w-full"
                                    options={options}
                                    placeholder="Languages you also speak"
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Globe className="w-5 h-5 mr-2 text-purple-500" />
                                    Country 🌍
                                </label>
                                <Select
                                    value={country}
                                    onChange={(e) => setCountry(e)}
                                    className="max-w-full w-full"
                                    options={countriesOptions}
                                    aria-required
                                    placeholder="Where are you from?"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <UserCircle className="w-5 h-5 mr-2 text-orange-500" />
                            Tell us about yourself ✨
                        </label>
                        <Input.TextArea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Share a bit about yourself (minimum 10 characters)"
                            className="w-full"
                            rows={4}
                        />
                        <p className="text-sm text-gray-500">
                            {bio.length}/500 characters {bio.length < 10 && "(minimum 10 required)"}
                        </p>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <Heart className="w-5 h-5 mr-2 text-red-500" />
                            What are your hobbies? 🎯
                        </label>
                        <Input.TextArea
                            value={hobbies}
                            onChange={(e) => setHobbies(e.target.value)}
                            placeholder="Tell us what you love to do"
                            className="w-full"
                            rows={3}
                        />
                        <div className="flex flex-wrap gap-2">
                            {hobbiesSuggestions.map((hobby) => (
                                <button
                                    key={hobby}
                                    onClick={() =>
                                        setHobbies(hobbies ? `${hobbies}, ${hobby}` : hobby)
                                    }
                                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                    {hobby}
                                </button>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    const handleSubmit = () => {
        board.mutate({ mother, other, country, bio, hobbies });
    };

    return (
        <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
            <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg">
                <h1 className="text-3xl font-semibold text-center mb-2">Welcome! 👋</h1>
                <p className="text-center text-gray-600 mb-8">Let's get to know you better</p>

                {/* Progress indicator */}
                <div className="flex justify-between mb-8">
                    {[1, 2, 3].map((stepNumber) => (
                        <div
                            key={stepNumber}
                            className={`flex-1 h-2 mx-1 rounded ${
                                step >= stepNumber ? "bg-blue-500" : "bg-gray-200"
                            }`}
                        />
                    ))}
                </div>

                {renderStep()}

                <div className="mt-8 flex justify-between">
                    {step > 1 && (
                        <Button onClick={() => setStep(step - 1)} className="w-24">
                            Back
                        </Button>
                    )}
                    {step < 3 ? (
                        <Button
                            type="primary"
                            onClick={() => setStep(step + 1)}
                            disabled={!isStepComplete(step)}
                            className={`${step === 1 ? "w-full" : "w-24"}`}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            disabled={!isStepComplete(step)}
                            className="w-24"
                        >
                            Submit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
