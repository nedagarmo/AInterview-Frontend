import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from '../../../environments/environment';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {

  constructor(private http: HttpClient, public socket: Socket) {
  }

  connect(room: any) {
    this.socket.emit('create or join', room);
  }

  sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  sendChat(chat: Message) {
    this.socket.emit('chat', chat)
  }
}
