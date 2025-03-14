import { randomInt } from 'crypto';
import { ForbiddenException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { OTP_REPOSITORY, USER_SERVICE } from 'src/modules/user/constants/token.constant';
import { IOtpRepository } from 'src/modules/user/interfaces/otp-repository.interface';
import { IAuthService } from './interfaces/auth-service.interface';
import { SendOtpDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { OtpEntity } from '../user/entities/otp.entity';
import { AuthMessages } from 'src/common/enums/message.enum';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(OTP_REPOSITORY) private otpRepository: IOtpRepository,
        @Inject(forwardRef(() => USER_SERVICE)) private userService: UserService
    ) { }

    async sendOtp(sendOtpDto: SendOtpDto): Promise<{message:string, code:string}> {
        const { phone } = sendOtpDto;
        let user = await this.userService.findByPhone(phone);

        if (!user) {
            user = await this.userService.createUser(phone);
        }

        await this.checkExpiredOtp(user.id);

        const otp = await this.sendOtpSms(user.id);

        return {
            message: AuthMessages.OTP_SENT,
            code: otp.code
        }

    }

    checkOtp(): Promise<void> {
        return
    }

    refreshToken(): Promise<void> {
        return
    }

    logout(): Promise<void> {
        return
    }

    async sendOtpSms(userId: string): Promise<OtpEntity> {
        const code = randomInt(10000, 99999).toString();
        const expiresIn = new Date(Date.now() + (1000 * 60 * 2));
        
        let otp = await this.otpRepository.findByOtpId(userId);
        
        if (otp) {
            otp.code = code;
            otp.expiresIn = expiresIn;
        } else {
            otp = await this.otpRepository.createOtp(userId, code, expiresIn);
        }

        await this.save(otp);

        return otp;
    }

    async checkExpiredOtp(userId:string): Promise<void> {
        const now = new Date().getTime();
        const otp = await this.otpRepository.findByOtpId(userId);

        if (otp?.expiresIn?.getTime() > now) {
            throw new ForbiddenException(AuthMessages.OTP_EXPIRED);
        }
    }

    async save(otp: OtpEntity) {
        return this.otpRepository.save(otp);
    }
}
