import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PAGES404Component } from './pages/pages404/pages404.component';
import { BlondBeerComponent } from './pages/typeOfBeer/blond-beer/blond-beer.component';
import { CartComponent } from './components/cart/cart.component';
import { LogGuard } from './pages/log-system/log.guard';
import { RedBeerComponent } from './pages/typeOfBeer/red-beer/red-beer.component';
import { WhiteBeerComponent } from './pages/typeOfBeer/white-beer/white-beer.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { WhishlistComponent } from './components/whishlist/whishlist.component';
import { DetailsComponent } from './pages/details/details.component';
import { EditComponent } from './pages/edit/edit.component';
import { RimborsiComponent } from './components/rimborsi/rimborsi.component';
import { ServizioClientiComponent } from './components/servizioclienti/servizioclienti.component';
import { SpedizioniComponent } from './components/spedizioni/spedizioni.component';



const routes: Routes = [
  { path: 'LogSystem',loadChildren: () => import('./pages/log-system/log-system.module').then(m => m.LogSystemModule) },
  { path: '', pathMatch:'full', redirectTo:'/home' },
  { path: 'home', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'blondbeer', component: BlondBeerComponent },
  { path: 'redbeer', component: RedBeerComponent },
  { path: 'whitebeer', component: WhiteBeerComponent },
  { path: 'cart', component: CartComponent, canActivate:[LogGuard]},
  { path: 'userprofile', component: UserProfileComponent, canActivate:[LogGuard]},
  { path: 'wishlist', component: WhishlistComponent, canActivate:[LogGuard]},
  { path: 'edit/:id', component: EditComponent },
  { path: '**', component:PAGES404Component},
  { path: 'wishlist', component: WhishlistComponent },
  { path: 'rmborsi', component: RimborsiComponent },
  { path: 'servizioclienti', component: ServizioClientiComponent },
  { path: 'spedizioni', component: SpedizioniComponent }



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
