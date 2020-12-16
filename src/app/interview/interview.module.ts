import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { InterviewRoutingModule } from './interview-routing.module'

import { MeetComponent } from './meet/meet.component';
import { CalendarComponent } from './calendar/calendar.component';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [MeetComponent, CalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    InterviewRoutingModule,
    FullCalendarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InterviewModule { }
