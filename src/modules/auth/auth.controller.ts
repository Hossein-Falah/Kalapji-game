import { Response } from 'express';
import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsmes } from 'src/common/enums/swagger.consumes.enum';
import { AUTH_SERVICE } from './constants/token.constant';
import { IAuthService } from './interfaces/auth-service.interface';
import { CheckOtpDto, SendOtpDto, TokenDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags("Auth 🔒")
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private authService: IAuthService) {}

  @Post('/send-otp')
  @ApiConsumes(SwaggerConsmes.UrlEncoded, SwaggerConsmes.Json)
  sendOtp(@Body() sendOtpDto:SendOtpDto) {
    return this.authService.sendOtp(sendOtpDto);
  }

  @Post('/check-otp')
  @ApiConsumes(SwaggerConsmes.UrlEncoded, SwaggerConsmes.Json)
  checkOtp(@Body() checkOtpDto:CheckOtpDto, @Res() res:Response) {
    return this.authService.checkOtp(checkOtpDto, res);
  }

  @Post('/refresh-token')
  @ApiConsumes(SwaggerConsmes.UrlEncoded, SwaggerConsmes.Json)
  refreshToken(@Body() tokenDto:TokenDto, @Res() res:Response) {
    return this.authService.refreshToken(tokenDto, res);
  }

  @Post('/logout')
  @ApiConsumes(SwaggerConsmes.UrlEncoded, SwaggerConsmes.Json)
  logout(@Res() res:Response) {
    return this.authService.logout(res);
  }
}