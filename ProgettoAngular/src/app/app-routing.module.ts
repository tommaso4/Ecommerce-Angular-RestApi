import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PAGES404Component } from './pages/pages404/pages404.component';
import { BlondBeerComponent } from './pages/blond-beer/blond-beer.component';
import { CartComponent } from './pages/cart/cart.component';
import { LogGuard } from './pages/log-system/log.guard';
import { RedBeerComponent } from './pages/red-beer/red-beer.component';
import { WhiteBeerComponent } from './pages/white-beer/white-beer.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { WhishlistComponent } from './pages/whishlist/whishlist.component';
import { DetailsComponent } from './pages/details/details.component';

<<<<<<< HEAD
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
=======
>>>>>>> fb1d8f3fe5de2fa2276d90cb80b4c88b3985f763


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
{ path: '**', component:PAGES404Component}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
