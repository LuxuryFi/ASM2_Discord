import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';



@WebSocketGateway(3001) //Create socket gateway on port 3001
export class AppGateway {
  clients: any = []; //Client lists
  colors: any = ['03fca9', 'b282c2', '000000', 'e3e38d', 'C03F23', '1E906D', '2E54AB']; //Color list

  @WebSocketServer() server: Server; // Create new Server
  private logger: Logger = new Logger('App gateway'); //Create logger

  @SubscribeMessage('message') //Subcribe message event for message channel
  handleMessage(client: any, payload: any): void { //Handle message with two para are client:
    // who occur event, payload: sent data from client
    const random = Math.floor(Math.random() * this.colors.length);

    const idx = this.clients.findIndex(e => //find client index in list
      e.id === client.id);

    this.clients.forEach(element => {
      const data = {
        payload: payload,
        color: this.clients[idx].color
      }
      this.server.to(element.id).emit('message', data)  //Send message for each client in lít
    });
  }

  afterInit(server: Server) {
    this.logger.log('init'); //Create logger when server init
  }

  handleDisconnect(client: Socket) { //handle client disconect
    const idx = this.clients.findIndex(e =>
      e.id === client.id);

    this.clients.splice(idx, 1); //Remove client from list

    this.logger.log(`Client disconnected: ${client.id}`); //Crete log for disconnect client.
  }

  handleConnection(client: Socket, ...args: any[]) { //handle client connect
    this.logger.log(`Client connected: ${client.id}`) //create log for connect client

    const random = Math.floor(Math.random() * this.colors.length);

    let newClient = {
      id: client.id,
      color: this.colors[random]
    }

    this.clients.push(newClient) // push new client to list
  }

}
