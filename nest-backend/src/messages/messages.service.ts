import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  messages: Message[] = [{ name: 'Rex', text: 'Yoo!' }];
  clientToUser = {};

  identify(name: string, id: string) {
    this.clientToUser[id] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId) {
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text,
    };
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    console.log({ id, updateMessageDto });
    // return this.messages.push(updateMessageDto);
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
