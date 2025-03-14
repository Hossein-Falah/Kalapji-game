import { Response } from "express";
import { OtpEntity } from "src/modules/user/entities/otp.entity";
import { CheckOtpDto, SendOtpDto } from "../dto/auth.dto";
import { SendOtpResponse } from "../types/auth.type";
export interface IAuthService {
    sendOtp(sendOtpDto:SendOtpDto): Promise<SendOtpResponse>;
    checkOtp(checkOtpDto:CheckOtpDto, res:Response): Promise<void>;
    refreshToken(): Promise<void>;
    logout(): Promise<void>;
    checkExpiredOtp(userId:string): Promise<void>;
    sendOtpSms(userId:string): Promise<OtpEntity>;
}