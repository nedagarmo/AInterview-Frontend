import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';

import { SecurityRoutingModule } from './security-routing.module'
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SecurityRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SecurityModule { }
