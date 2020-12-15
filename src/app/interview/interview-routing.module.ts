import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetComponent } from './meet/meet.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: '', component: MeetComponent },
  { path: 'meet', component: MeetComponent },
  { path: 'calendar', component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewRoutingModule { }
