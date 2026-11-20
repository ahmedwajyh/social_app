import { Iuser, userModel } from "../../DB/models/user.model.js";
import {
    ConflictException,
    NotFoundException,
    BadRequestException
} from "../../common/exception/index.js";
import { otpEmailService } from "../../common/sevice/OTPEmail.service.js";

class AuthService {

    signup = async (body: Iuser) => {

        const {
            age,
            email,
            fName,
            gender,
            lName,
            password,
            phone
        } = body;

        const userExist = await userModel.findOne({ email });

        if (userExist) {
            throw new ConflictException("User already exists", userExist);
        }

        await userModel.create({
            age,
            email,
            fName,
            lName,
            password,
            gender,
            phone
        });

        await otpEmailService.sendOTP(email, fName);

        return {
            message: "Signup successful. OTP sent to your email."
        };
    };

    verifyEmail = async (email: string, otp: string) => {

        // 1- Find User
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        // 2- Check Email Verification
        if (user.isEmailVerified) {
            throw new ConflictException("Email already verified", user);
        }

        // 3- Verify OTP
        const isValid = await otpEmailService.verifyOTP(email, otp);

        if (!isValid) {
            throw new BadRequestException("Invalid or expired OTP");
        }

        // 4- Update User
        await userModel.updateOne(
            { email },
            { $set: { isEmailVerified: true } }
        );

        return {
            message: "Email verified successfully"
        };
    };

    login = () => {
        return "done on login";
    };
}

export default new AuthService();