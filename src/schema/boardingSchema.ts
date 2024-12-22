

import * as yup from "yup";
import { countryCodes } from "~/data/countries";
import { languageCodes } from "~/data/languages";

export const boardingSchema = yup.object().shape({
    mother: yup
        .string()
        .required("Mother language is required")
        .oneOf(languageCodes, "Invalid language code selected"),
    other: yup
        .array()
        .of(
            yup
                .string()
                .oneOf(languageCodes, "Invalid language code selected")
                .notOneOf([yup.ref("mother")]),
        )
        .nullable()
        
        .transform((value) => value || []) // Transform null/undefined to empty array
        .default([]),
    country: yup
        .string()
        .required("Country is required")
        .oneOf(countryCodes, "Invalid country code selected"),
    bio: yup.string().required(),
    hobbies: yup.string().required(),
});
