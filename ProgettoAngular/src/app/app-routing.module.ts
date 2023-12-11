import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

<<<<<<< HEAD
<<<<<<< HEAD
const routes: Routes = [{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }];
=======
const routes: Routes = [
  { path: '', component: HomeComponent }
];
>>>>>>> 255b2829b47c55f9b7cf25bd2b1821155b8f686c
=======
>>>>>>> c835b810d1e84ba7831954ee6e091ec263a900dc


const routes: Routes = [{ path: 'LogSystem',
loadChildren: () => import('./pages/log-system/log-system.module').then(m => m.LogSystemModule) },
{ path: '', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
