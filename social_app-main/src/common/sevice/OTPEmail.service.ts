
import { emailService, otpService } from "./sendEmail.js";
import { emailTemplate } from "./styleOTP.js";
import redisService from "../../DB/connection.redis.js";

export class OTPEmailService {

    sendOTP = async (email: string, name: string) => {

        // 1- Generate OTP
        const otp = otpService.generateOTP();

        // 2- Store OTP in Redis
        await redisService.setValue({
            key: `otp::${email}`,
            value: otp,
            ttl: 120
        });

        // 3- Generate Email Template
        const html = emailTemplate.generateTemplate({
            name,
            title: "Verify Your Email",
            subtitle: "Email Verification",
            message: "Use the code below to verify your email address.",
            otp,
            otpExpiry: "2 minutes"
        });

        // 4- Send Email
        try {

            await emailService.sendEmail({
                to: email,
                subject: "Email Verification OTP",
                html
            });

            return true;

        } catch (error) {

            await redisService.deleteKey(`otp::${email}`);

            throw error;
        }
    };

    // Verify OTP
    verifyOTP = async (email: string, otp: string): Promise<boolean> => {

        // 1- Get OTP from Redis
        const savedOTP = await redisService.getValue(`otp::${email}`);

        // 2- Check OTP
        if (savedOTP === null || String(savedOTP) !== otp) {
            return false;
        }

        // 3- Delete OTP after successful verification
        await redisService.deleteKey(`otp::${email}`);

        return true;
    };
}

export const otpEmailService = new OTPEmailService();
