import express, { NextFunction, Request, Response } from 'express'
import { Ierror } from '../common/interface';



export const globalError=(err:Ierror,req:Request,res:Response,next:NextFunction)=>{
    const status = err.status || 500;
    return res
    .status(status)
    .json({
        err_message: err.message,
        cause: err.cause,
        err,
        stack: err.stack,
    });
}