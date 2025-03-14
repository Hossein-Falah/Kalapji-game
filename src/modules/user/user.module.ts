import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { providers } from './user.provider';
import { USER_REPOSITORY, USER_SERVICE, OTP_REPOSITORY } from './constants/token.constant';
import { OtpEntity } from './entities/otp.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, OtpEntity]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers,
  exports: [USER_SERVICE, USER_REPOSITORY, OTP_REPOSITORY]
})
export class UserModule {}