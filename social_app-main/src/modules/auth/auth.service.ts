import { NextFunction, Request, Response } from "express"
import { Iuser, userModel } from "../../DB/models/user.model"
import { ConflictException } from "../../common/exception"

class AuthService{
    constructor(){}

    signup =async(body:Iuser)=>{
        const{age,email,fName,gender,lName,password,phone}=body

        let user= await userModel.findOne({email}as any)

        if(user){
            throw new ConflictException("user already exist",{"email":email})
        }

        user=await userModel.create({
            age,email,fName,lName,password,gender,phone
        })

        return {user,message:"done on signup"};
    }

    login(){
        return "done on login"
    }
}

export default new AuthService();
