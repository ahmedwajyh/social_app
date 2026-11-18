import mongoose from "mongoose";
import { DB_URI } from "../config/config.service.js";

export const connectionDB=async()=>{
    try {
        await mongoose.connect(DB_URI)
        console.log(" Database is  connected successfully 😍👌");
    } catch (error) {
        console.log("connected failed😢",error);
    }
}