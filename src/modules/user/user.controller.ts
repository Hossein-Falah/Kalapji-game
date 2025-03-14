import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { USER_SERVICE } from './constants/token.constant';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: UserService
  ) {}

}
