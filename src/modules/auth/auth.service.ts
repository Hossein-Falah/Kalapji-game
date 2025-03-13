import { Inject, Injectable } from '@nestjs/common';
import { OTP_REPOSITORY, USER_REPOSITORY } from 'src/modules/user/constants/token.constant';
import { IUserRepository } from 'src/modules/user/interfaces/user-repository.interface';
import { IOtpRepository } from 'src/modules/user/interfaces/otp-repository.interface';
import { IAuthService } from './interfaces/auth-service.interface';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
        @Inject(OTP_REPOSITORY) private otpRepository: IOtpRepository
    ) {}

    sendOtp(): Promise<void> {
        return
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
}
