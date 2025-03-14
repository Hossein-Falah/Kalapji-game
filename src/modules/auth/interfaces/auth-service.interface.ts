import { OtpEntity } from "src/modules/user/entities/otp.entity";
import { SendOtpDto } from "../dto/auth.dto";

export interface IAuthService {
    sendOtp(sendOtpDto:SendOtpDto): Promise<{message:string, code:string}>;
    checkOtp(): Promise<void>;
    refreshToken(): Promise<void>;
    logout(): Promise<void>;
    checkExpiredOtp(userId:string): Promise<void>;
    sendOtpSms(userId:string): Promise<OtpEntity>;
}