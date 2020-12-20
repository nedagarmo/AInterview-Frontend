import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetComponent } from './meet/meet.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthenticationGuard } from '../security/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MeetComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'meet',
    component: MeetComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewRoutingModule { }
