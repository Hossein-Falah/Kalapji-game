import { Request, Response } from "express";
import { OtpEntity } from "src/modules/user/entities/otp.entity";
import { CheckOtpDto, SendOtpDto, TokenDto } from "../dto/auth.dto";
import { SendOtpResponse } from "../types/auth.type";
export interface IAuthService {
    sendOtp(sendOtpDto:SendOtpDto): Promise<SendOtpResponse>;
    checkOtp(checkOtpDto:CheckOtpDto, res:Response): Promise<void>;
    refreshToken(tokenDto:TokenDto, res:Response): Promise<void>;
    logout(req:Request, res:Response): Promise<void>;
    sendOtpSms(userId:string): Promise<OtpEntity>;
}