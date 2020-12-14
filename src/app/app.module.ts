import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { InterviewModule } from './interview/interview.module'

const config: SocketIoConfig = { url: 'ws://localhost:5000', options: { } };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    SocketIoModule.forRoot(config),

    InterviewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
