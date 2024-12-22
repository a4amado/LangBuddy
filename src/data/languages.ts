// Array of language names (normalized)
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
    "Zulu",
] as const;

// Array of language codes
export const languageCodes: string[] = [
    "af",
    "sq",
    "am",
    "ar",
    "hy",
    "as",
    "ay",
    "az",
    "bm",
    "eu",
    "be",
    "bn",
    "bh",
    "bs",
    "bg",
    "ca",
    "ceb",
    "zh-CN",
    "zh-TW",
    "co",
    "hr",
    "cs",
    "da",
    "dv",
    "doi",
    "nl",
    "en",
    "eo",
    "et",
    "ee",
    "fil",
    "fi",
    "fr",
    "fy",
    "gl",
    "ka",
    "de",
    "el",
    "gn",
    "gu",
    "ht",
    "ha",
    "haw",
    "he",
    "hi",
    "hmn",
    "hu",
    "is",
    "ig",
    "ilo",
    "id",
    "ga",
    "it",
    "ja",
    "jv",
    "kn",
    "kk",
    "km",
    "rw",
    "kok",
    "ko",
    "kri",
    "ku",
    "ckb",
    "ky",
    "lo",
    "la",
    "lv",
    "ln",
    "lt",
    "lg",
    "lb",
    "mk",
    "mai",
    "mg",
    "ms",
    "ml",
    "mt",
    "mi",
    "mr",
    "mni",
    "lus",
    "mn",
    "my",
    "ne",
    "no",
    "ny",
    "or",
    "om",
    "ps",
    "fa",
    "pl",
    "pt",
    "pa",
    "qu",
    "ro",
    "ru",
    "sm",
    "sa",
    "gd",
    "nso",
    "sr",
    "st",
    "sn",
    "sd",
    "si",
    "sk",
    "sl",
    "so",
    "es",
    "su",
    "sw",
    "sv",
    "tg",
    "ta",
    "tt",
    "te",
    "th",
    "ti",
    "ts",
    "tr",
    "tk",
    "tw",
    "uk",
    "ur",
    "ug",
    "uz",
    "vi",
    "cy",
    "xh",
    "yi",
    "yo",
    "zu",
];

// Object mapping language codes to names
export const codeToLanguage:Record<string, string> = {
    af: "Afrikaans",
    sq: "Albanian",
    am: "Amharic",
    ar: "Arabic",
    hy: "Armenian",
    as: "Assamese",
    ay: "Aymara",
    az: "Azerbaijani",
    bm: "Bambara",
    eu: "Basque",
    be: "Belarusian",
    bn: "Bengali",
    bh: "Bhojpuri",
    bs: "Bosnian",
    bg: "Bulgarian",
    ca: "Catalan",
    ceb: "Cebuano",
    "zh-CN": "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    co: "Corsican",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    dv: "Dhivehi",
    doi: "Dogri",
    nl: "Dutch",
    en: "English",
    eo: "Esperanto",
    et: "Estonian",
    ee: "Ewe",
    fil: "Filipino",
    fi: "Finnish",
    fr: "French",
    fy: "Frisian",
    gl: "Galician",
    ka: "Georgian",
    de: "German",
    el: "Greek",
    gn: "Guarani",
    gu: "Gujarati",
    ht: "Haitian Creole",
    ha: "Hausa",
    haw: "Hawaiian",
    he: "Hebrew",
    hi: "Hindi",
    hmn: "Hmong",
    hu: "Hungarian",
    is: "Icelandic",
    ig: "Igbo",
    ilo: "Ilocano",
    id: "Indonesian",
    ga: "Irish",
    it: "Italian",
    ja: "Japanese",
    jv: "Javanese",
    kn: "Kannada",
    kk: "Kazakh",
    km: "Khmer",
    rw: "Kinyarwanda",
    kok: "Konkani",
    ko: "Korean",
    kri: "Krio",
    ku: "Kurdish (Kurmanji)",
    ckb: "Kurdish (Sorani)",
    ky: "Kyrgyz",
    lo: "Lao",
    la: "Latin",
    lv: "Latvian",
    ln: "Lingala",
    lt: "Lithuanian",
    lg: "Luganda",
    lb: "Luxembourgish",
    mk: "Macedonian",
    mai: "Maithili",
    mg: "Malagasy",
    ms: "Malay",
    ml: "Malayalam",
    mt: "Maltese",
    mi: "Maori",
    mr: "Marathi",
    mni: "Meiteilon (Manipuri)",
    lus: "Mizo",
    mn: "Mongolian",
    my: "Myanmar (Burmese)",
    ne: "Nepali",
    no: "Norwegian",
    ny: "Nyanja (Chichewa)",
    or: "Odia (Oriya)",
    om: "Oromo",
    ps: "Pashto",
    fa: "Persian",
    pl: "Polish",
    pt: "Portuguese",
    pa: "Punjabi",
    qu: "Quechua",
    ro: "Romanian",
    ru: "Russian",
    sm: "Samoan",
    sa: "Sanskrit",
    gd: "Scots Gaelic",
    nso: "Sepedi",
    sr: "Serbian",
    st: "Sesotho",
    sn: "Shona",
    sd: "Sindhi",
    si: "Sinhala",
    sk: "Slovak",
    sl: "Slovenian",
    so: "Somali",
    es: "Spanish",
    su: "Sundanese",
    sw: "Swahili",
    sv: "Swedish",
    tg: "Tajik",
    ta: "Tamil",
    tt: "Tatar",
    te: "Telugu",
    th: "Thai",
    ti: "Tigrinya",
    ts: "Tsonga",
    tr: "Turkish",
    tk: "Turkmen",
    tw: "Twi (Aka)",
    uk: "Ukrainian",
    ur: "Urdu",
    ug: "Uyghur",
    uz: "Uzbek",
    vi: "Vietnamese",
    cy: "Welsh",
    xh: "Xhosa",
    yi: "Yiddish",
    yo: "Yoruba",
    zu: "Zulu",
};

// Object mapping language names to codes
export const languageToCode:Record<string, string> = {
    Afrikaans: "af",
    Albanian: "sq",
    Amharic: "am",
    Arabic: "ar",
    Armenian: "hy",
    Assamese: "as",
    Aymara: "ay",
    Azerbaijani: "az",
    Bambara: "bm",
    Basque: "eu",
    Belarusian: "be",
    Bengali: "bn",
    Bhojpuri: "bh",
    Bosnian: "bs",
    Bulgarian: "bg",
    Catalan: "ca",
    Cebuano: "ceb",
    "Chinese (Simplified)": "zh-CN",
    "Chinese (Traditional)": "zh-TW",
    Corsican: "co",
    Croatian: "hr",
    Czech: "cs",
    Danish: "da",
    Dhivehi: "dv",
    Dogri: "doi",
    Dutch: "nl",
    English: "en",
    Esperanto: "eo",
    Estonian: "et",
    Ewe: "ee",
    Filipino: "fil",
    Finnish: "fi",
    French: "fr",
    Frisian: "fy",
    Galician: "gl",
    Georgian: "ka",
    German: "de",
    Greek: "el",
    Guarani: "gn",
    Gujarati: "gu",
    "Haitian Creole": "ht",
    Hausa: "ha",
    Hawaiian: "haw",
    Hebrew: "he",
    Hindi: "hi",
    Hmong: "hmn",
    Hungarian: "hu",
    Icelandic: "is",
    Igbo: "ig",
    Ilocano: "ilo",
    Indonesian: "id",
    Irish: "ga",
    Italian: "it",
    Japanese: "ja",
    Javanese: "jv",
    Kannada: "kn",
    Kazakh: "kk",
    Khmer: "km",
    Kinyarwanda: "rw",
    Konkani: "kok",
    Korean: "ko",
    Krio: "kri",
    "Kurdish (Kurmanji)": "ku",
    "Kurdish (Sorani)": "ckb",
    Kyrgyz: "ky",
    Lao: "lo",
    Latin: "la",
    Latvian: "lv",
    Lingala: "ln",
    Lithuanian: "lt",
    Luganda: "lg",
    Luxembourgish: "lb",
    Macedonian: "mk",
    Maithili: "mai",
    Malagasy: "mg",
    Malay: "ms",
    Malayalam: "ml",
    Maltese: "mt",
    Maori: "mi",
    Marathi: "mr",
    "Meiteilon (Manipuri)": "mni",
    Mizo: "lus",
    Mongolian: "mn",
    "Myanmar (Burmese)": "my",
    Nepali: "ne",
    Norwegian: "no",
    "Nyanja (Chichewa)": "ny",
    "Odia (Oriya)": "or",
    Oromo: "om",
    Pashto: "ps",
    Persian: "fa",
    Polish: "pl",
    Portuguese: "pt",
    Punjabi: "pa",
    Quechua: "qu",
    Romanian: "ro",
    Russian: "ru",
    Samoan: "sm",
    Sanskrit: "sa",
    "Scots Gaelic": "gd",
    Sepedi: "nso",
    Serbian: "sr",
    Sesotho: "st",
    Shona: "sn",
    Sindhi: "sd",
    Sinhala: "si",
    Slovak: "sk",
    Slovenian: "sl",
    Somali: "so",
    Spanish: "es",
    Sundanese: "su",
    Swahili: "sw",
    Swedish: "sv",
    Tajik: "tg",
    Tamil: "ta",
    Tatar: "tt",
    Telugu: "te",
    Thai: "th",
    Tigrinya: "ti",
    Tsonga: "ts",
    Turkish: "tr",
    Turkmen: "tk",
    "Twi (Aka)": "tw",
    Ukrainian: "uk",
    Urdu: "ur",
    Uyghur: "ug",
    Uzbek: "uz",
    Vietnamese: "vi",
    Welsh: "cy",
    Xhosa: "xh",
    Yiddish: "yi",
    Yoruba: "yo",
    Zulu: "zu",
};

export const languageToCountry: Record<string, string> = {
    af: "ZA", // South Africa
    sq: "AL", // Albania
    am: "ET", // Ethiopia
    ar: "SA", // Saudi Arabia
    hy: "AM", // Armenia
    as: "IN", // India
    ay: "BO", // Bolivia
    az: "AZ", // Azerbaijan
    bm: "ML", // Mali
    eu: "ES", // Spain (Basque Country)
    be: "BY", // Belarus
    bn: "BD", // Bangladesh
    bh: "IN", // India
    bs: "BA", // Bosnia and Herzegovina
    bg: "BG", // Bulgaria
    ca: "ES", // Spain (Catalonia)
    ceb: "PH", // Philippines
    "zh-CN": "CN", // China (Simplified)
    "zh-TW": "TW", // Taiwan
    co: "FR", // France (Corsica)
    hr: "HR", // Croatia
    cs: "CZ", // Czech Republic
    da: "DK", // Denmark
    dv: "MV", // Maldives
    doi: "IN", // India
    nl: "NL", // Netherlands
    en: "GB", // United Kingdom
    eo: "INT", // International (constructed language)
    et: "EE", // Estonia
    ee: "GH", // Ghana
    fil: "PH", // Philippines
    fi: "FI", // Finland
    fr: "FR", // France
    fy: "NL", // Netherlands (Friesland)
    gl: "ES", // Spain (Galicia)
    ka: "GE", // Georgia
    de: "DE", // Germany
    el: "GR", // Greece
    gn: "PY", // Paraguay
    gu: "IN", // India
    ht: "HT", // Haiti
    ha: "NG", // Nigeria
    haw: "US", // USA (Hawaii)
    he: "IL", // Israel
    hi: "IN", // India
    hmn: "CN", // China
    hu: "HU", // Hungary
    is: "IS", // Iceland
    ig: "NG", // Nigeria
    ilo: "PH", // Philippines
    id: "ID", // Indonesia
    ga: "IE", // Ireland
    it: "IT", // Italy
    ja: "JP", // Japan
    jv: "ID", // Indonesia
    kn: "IN", // India
    kk: "KZ", // Kazakhstan
    km: "KH", // Cambodia
    rw: "RW", // Rwanda
    kok: "IN", // India
    ko: "KR", // South Korea
    kri: "SL", // Sierra Leone
    ku: "TR", // Turkey
    ckb: "IQ", // Iraq
    ky: "KG", // Kyrgyzstan
    lo: "LA", // Laos
    la: "VA", // Vatican City
    lv: "LV", // Latvia
    ln: "CD", // Democratic Republic of the Congo
    lt: "LT", // Lithuania
    lg: "UG", // Uganda
    lb: "LU", // Luxembourg
    mk: "MK", // North Macedonia
    mai: "IN", // India
    mg: "MG", // Madagascar
    ms: "MY", // Malaysia
    ml: "IN", // India
    mt: "MT", // Malta
    mi: "NZ", // New Zealand
    mr: "IN", // India
    mni: "IN", // India
    lus: "IN", // India
    mn: "MN", // Mongolia
    my: "MM", // Myanmar
    ne: "NP", // Nepal
    no: "NO", // Norway
    ny: "MW", // Malawi
    or: "IN", // India
    om: "ET", // Ethiopia
    ps: "AF", // Afghanistan
    fa: "IR", // Iran
    pl: "PL", // Poland
    pt: "PT", // Portugal
    pa: "IN", // India
    qu: "PE", // Peru
    ro: "RO", // Romania
    ru: "RU", // Russia
    sm: "WS", // Samoa
    sa: "IN", // India
    gd: "GB", // United Kingdom (Scotland)
    nso: "ZA", // South Africa
    sr: "RS", // Serbia
    st: "LS", // Lesotho
    sn: "ZW", // Zimbabwe
    sd: "PK", // Pakistan
    si: "LK", // Sri Lanka
    sk: "SK", // Slovakia
    sl: "SI", // Slovenia
    so: "SO", // Somalia
    es: "ES", // Spain
    su: "ID", // Indonesia
    sw: "TZ", // Tanzania
    sv: "SE", // Sweden
    tg: "TJ", // Tajikistan
    ta: "IN", // India
    tt: "RU", // Russia
    te: "IN", // India
    th: "TH", // Thailand
    ti: "ET", // Ethiopia
    ts: "ZA", // South Africa
    tr: "TR", // Turkey
    tk: "TM", // Turkmenistan
    tw: "GH", // Ghana
    uk: "UA", // Ukraine
    ur: "PK", // Pakistan
    ug: "CN", // China
    uz: "UZ", // Uzbekistan
    vi: "VN", // Vietnam
    cy: "GB", // United Kingdom (Wales)
    xh: "ZA", // South Africa
    yi: "IL", // Israel
    yo: "NG", // Nigeria
    zu: "ZA", // South Africa
};
