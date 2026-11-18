import mongoose from "mongoose";
import { GenderEnum, RoleEnum } from "../../common/utils/enum/user.enum.js";

export interface Iuser{
    fName:string,
    lName:string,
    age:number,
    email:string,
    password:string,
    role:RoleEnum,
    gender:GenderEnum,
    phone:string
}

const userSchema=new mongoose.Schema<Iuser>({
    fName:{
        type:String,
        min:2,
        max:44,
        trim:true,
        required:true
    },
    lName:{
        type:String,
        min:2,
        max:44,
        trim:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    phone:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:[RoleEnum.admin,RoleEnum.user],
        default:RoleEnum.user
    },
    gender:{
        type:String,
        enum:[GenderEnum.female,GenderEnum.male],
        default:GenderEnum.male
    }

},{
    timestamps:true,
    strict:true,
    strictQuery:true
})

export const userModel=mongoose.models.User || mongoose.model("User",userSchema)