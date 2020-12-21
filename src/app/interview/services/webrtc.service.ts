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
    const token = Math.random() * (10 - 1) + 1;
    this.socket.emit('join', {token, room});
  }

  sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  sendEmit(label: string, message: any): void {
    this.socket.emit(label, message);
  }

  sendChat(chat: Message) {
    this.socket.emit('chat', chat)
  }
}
