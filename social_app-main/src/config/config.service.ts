import { resolve } from "node:path";
import { config } from "dotenv";

export const NODE_ENV: string = process.env.NODE_ENV ?? "development";

console.log({ en: NODE_ENV });

config({ path: resolve(`./src/config/.env.${NODE_ENV}`) });


export const PORT: number = parseInt(process.env.PORT ?? "7000");
export const DB_URI: string = process.env.DB_URI as string;
export const SALT: string = process.env.SALT ?? "10";

export const ENCRYPTION_KEY: Buffer = Buffer.from(
    process.env.ENCRYPTION_KEY ?? "default_32_byte_encryption_key_here___",
    "utf-8"
);

export const IVLENGTH: number = parseInt(process.env.IVLENGTH ?? "16");

export const ACCESS_TOKEN_SIGNATURE: string = process.env.ACCESS_TOKEN_SIGNATURE as string;
export const ACCESS_TOKEN_EXPIRES_IN: string | number = process.env.ACCESS_TOKEN_EXPIRES_IN as string;

export const REFRESH_TOKEN_SIGNATURE: string = process.env.REFRESH_TOKEN_SIGNATURE as string;
export const REFRESH_TOKEN_EXPIRES_IN: string | number = process.env.REFRESH_TOKEN_EXPIRES_IN as string|number;

export const WEB_CLIENT_ID: string = process.env.WEB_CLIENT_ID as string;
export const REDIS_URI: string = process.env.REDIS_URI as string;

export const APP_PASSWORD: string = process.env.APP_PASSWORD as string;
export const APP_EMAIL: string = process.env.APP_EMAIL as string;
export const BREVO_API_KEY: string = process.env.BREVO_API_KEY as string;
export const PROJECT_NAME: string = process.env.PROJECT_NAME as string;
export const UPSTASH_REDIS_REST_URL: string=process.env.UPSTASH_REDIS_REST_URL as string;


export const ALLOWED_ORIGINS: string[] = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
    : ["*"];