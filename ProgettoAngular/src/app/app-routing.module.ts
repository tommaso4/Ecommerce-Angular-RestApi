import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

<<<<<<< HEAD
const routes: Routes = [{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }];
=======
const routes: Routes = [{ path: 'LogSystem',
 loadChildren: () => import('./pages/log-system/log-system.module').then(m => m.LogSystemModule) }];
>>>>>>> 3e2a592459deb573f0acb3d019a65907ced2f7ef

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
