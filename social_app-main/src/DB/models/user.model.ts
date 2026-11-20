
import mongoose from "mongoose";
import { GenderEnum, RoleEnum } from "../../common/utils/enum/user.enum.js";

export interface Iuser {
    fName: string;
    lName: string;
    age: number;
    email: string;
    password: string;
    role: RoleEnum;
    gender: GenderEnum;
    phone: string;
    isEmailVerified: boolean;
}

const userSchema = new mongoose.Schema<Iuser>({
    fName: {
        type: String,
        minlength: 2,
        maxlength: 44,
        trim: true,
        required: true
    },
    lName: {
        type: String,
        minlength: 2,
        maxlength: 44,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: [RoleEnum.admin, RoleEnum.user],
        default: RoleEnum.user
    },
    gender: {
        type: String,
        enum: [GenderEnum.female, GenderEnum.male],
        default: GenderEnum.male
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    strict: true,
    strictQuery: true
});

export const userModel =
    (mongoose.models.User as mongoose.Model<Iuser>) ||
    mongoose.model<Iuser>("User", userSchema);
    