import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class ProcessorSocket extends Socket {

    constructor() {
        super({ url: 'wss://proc-ainterview.logicalsf.com', options: {} });
        // super({ url: 'ws://localhost:5000', options: {} });
    }
}
