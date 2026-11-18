
import { GenderEnum, RoleEnum } from "./enum/user.enum.js";
import { z } from "zod";
import { Types } from "mongoose";


const ALLOWED_EMAIL_DOMAINS = new Set([
    "gmail.com",
    "outlook.com",
    "hotmail.com",
    "live.com",
    "yahoo.com",
    "icloud.com",
    "proton.me",
    "protonmail.com",
]);

export const generalRules = {
    email: z
        .string()
        .trim()
        .toLowerCase()
        .max(254, "Email cannot exceed 254 characters.")
        .email("Enter a valid email address.")
        .refine(
            (value) => {
                const domain = value.split("@").pop();
                return domain ? ALLOWED_EMAIL_DOMAINS.has(domain) : false;
            },
            {
                message: "Use an email from Gmail, Outlook, Hotmail, Yahoo, iCloud or Proton.",
            }
        ),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters long.")
        .max(128, "Password cannot exceed 128 characters.")
        .regex(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                "Password must contain uppercase, lowercase, number, and special character"
            ),

    file: z.object({
        fieldname: z.string({ message: "File field name is required." }),
        originalname: z.string({ message: "Original file name is required." }),
        encoding: z.string({ message: "File encoding is required." }),
        mimetype: z.string({ message: "File type is required." }),
        path: z.string().optional(),
        destination: z.string().optional(),
        filename: z.string().optional(),
        buffer: z.instanceof(Buffer).optional(),
        finalPath: z.string({ message: "Final file path is required." }),
        size: z
            .number({ message: "File size must be a number." })
            .positive("File must not be empty."),
    }),

    age: z
        .number({ message: "Age must be a number." })
        .int("Age must be a whole number.")
        .min(20, "Age must be at least 20.")
        .max(80, "Age cannot be greater than 80."),

    phone: z
        .string()
        .regex(/^\d{11}$/, "Phone number must contain exactly 11 digits."),

    gender: z.enum(GenderEnum),

    role: z.enum(RoleEnum),

    fName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters long.")
        .max(30, "First name cannot exceed 30 characters."),

    lName: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters long.")
        .max(30, "Last name cannot exceed 30 characters."),

    DOB: z.preprocess(
        (arg) => {
            if (typeof arg === "string" || arg instanceof Date) {
                return new Date(arg);
            }
            return arg;
        },
        z.date().refine(
            (date) => date <= new Date(),
            "Date of birth cannot be in the future."
        )
    ),

    token: z.object({
        authorization: z.string().min(1, "Authorization header is required."),
        "postman-token": z.string().optional(),
        "content-length": z.string().optional(),
        host: z.string().optional(),
        "user-agent": z.string().optional(),
        accept: z.string().optional(),
        connection: z.string().optional(),
        "accept-encoding": z.string().optional(),
    }),

    id: z
        .string()
        .min(1, "ID is required.")
        .refine((value) => Types.ObjectId.isValid(value), {
            message: "Enter a valid ID.",
        }),

    userName: z
        .string()
        .min(5, "Full name must be at least 5 characters long.")
        .max(80, "Full name cannot exceed 80 characters."),
};