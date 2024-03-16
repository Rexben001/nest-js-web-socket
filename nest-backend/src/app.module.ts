import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UserModule, ChatModule, MessagesModule],
})
export class AppModule {}
