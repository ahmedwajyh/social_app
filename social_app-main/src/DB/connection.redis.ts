import { createClient, type RedisClientType } from "redis";
import { UPSTASH_REDIS_REST_URL } from "../config/config.service";

interface ISetValue {
    key: string;
    value: unknown;
    ttl?: number;
}

interface IExpire {
    key: string;
    ttl: number;
}

export class RedisService {

    private readonly redis_client: RedisClientType;

    constructor() {
        this.redis_client = createClient({
            url:UPSTASH_REDIS_REST_URL
        });

        this.redis_client.on("error", (error) => {
            console.error("Redis Client Error:", error);
        });
    }

    async connect(): Promise<void> {
        try {
            if (!this.redis_client.isOpen) {
                await this.redis_client.connect();
                console.log("Redis connected Successfully 🙌");
            }
        } catch (error) {
            console.error("Redis Connection Error:", error);
            throw error;
        }
    }

    private convertValue(value: unknown): string {
        if (typeof value === "string") return value;

        const result = JSON.stringify(value);

        if (result === undefined) {
            throw new Error("Invalid Redis value");
        }

        return result;
    }

    async setValue({ key, value, ttl }: ISetValue) {
        try {
            const mainValue = this.convertValue(value);

            const options = ttl ? { EX: ttl } : {};

            return await this.redis_client.set(key, mainValue, options);

        } catch (error) {
            console.error(error, "\n redis setValue Error");
            throw error;
        }
    }

    async updateValue({ key, value, ttl }: ISetValue) {
        try {
            const mainValue = this.convertValue(value);

            const options = {
                XX: true as const,
                ...(ttl ? { EX: ttl } : {})
            };

            const result = await this.redis_client.set(key, mainValue, options);

            return result === "OK" ? 1 : 0;

        } catch (error) {
            console.error(error, "\n redis updateValue Error");
            throw error;
        }
    }

    async getValue(key: string): Promise<unknown> {
        try {
            const data = await this.redis_client.get(key);

            if (data === null) return null;

            try {
                return JSON.parse(data);
            } catch {
                return data;
            }

        } catch (error) {
            console.error(error, "\n redis getValue Error");
            throw error;
        }
    }

    async ttl(key: string): Promise<number> {
        try {
            return await this.redis_client.ttl(key);

        } catch (error) {
            console.error(error, "\n redis ttl Error");
            throw error;
        }
    }

    async expire({ key, ttl }: IExpire) {
        try {
            return await this.redis_client.expire(key, ttl);

        } catch (error) {
            console.error(error, "\n redis expire Error");
            throw error;
        }
    }

    async deleteKey(key: string) {
        try {
            return await this.redis_client.del(key);

        } catch (error) {
            console.error(error, "\n redis deleteKey Error");
            throw error;
        }
    }

    async keys(key: string): Promise<string[]> {
        try {
            return await this.redis_client.keys(`${key}*`);

        } catch (error) {
            console.error(error, "\n redis keys Error");
            throw error;
        }
    }

    async incr(key: string): Promise<number> {
        try {
            return await this.redis_client.incr(key);

        } catch (error) {
            console.error(error, "\n redis incr Error");
            throw error;
        }
    }
}

export default new RedisService();