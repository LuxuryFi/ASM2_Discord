import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';



@WebSocketGateway(3001)
export class AppGateway {
  clients: any = [];
  colors: any = ['03fca9', 'b282c2', '000000', 'e3e38d', 'C03F23', '1E906D', '2E54AB'];

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('App gateway');

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): void {

    const random = Math.floor(Math.random() * this.colors.length);

    const idx = this.clients.findIndex(e =>
      e.id === client.id);

    this.clients.forEach(element => {

      const data = {
        payload: payload,
        color: this.clients[idx].color
      }
      this.server.to(element.id).emit('message', data)
    });
  }

  afterInit(server: Server) {
    this.logger.log('init');
  }

  handleDisconnect(client: Socket) {

    const idx = this.clients.findIndex(e =>
      e.id === client.id);

    this.clients.splice(idx, 1);

    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
    console.log(`Client connected: ${client.id}`)

    const random = Math.floor(Math.random() * this.colors.length);

    let newClient = {
      id: client.id,
      color: this.colors[random]
    }

    this.clients.push(newClient)
  }

}
