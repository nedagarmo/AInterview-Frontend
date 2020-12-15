import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewRoutingModule } from './interview-routing.module'

import { MeetComponent } from './meet/meet.component';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [MeetComponent, CalendarComponent],
  imports: [
    CommonModule,
    InterviewRoutingModule
  ]
})
export class InterviewModule { }
