import express, { NextFunction, Request, Response } from 'express'
import { connectionDB } from './DB/connection.db.js';
import cors from "cors"
import{rateLimit}from "express-rate-limit"
import { globalError } from './middleware/error.middleware';
import { authRouter } from './modules/index';
import { AppException } from './common/exception';
import {PORT } from './config/config.service.js';
import  RedisService from './DB/connection.redis.js';
const app:express.Application=express()
const port:number=PORT||9000;

const limiter=rateLimit({
    windowMs:60*10*1000,
    limit:40,
    handler:(req:Request,res:Response)=>{
        res.status(427).json({
            message:"too many requests"
        })
    }
})

export const bootstrap=async()=>{
    app.use(express.json(),cors(),limiter)
    
    await connectionDB()
  await RedisService.connect()
    app.use("/auth",authRouter)

    app.listen(port,()=>{
        console.log("app is listen on port =>",port );
    })

    app.get("/",(req:Request,res:Response,next:NextFunction)=>{
        res.status(200).json({
            message:"welcome to my app"
        })
    })

    app.use('{/*dumm}',(req:Request,res:Response,next:NextFunction)=>{
        throw new AppException("the url is wrong",404,"not found")
    })

    app.use(globalError)
}