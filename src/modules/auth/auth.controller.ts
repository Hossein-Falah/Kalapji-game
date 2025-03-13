import { Controller, Inject, Post } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsmes } from 'src/common/enums/swagger.consumes.enum';
import { AUTH_SERVICE } from './constants/token.constant';
import { IAuthService } from './interfaces/auth-service.interface';

@Controller('auth')
@ApiTags("Auth 🔒")
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private authService: IAuthService) {}

  @Post('/send-otp')
  @ApiConsumes(SwaggerConsmes.UrlEncoded, SwaggerConsmes.Json)
  sendOtp() {
    return this.authService.sendOtp();
  }

  @Post('/check-otp')
  @ApiConsumes(SwaggerConsmes.UrlEncoded, SwaggerConsmes.Json)
  checkOtp() {
    return this.authService.checkOtp();
  }

  @Post('/refresh-token')
  @ApiConsumes(SwaggerConsmes.UrlEncoded, SwaggerConsmes.Json)
  refreshToken() {
    return this.authService.refreshToken();
  }

  @Post('/logout')
  @ApiConsumes(SwaggerConsmes.UrlEncoded, SwaggerConsmes.Json)
  logout() {
    return this.authService.logout();
  }
}