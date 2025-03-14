import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserEntity } from '../user/entities/user.entity';
import { OtpEntity } from '../user/entities/otp.entity';
import { UserModule } from '../user/user.module';
import { providers } from "./auth.provider"

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, OtpEntity]),
    forwardRef(() => UserModule)
  ],
  controllers: [AuthController],
  providers,
})
export class AuthModule {}
