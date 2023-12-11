import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogSystemComponent } from './log-system.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LogSystemComponent,
  },
  {
    path:"login",
    component: LoginComponent,
  },
  {
    path:"register",
    component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogSystemRoutingModule { }
