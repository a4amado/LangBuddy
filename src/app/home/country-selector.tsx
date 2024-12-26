import React from "react";
import { Globe2 } from "lucide-react";
import { Select } from "antd";
import Flag from "react-world-flags";
import { countryNames, countryNameToCode } from "~/data/countries";

const CountrySelector = ({
    selectedCountry,
    setSelectedCountry,
}: {
    selectedCountry: string;
    setSelectedCountry: (lang: string) => void;
}) => {
    function handleSelectCountry(country: string) {
        setSelectedCountry(country);
    }
    return (
        <Select
            placeholder={
                <div className="flex items-center">
                    <Globe2 className="mr-2" size={20} />
                    <span>Select Country</span>
                </div>
            }
            value={selectedCountry}
            onChange={handleSelectCountry}
            onSelect={handleSelectCountry}
            className="w-full"
            allowClear
            showSearch
            options={countryNames.map((countryName) => ({
                label: (
                    <div className="flex items-center">
                        <Flag className="w-4 mx-1" code={countryNameToCode[countryName] ?? ""} />
                        <span>{countryName}</span>
                    </div>
                ),
                value: countryName,
            }))}
        />
    );
};

export default CountrySelector;
