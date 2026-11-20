
interface IEmailTemplateOptions {
    name: string;
    title: string;
    subtitle: string;
    message: string;
    otp: string;
    otpExpiry?: string;
}

class EmailTemplate {

    private escapeHtml(value: string): string {
        const entities: { [key: string]: string } = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return value.replace(/[&<>"']/g, function (match: string): string {
            return entities[match] || match;
        });
    }

    generateTemplate({
        name,
        title,
        subtitle,
        message,
        otp,
        otpExpiry = "2 minutes"
    }: IEmailTemplateOptions): string {

        return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>

        <body style="
            margin: 0;
            padding: 30px 10px;
            background-color: #080D1A;
            font-family: Arial, sans-serif;
        ">

            <div style="
                max-width: 500px;
                margin: auto;
                background-color: #111827;
                border-radius: 16px;
                overflow: hidden;
                border: 1px solid #D4AF37;
            ">

                <div style="
                    padding: 35px 20px;
                    text-align: center;
                    background: linear-gradient(135deg, #080D1A, #17243B);
                ">
                    <h1 style="
                        color: #D4AF37;
                        margin: 0;
                        font-size: 28px;
                    ">
                        ${this.escapeHtml(title)}
                    </h1>

                    <p style="color: #D1D5DB;">
                        ${this.escapeHtml(subtitle)}
                    </p>
                </div>

                <div style="
                    padding: 35px 25px;
                    text-align: center;
                ">
                    <h2 style="color: #FFFFFF;">
                        Hello ${this.escapeHtml(name)}
                    </h2>

                    <p style="
                        color: #9CA3AF;
                        line-height: 1.7;
                    ">
                        ${this.escapeHtml(message)}
                    </p>

                    <div style="
                        margin: 30px 0;
                        padding: 20px;
                        background-color: #080D1A;
                        border: 1px solid #D4AF37;
                        border-radius: 12px;
                    ">
                        <h1 style="
                            color: #D4AF37;
                            font-size: 35px;
                            letter-spacing: 10px;
                            margin: 0;
                        ">
                            ${this.escapeHtml(otp)}
                        </h1>
                    </div>

                    <p style="
                        color: #9CA3AF;
                        font-size: 13px;
                    ">
                        This code expires in
                        ${this.escapeHtml(otpExpiry)}.
                    </p>

                    <p style="
                        color: #6B7280;
                        font-size: 12px;
                        margin-top: 35px;
                    ">
                        If you did not request this code,
                        please ignore this email.
                    </p>
                </div>

                <div style="
                    padding: 20px;
                    text-align: center;
                    border-top: 1px solid #D4AF37;
                ">
                    <p style="
                        color: #D4AF37;
                        margin: 0;
                        font-size: 13px;
                    ">
                        © 2026 Ahmed  wageeh Application😍
                    </p>
                </div>

            </div>

        </body>
        </html>
        `;
    }
}

export const emailTemplate = new EmailTemplate();