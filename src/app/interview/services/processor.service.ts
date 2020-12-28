import { Injectable } from '@angular/core';
import { ProcessorSocket } from '../sockets/processor.socket';

@Injectable({
  providedIn: 'root'
})
export class ProcessorService {

  private token: number;

  constructor(public socket: ProcessorSocket) {
      this.token = Math.random() * (10 - 1) + 1;
  }

  sendEmit(label: string, frame: any): void {
    this.socket.emit(label, {"token": this.token, "frame": frame});
  }
}
