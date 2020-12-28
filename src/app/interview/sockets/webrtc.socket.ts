import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class WebRTCSocket extends Socket {

    constructor() {
        super({ url: 'https://wrtc-ainterview.logicalsf.com', options: {} });
        // super({ url: 'ws://localhost:8080', options: {} });
    }

}
