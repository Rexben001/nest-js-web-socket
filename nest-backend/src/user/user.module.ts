import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ChatModule],
})
export class UserModule {}
