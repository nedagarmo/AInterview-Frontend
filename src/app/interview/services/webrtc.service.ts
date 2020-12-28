import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';
import { WebRTCSocket } from '../sockets/webrtc.socket';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  private token: number;

  constructor(private http: HttpClient, public socket: WebRTCSocket) {
      this.token = Math.random() * (10 - 1) + 1;
  }

  connect(room: any) {
    this.socket.emit('join', room);
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
