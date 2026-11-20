import express from "express";
import AuthService from "./auth.service.js";
import { responseFormatter } from "../../middleware/response.middleware.js";
import { Validation } from "../../middleware/validation.middleware.js";
import { signupSchema, verifyOtpSchema } from "./auth.validation.js";

const router = express.Router({
    strict: true,
    mergeParams: true,
    caseSensitive: true
});

// Signup
router.post(
    "/signup",
    Validation(signupSchema),
    responseFormatter(
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            const data = await AuthService.signup(req.body);

            return {
                status: 201,
                message: true,
                data,
                extra: "user signup successfully"
            };
        }
    )
);

// Verify Email
router.get(
    "/verify-email",
    Validation(verifyOtpSchema),
    responseFormatter(
        async (
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            const { email, otp } = req.body;

            const data = await AuthService.verifyEmail(email, otp);

            return {
                status: 200,
                message: true,
                data,
                extra: "email verified successfully"
            };
        }
    )
);

export default router;