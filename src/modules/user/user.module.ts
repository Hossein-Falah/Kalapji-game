import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { providers } from './user.provider';
import { USER_REPOSITORY, USER_SERVICE, OTP_REPOSITORY } from './constants/token.constant';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers,
  exports: [USER_SERVICE, USER_REPOSITORY, OTP_REPOSITORY]
})
export class UserModule {}