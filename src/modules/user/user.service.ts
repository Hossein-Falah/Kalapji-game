import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { UserEntity } from './entities/user.entity';
import { IUserService } from './interfaces/user-service.interface';
import { USER_REPOSITORY } from './constants/token.constant';
import { IUserRepository } from './interfaces/user-repository.interface';
import { AUTH_SERVICE } from '../auth/constants/token.constant';
import { AuthService } from '../auth/services/auth.service';
import { UserMessages } from 'src/common/enums/message.enum';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository,
    @Inject(AUTH_SERVICE) private authService: AuthService
  ) {}

    async findByPhone(phone:string): Promise<UserEntity | null> {
    return this.userRepository.findByPhone(phone);
  }

  async createUser(phone:string): Promise<UserEntity> {
    const user = await this.userRepository.createUser(phone);
    await this.authService.sendOtpSms(user.id);
    return user;
  }

  async ensureUserExists(phone:string): Promise<UserEntity> {
    const user = await this.findByPhone(phone);
    if (!user) {
      throw new BadRequestException(UserMessages.USER_NOT_FOUND)
    }
    return user;
  }
}
