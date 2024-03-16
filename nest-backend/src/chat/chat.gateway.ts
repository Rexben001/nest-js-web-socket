import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: '*',
  allowEIO3: true,
  // namespaces are paths like localhost:3000/events
  namespace: 'events',
})
export class ChatGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log({ message });
    this.server.emit('message', message);
  }

  sendMessage(message: { data: string }) {
    this.server.emit('message', message);
  }
}
