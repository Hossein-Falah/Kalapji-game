import { Provider } from "@nestjs/common";
import { AUTH_SERVICE, JWT_SERVICE, TOKEN_SERVICE } from "./constants/token.constant";
import { AuthService } from "./services/auth.service";
import { TokenService } from "./services/token.service";
import { JwtService } from "@nestjs/jwt";

export const providers: Provider[] = [
    {
        provide: AUTH_SERVICE,
        useClass: AuthService
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