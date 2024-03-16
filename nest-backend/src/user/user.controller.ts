import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(200)
  sendMessage(@Body() message: { data: string }) {
    console.log({ message });
    this.userService.helloUser(message);
    return {
      success: true,
    };
  }
}
