import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { applyUpdate, encodeStateAsUpdate } from 'yjs';
import { Namespace, Server, Socket } from 'socket.io';
import { DocumentsService } from './documents.service';
import { UseGuards } from '@nestjs/common';
import { AuthWsGuard } from 'src/auth/auth.guard';
import { UserRegisterDto } from 'src/auth/dto';

type Cursor = {
  range: { index: number; length: number };
  name: string;
  color: string;
};

@WebSocketGateway({
  namespace: /^\/document\/\d+$/,
  cors: {
    origin: '*',
  },
})
export class DocumentsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private users: Map<
    string,
    {
      docId: number;
      name: string;
      color: string;
    }
  > = new Map();

  constructor(private readonly documentService: DocumentsService) {}

  async handleDisconnect(client: Socket) {
    console.log(`Client with ID: ${client.id} has disconnected`);
    const user = this.users.get(client.id);
    if (user) {
      this.users.delete(client.id);
      this.broadcastUserList(user.docId, client);
    }
    client.nsp.emit('userDisconnected', client.id);
  }

  @UseGuards(AuthWsGuard)
  handleConnection(client) {
    console.log(`Client connected with ID: ${client.id}`);
  }

  @UseGuards(AuthWsGuard)
  @SubscribeMessage('getDocument')
  async handleGetDocument(
    @MessageBody() docId: number,
    @ConnectedSocket() client: Socket & { user: UserRegisterDto },
  ) {
    console.log(`Get document by ID: ${docId}`);

    const doc = await this.documentService.getDocumentDoc(docId);
    const state = encodeStateAsUpdate(doc);
    client.emit('document', state);

    const user = client.user;
    const name = `${user.first_name} ${user.last_name}`;
    const color = this.assignUserColor(docId);

    this.users.set(client.id, { docId, name, color });
    this.broadcastUserList(docId, client);
  }

  @UseGuards(AuthWsGuard)
  @SubscribeMessage('updateDocument')
  async handleUpdateDocument(
    @MessageBody() data: { docId: number; update: Uint8Array },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Update document ID: ${data.docId}`);

    const doc = await this.documentService.getDocumentDoc(data.docId);
    applyUpdate(doc, data.update);
    const newState = encodeStateAsUpdate(doc);
    await this.documentService.saveDocument(data.docId, newState);

    client.nsp.emit('documentUpdate', data.update);
  }

  @UseGuards(AuthWsGuard)
  @SubscribeMessage('updateCursor')
  handleUpdateCursor(
    @MessageBody()
    data: {
      docId: number;
      cursor: Cursor;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.users.get(client.id);
    if (user) {
      data.cursor.name = user.name;
      data.cursor.color = user.color;
      client.nsp.emit('cursorUpdate', {
        clientId: client.id,
        cursor: data.cursor,
      });
    }
  }

  private broadcastUserList(docId: number, client: Socket) {
    const usersEditing = Array.from(this.users.values()).filter(
      (user) => user.docId === docId,
    );
    client.nsp.emit('usersEditing', { docId, users: usersEditing });
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private assignUserColor(docId: number) {
    const usersEditing = Array.from(this.users.values()).filter(
      (user) => user.docId === docId,
    );
    let color = this.getRandomColor();
    if (usersEditing.some((user) => user.color === color)) {
      color = this.assignUserColor(docId);
    }

    return color;
  }
}
