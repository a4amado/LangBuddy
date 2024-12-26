import * as yup from "yup";
import { countryNames } from "~/data/countries";
import { languageNames } from "~/data/languages";

export const boardingSchema = yup.object().shape({
    mother: yup
        .string()
        .required("Mother language is required")
        .oneOf(languageNames, "Invalid language code selected"),
    other: yup
        .array()
        .of(
            yup
                .string()
                .oneOf(languageNames, "Invalid language code selected")
                .notOneOf([yup.ref("mother")]),
        )
        .nullable()

        .transform((value) => value || []) // Transform null/undefined to empty array
        .default([]),
    country: yup
        .string()
        .required("Country is required")
        .oneOf(countryNames, "Invalid country code selected"),
    bio: yup.string().required(),
    hobbies: yup.string().required(),
});
