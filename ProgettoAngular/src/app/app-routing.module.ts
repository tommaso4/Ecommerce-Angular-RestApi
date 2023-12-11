import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

<<<<<<< HEAD
const routes: Routes = [{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }];
=======
const routes: Routes = [
  { path: '', component: HomeComponent }
];
>>>>>>> 255b2829b47c55f9b7cf25bd2b1821155b8f686c

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
