import { Provider } from "@nestjs/common";
import { USER_REPOSITORY, USER_SERVICE, OTP_REPOSITORY } from "./constants/token.constant";
import { UserService } from "./user.service";
import { UserRepository } from "./repository/user.repository";
import { OtpRepository } from "./repository/otp.repository";
import { AUTH_SERVICE, JWT_SERVICE, TOKEN_SERVICE } from "../auth/constants/token.constant";
import { AuthService } from "../auth/services/auth.service";
import { TokenService } from "../auth/services/token.service";
import { JwtService } from "@nestjs/jwt";

export const providers: Provider[] = [
    {
        provide: USER_SERVICE,
        useClass: UserService,
    },
    {
        provide: AUTH_SERVICE,
        useClass: AuthService
    },
    {
        provide: USER_REPOSITORY,
        useClass: UserRepository
    },
    {
        provide: OTP_REPOSITORY,
        useClass: OtpRepository
    },
    {
        provide: TOKEN_SERVICE,
        useClass: TokenService
    },
    {
        provide: JWT_SERVICE,
        useClass: JwtService
    }
]