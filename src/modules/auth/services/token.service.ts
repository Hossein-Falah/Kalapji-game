import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { PhoneTokenPayload } from "../types/token.type";
import { TokenMessages } from "src/common/enums/message.enum";
import { JWT_SERVICE } from "../constants/token.constant";

@Injectable()
export class TokenService {
    constructor(
        @Inject(JWT_SERVICE) private jwtService:JwtService,
        private configService:ConfigService
    ) {}

    public generateAccessToken(payload:PhoneTokenPayload) {
        try {
            return this.jwtService.sign(payload, {
                secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
                expiresIn: "20m"
            })
        } catch (error) {
            throw new BadRequestException(TokenMessages.TRY_AGAIN)
        }
    }

    public generateRefreshToken(payload:PhoneTokenPayload) {
        try {
            return this.jwtService.sign(payload, {
                secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
                expiresIn: "7d"
            })
        } catch (error) {
            throw new BadRequestException(TokenMessages.TRY_AGAIN)
        }
    }

    public verifyRefreshToken(token:string) {
        try {
            return this.jwtService.verify(token, {
                secret: this.configService.get<string>("JWT_REFRESH_SECRET")
            })
        } catch (error) {
            throw new BadRequestException(TokenMessages.SOMETHING_WENT_WRONG)
        }
    }
}