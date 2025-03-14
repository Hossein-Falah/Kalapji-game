import { OtpEntity } from "../entities/otp.entity";

export interface IOtpRepository {
    createOtp(userId:string, code:number, expiresIn:Date): Promise<OtpEntity>;
    findByOtpId(userId:string): Promise<OtpEntity | null>;
    save(otp:OtpEntity): Promise<OtpEntity>;
}