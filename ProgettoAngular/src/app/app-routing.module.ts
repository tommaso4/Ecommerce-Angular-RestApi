import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';



const routes: Routes = [{ path: 'LogSystem',
loadChildren: () => import('./pages/log-system/log-system.module').then(m => m.LogSystemModule) },
{ path: '', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
