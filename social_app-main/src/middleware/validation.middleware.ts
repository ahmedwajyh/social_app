
import { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { AppException } from "../common/exception/app.exception.js";

type ReqType = "body" | "params" | "query";
type SchemaType = Partial<Record<ReqType, ZodType>>;

export const Validation = (schema: SchemaType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const resultError = [];
        for (const key of Object.keys(schema) as ReqType[]) {
            const currentSchema = schema[key];
            if (!currentSchema) continue;
            
            const result = currentSchema.safeParse(req[key]);

            if (!result.success) {
                resultError.push(...result.error.issues);
                continue;
            }else{
                if (key === "body")
                    req.body = result.data;
            }
        }

        if (resultError.length > 0) {
            throw new AppException(
                "Validation Error",
                400,
                resultError
            );
        }
        next();
    };
};
