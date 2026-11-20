import * as zod from "zod";
import { generalRules } from "../../common/utils/generelRules.js";

export const signupSchema = {
    body: zod.object({
        fName: generalRules.fName,
        lName: generalRules.lName,
        email: generalRules.email,
        age: generalRules.age.optional(),
        gender: generalRules.gender.optional(),
        password: generalRules.password,
        cpassword: generalRules.password,
        phone: generalRules.phone.optional()
    })

    .superRefine((val, ctx) => {
        if (val.password !== val.cpassword) {
            ctx.addIssue({
                code: "custom",
                message: "password and confirm password must be the same",
                origin: ["cpassword"]
            });
        }
    })
};

export const verifyOtpSchema = {
    body: zod.object({
        email: generalRules.email,
        otp: zod.string()
            .length(6, "OTP must be 6 digits")
            .regex(/^[0-9]{6}$/, "OTP must contain only numbers")
    })
};