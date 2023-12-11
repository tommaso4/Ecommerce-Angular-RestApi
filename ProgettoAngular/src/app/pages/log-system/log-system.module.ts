import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogSystemRoutingModule } from './log-system-routing.module';
import { LogSystemComponent } from './log-system.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LogSystemComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LogSystemRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class LogSystemModule { }
