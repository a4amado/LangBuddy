export const languageNames: string[] = [
    "Afrikaans",
    "Albanian",
    "Amharic",
    "Arabic",
    "Armenian",
    "Assamese",
    "Aymara",
    "Azerbaijani",
    "Bambara",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bhojpuri",
    "Bosnian",
    "Bulgarian",
    "Catalan",
    "Cebuano",
    "Chinese (Simplified)",
    "Chinese (Traditional)",
    "Corsican",
    "Croatian",
    "Czech",
    "Danish",
    "Dhivehi",
    "Dogri",
    "Dutch",
    "English",
    "Esperanto",
    "Estonian",
    "Ewe",
    "Filipino",
    "Finnish",
    "French",
    "Frisian",
    "Galician",
    "Georgian",
    "German",
    "Greek",
    "Guarani",
    "Gujarati",
    "Haitian Creole",
    "Hausa",
    "Hawaiian",
    "Hebrew",
    "Hindi",
    "Hmong",
    "Hungarian",
    "Icelandic",
    "Igbo",
    "Ilocano",
    "Indonesian",
    "Irish",
    "Italian",
    "Japanese",
    "Javanese",
    "Kannada",
    "Kazakh",
    "Khmer",
    "Kinyarwanda",
    "Konkani",
    "Korean",
    "Krio",
    "Kurdish (Kurmanji)",
    "Kurdish (Sorani)",
    "Kyrgyz",
    "Lao",
    "Latin",
    "Latvian",
    "Lingala",
    "Lithuanian",
    "Luganda",
    "Luxembourgish",
    "Macedonian",
    "Maithili",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Maori",
    "Marathi",
    "Meiteilon (Manipuri)",
    "Mizo",
    "Mongolian",
    "Myanmar (Burmese)",
    "Nepali",
    "Norwegian",
    "Nyanja (Chichewa)",
    "Odia (Oriya)",
    "Oromo",
    "Pashto",
    "Persian",
    "Polish",
    "Portuguese",
    "Punjabi",
    "Quechua",
    "Romanian",
    "Russian",
    "Samoan",
    "Sanskrit",
    "Scots Gaelic",
    "Sepedi",
    "Serbian",
    "Sesotho",
    "Shona",
    "Sindhi",
    "Sinhala",
    "Slovak",
    "Slovenian",
    "Somali",
    "Spanish",
    "Sundanese",
    "Swahili",
    "Swedish",
    "Tajik",
    "Tamil",
    "Tatar",
    "Telugu",
    "Thai",
    "Tigrinya",
    "Tsonga",
    "Turkish",
    "Turkmen",
    "Twi (Aka)",
    "Ukrainian",
    "Urdu",
    "Uyghur",
    "Uzbek",
    "Vietnamese",
    "Welsh",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zulu"
] as const;

export const languageToCode: Record<string, string> = {
    "Afrikaans": "af",
    "Albanian": "sq",
    "Amharic": "am",
    "Arabic": "ar",
    "Armenian": "hy",
    "Assamese": "as",
    "Aymara": "ay",
    "Azerbaijani": "az",
    "Bambara": "bm",
    "Basque": "eu",
    "Belarusian": "be",
    "Bengali": "bn",
    "Bhojpuri": "bh",
    "Bosnian": "bs",
    "Bulgarian": "bg",
    "Catalan": "ca",
    "Cebuano": "ceb",
    "Chinese (Simplified)": "zh-CN",
    "Chinese (Traditional)": "zh-TW",
    "Corsican": "co",
    "Croatian": "hr",
    "Czech": "cs",
    "Danish": "da",
    "Dhivehi": "dv",
    "Dogri": "doi",
    "Dutch": "nl",
    "English": "en",
    "Esperanto": "eo",
    "Estonian": "et",
    "Ewe": "ee",
    "Filipino": "fil",
    "Finnish": "fi",
    "French": "fr",
    "Frisian": "fy",
    "Galician": "gl",
    "Georgian": "ka",
    "German": "de",
    "Greek": "el",
    "Guarani": "gn",
    "Gujarati": "gu",
    "Haitian Creole": "ht",
    "Hausa": "ha",
    "Hawaiian": "haw",
    "Hebrew": "he",
    "Hindi": "hi",
    "Hmong": "hmn",
    "Hungarian": "hu",
    "Icelandic": "is",
    "Igbo": "ig",
    "Ilocano": "ilo",
    "Indonesian": "id",
    "Irish": "ga",
    "Italian": "it",
    "Japanese": "ja",
    "Javanese": "jv",
    "Kannada": "kn",
    "Kazakh": "kk",
    "Khmer": "km",
    "Kinyarwanda": "rw",
    "Konkani": "kok",
    "Korean": "ko",
    "Krio": "kri",
    "Kurdish (Kurmanji)": "ku",
    "Kurdish (Sorani)": "ckb",
    "Kyrgyz": "ky",
    "Lao": "lo",
    "Latin": "la",
    "Latvian": "lv",
    "Lingala": "ln",
    "Lithuanian": "lt",
    "Luganda": "lg",
    "Luxembourgish": "lb",
    "Macedonian": "mk",
    "Maithili": "mai",
    "Malagasy": "mg",
    "Malay": "ms",
    "Malayalam": "ml",
    "Maltese": "mt",
    "Maori": "mi",
    "Marathi": "mr",
    "Meiteilon (Manipuri)": "mni",
    "Mizo": "lus",
    "Mongolian": "mn",
    "Myanmar (Burmese)": "my",
    "Nepali": "ne",
    "Norwegian": "no",
    "Nyanja (Chichewa)": "ny",
    "Odia (Oriya)": "or",
    "Oromo": "om",
    "Pashto": "ps",
    "Persian": "fa",
    "Polish": "pl",
    "Portuguese": "pt",
    "Punjabi": "pa",
    "Quechua": "qu",
    "Romanian": "ro",
    "Russian": "ru",
    "Samoan": "sm",
    "Sanskrit": "sa",
    "Scots Gaelic": "gd",
    "Sepedi": "nso",
    "Serbian": "sr",
    "Sesotho": "st",
    "Shona": "sn",
    "Sindhi": "sd",
    "Sinhala": "si",
    "Slovak": "sk",
    "Slovenian": "sl",
    "Somali": "so",
    "Spanish": "es",
    "Sundanese": "su",
    "Swahili": "sw",
    "Swedish": "sv",
    "Tajik": "tg",
    "Tamil": "ta",
    "Tatar": "tt",
    "Telugu": "te",
    "Thai": "th",
    "Tigrinya": "ti",
    "Tsonga": "ts",
    "Turkish": "tr",
    "Turkmen": "tk",
    "Twi (Aka)": "tw",
    "Ukrainian": "uk",
    "Urdu": "ur",
    "Uyghur": "ug",
    "Uzbek": "uz",
    "Vietnamese": "vi",
    "Welsh": "cy",
    "Xhosa": "xh",
    "Yiddish": "yi",
    "Yoruba": "yo",
    "Zulu": "zu"
};

export const languageCodeToCountryCode: Record<string, string> = {
    "af": "ZA",
    "sq": "AL",
    "am": "ET",
    "ar": "SA",
    "hy": "AM",
    "as": "IN",
    "ay": "BO",
    "az": "AZ",
    "bm": "ML",
    "eu": "ES",
    "be": "BY",
    "bn": "BD",
    "bh": "IN",
    "bs": "BA",
    "bg": "BG",
    "ca": "ES",
    "ceb": "PH",
    "zh-CN": "CN",
    "zh-TW": "TW",
    "co": "FR",
    "hr": "HR",
    "cs": "CZ",
    "da": "DK",
    "dv": "MV",
    "doi": "IN",
    "nl": "NL",
    "en": "GB",
    "eo": "INT",
    "et": "EE",
    "ee": "GH",
    "fil": "PH",
    "fi": "FI",
    "fr": "FR",
    "fy": "NL",
    "gl": "ES",
    "ka": "GE",
    "de": "DE",
    "el": "GR",
    "gn": "PY",
    "gu": "IN",
    "ht": "HT",
    "ha": "NG",
    "haw": "US",
    "he": "IL",
    "hi": "IN",
    "hmn": "CN",
    "hu": "HU",
    "is": "IS",
    "ig": "NG",
    "ilo": "PH",
    "id": "ID",
    "ga": "IE",
    "it": "IT",
    "ja": "JP",
    "jv": "ID",
    "kn": "IN",
    "kk": "KZ",
    "km": "KH",
    "rw": "RW",
    "kok": "IN",
    "ko": "KR",
    "kri": "SL",
    "ku": "TR",
    "ckb": "IQ",
    "ky": "KG",
    "lo": "LA",
    "la": "VA",
    "lv": "LV",
    "ln": "CD",
    "lt": "LT",
    "lg": "UG",
    "lb": "LU",
    "mk": "MK",
    "mai": "IN",
    "mg": "MG",
    "ms": "MY",
    "ml": "IN",
    "mt": "MT",
    "mi": "NZ",
    "mr": "IN",
    "mni": "IN",
    "lus": "IN",
    "mn": "MN",
    "my": "MM",
    "ne": "NP",
    "no": "NO",
    "ny": "MW",
    "or": "IN",
    "om": "ET",
    "ps": "AF",
    "fa": "IR",
    "pl": "PL",
    "pt": "PT",
    "pa": "IN",
    "qu": "PE",
    "ro": "RO",
    "ru": "RU",
    "sm": "WS",
    "sa": "IN",
    "gd": "GB",
    "nso": "ZA",
    "sr": "RS",
    "st": "LS",
    "sn": "ZW",
    "sd": "PK",
    "si": "LK",
    "sk": "SK",
    "sl": "SI",
    "so": "SO",
    "es": "ES",
    "su": "ID",
    "sw": "TZ",
    "sv": "SE",
    "tg": "TJ",
    "ta": "IN",
    "tt": "RU",
    "te": "IN",
    "th": "TH",
    "ti": "ET",
    "ts": "ZA",
    "tr": "TR",
    "tk": "TM",
    "tw": "GH",
    "uk": "UA",
    "ur": "PK",
    "ug": "CN",
    "uz": "UZ",
    "vi": "VN",
    "cy": "GB",
    "xh": "ZA",
    "yi": "IL",
    "yo": "NG",
    "zu": "ZA"
};

