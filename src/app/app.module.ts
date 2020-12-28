import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppInterceptor } from './app.interceptor'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { SocketIoModule } from 'ngx-socket-io';

import { SecurityModule } from './security/security.module';
import { InterviewModule } from './interview/interview.module';
import { ProcessorSocket } from './interview/sockets/processor.socket';
import { WebRTCSocket } from './interview/sockets/webrtc.socket';




// const processorConfig: SocketIoConfig = { url: 'wss://proc-ainterview.logicalsf.com', options: { } };
// const webrtcConfig: SocketIoConfig = { url: 'wss://wrtc-ainterview.logicalsf.com', options: { } };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    AngularMaterialModule,

    SocketIoModule,

    SecurityModule,
    InterviewModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    ProcessorSocket, WebRTCSocket
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
