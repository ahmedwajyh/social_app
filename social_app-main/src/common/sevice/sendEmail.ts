import { randomInt } from "node:crypto";
import nodemailer from "nodemailer";
import { EMAIL_PASS } from "../../config/config.service.js";

interface IEmailOptions {
    to: string;
    subject: string;
    html?: string;
    attachments?: any[];
}

class EmailService {

    private transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: "ahmedwajyh1234@gmail.com",
            pass: EMAIL_PASS
        }
    });

    sendEmail = async ({
        to,
        subject,
        html = "",
        attachments = []
    }: IEmailOptions) => {

        const info = await this.transporter.sendMail({
            from: '"confirm appliction ahmed" <ahmedwajyh1234@gmail.com>',
            to,
            subject,
            html,
            attachments
        });

        console.log(info.messageId);

        return info;
    };
}

class OTPService {

    generateOTP = (): string => {
        return randomInt(100000, 1000000).toString();
    };

}

export const emailService = new EmailService();
export const otpService = new OTPService();