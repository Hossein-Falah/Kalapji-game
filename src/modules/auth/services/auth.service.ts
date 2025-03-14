import { randomInt } from 'crypto';
import { Response } from 'express';
import { BadRequestException, ForbiddenException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { OTP_REPOSITORY, USER_SERVICE } from 'src/modules/user/constants/token.constant';
import { IOtpRepository } from 'src/modules/user/interfaces/otp-repository.interface';
import { AuthMessages, UserMessages } from 'src/common/enums/message.enum';
import { IAuthService } from '../interfaces/auth-service.interface';
import { UserService } from 'src/modules/user/user.service';
import { CheckOtpDto, SendOtpDto, TokenDto } from '../dto/auth.dto';
import { OtpEntity } from 'src/modules/user/entities/otp.entity';
import { TokenService } from './token.service';
import { TOKEN_SERVICE } from '../constants/token.constant';
import { SendOtpResponse } from '../types/auth.type';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(OTP_REPOSITORY) private otpRepository: IOtpRepository,
        @Inject(forwardRef(() => USER_SERVICE)) private userService: UserService,
        @Inject(TOKEN_SERVICE) private tokenService: TokenService
    ) { }

    async sendOtp(sendOtpDto: SendOtpDto): Promise<SendOtpResponse> {
        const { phone } = sendOtpDto;
        let user = await this.userService.findByPhone(phone);

        if (!user) {
            user = await this.userService.createUser(phone);
        }

        await this.checkExpiredOtp(user.id);

        const otp = await this.sendOtpSms(user.id);

        return {
            message: AuthMessages.OTP_SENT,
            code: otp.code.toString()
        }
    }

    async checkOtp(checkOtpDto:CheckOtpDto, res:Response): Promise<void> {
        const { phone, code } = checkOtpDto;

        const user = await this.userService.ensureUserExists(phone);
        const otp = await this.otpRepository.findByOtpId(user.id);
        if (!otp) throw new BadRequestException(AuthMessages.LOGIN_AGAIN);

        const now  = new Date();

        if (otp.expiresIn < now) throw new BadRequestException(AuthMessages.OTP_EXPIRED);
        if (otp.code !== +code) throw new BadRequestException(AuthMessages.OTP_INCORRECT);

        const accessToken = this.tokenService.generateAccessToken({ phone });
        const refreshToken = this.tokenService.generateRefreshToken({ phone });        

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({
            message: AuthMessages.LOGIN_SUCCESS,
            accessToken,
            refreshToken
        })
    }

    async refreshToken(tokenDto:TokenDto, res:Response): Promise<void> {
        const { refreshToken } = tokenDto;
        const { phone } = this.tokenService.verifyRefreshToken(refreshToken);        
        const user = await this.userService.findByPhone(phone)
        if (!user) throw new BadRequestException(UserMessages.USER_NOT_FOUND)

        const newAccessToken = this.tokenService.generateAccessToken({ phone });
        const newRefreshToken = this.tokenService.generateRefreshToken({ phone });
        
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
        
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        
        res.json({
            message: AuthMessages.REFRESH_TOKEN_SUCCESS,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })

    }

    logout(): Promise<void> {
        return
    }

    async sendOtpSms(userId: string): Promise<OtpEntity> {
        const code = randomInt(10000, 99999).toString();
        const expiresIn = new Date(Date.now() + (1000 * 60 * 2));
        
        let otp = await this.otpRepository.findByOtpId(userId);
        
        if (otp) {
            otp.code = +code;
            otp.expiresIn = expiresIn;
        } else {
            otp = await this.otpRepository.createOtp(userId, +code, expiresIn);
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
