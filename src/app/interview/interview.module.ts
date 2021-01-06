import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DpDatePickerModule } from 'ng2-date-picker';

import { InterviewRoutingModule } from './interview-routing.module'

import { MeetComponent } from './meet/meet.component';
import { CalendarComponent } from './calendar/calendar.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ProgrammerComponent } from './programmer/programmer.component';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [MeetComponent, CalendarComponent, StatisticsComponent, ProgrammerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    InterviewRoutingModule,
    FullCalendarModule,
    DpDatePickerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InterviewModule { }
