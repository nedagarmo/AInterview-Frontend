import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetComponent } from './meet/meet.component';

const routes: Routes = [{ path: 'meet', component: MeetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewRoutingModule { }
