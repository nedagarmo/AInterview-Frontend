import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyTokenGuard } from './security/guards/verify.guard';
import { LoginComponent } from './security/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [VerifyTokenGuard]
  },
  {
    path: 'security',
    loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
  },
  {
    path: 'interview',
    loadChildren: () => import('./interview/interview.module').then(m => m.InterviewModule),
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
