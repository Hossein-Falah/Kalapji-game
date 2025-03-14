import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IOtpRepository } from "../interfaces/otp-repository.interface";
import { OtpEntity } from "../entities/otp.entity";

@Injectable()
export class OtpRepository implements IOtpRepository {
    constructor(
        @InjectRepository(OtpEntity) private otpModel: Repository<OtpEntity>
    ) {}

    public async createOtp(userId:string, code:string, expiresIn:Date): Promise<OtpEntity> {
        const otp = this.otpModel.create({
            userId,
            code,
            expiresIn
        })
        return await this.otpModel.save(otp);
    }

    public async findByOtpId(userId:string): Promise<OtpEntity | null> {
        return await this.otpModel.findOne({ where: { userId } });
    }

    public async save(otp:OtpEntity): Promise<OtpEntity> {
        return this.otpModel.save(otp);
    }
}