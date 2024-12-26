import React from "react";
import { Languages } from "lucide-react";
import Flag from "react-world-flags";

import { Select } from "antd";
import { languageNames } from "~/data/languages";

const LanguageSelector = ({
    selectedLanguages,
    setSelectedLanguages,
}: {
    selectedLanguages: string;
    setSelectedLanguages: (lang: string) => void;
}) => {
    const handleChange = (value: string) => {
        setSelectedLanguages(value);
    };

    return (
        <div>
            <Select
                placeholder={
                    <div className="flex items-center">
                        <Languages className="mr-2" size={20} />
                        <span>Select Languages</span>
                    </div>
                }
                value={selectedLanguages}
                onChange={handleChange}
                onSelect={handleChange}
                showSearch
                className="w-full"
                options={languageNames?.map((language) => ({
                    label: (
                        <div className="flex items-center">
                            <Flag className="w-4 mx-1" code={language ?? ""} />
                            <span>{language}</span>
                        </div>
                    ),
                    value: language,
                }))}
            />
        </div>
    );
};

export default LanguageSelector;
