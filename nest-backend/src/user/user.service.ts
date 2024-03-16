import { Injectable } from '@nestjs/common';
import { ChatGateway } from 'src/chat/chat.gateway';

@Injectable()
export class UserService {
  constructor(private chat: ChatGateway) {}

  async helloUser(message: { data: string }) {
    this.chat.sendMessage(message);
  }
}
