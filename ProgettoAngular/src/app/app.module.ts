import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { BeerCardComponent } from './pages/home/beer-card/beer-card.component';
import { HttpClientModule } from '@angular/common/http';

import { NameFilterComponent } from './pages/home/name-filter/name-filter.component';
import { SharedModule } from './shared/shared.module';
import { RedBeerComponent } from './pages/red-beer/red-beer.component';
import { WhiteBeerComponent } from './pages/white-beer/white-beer.component';
import { BlondBeerComponent } from './pages/blond-beer/blond-beer.component';
import { WhishlistComponent } from './pages/whishlist/whishlist.component';
import { CartComponent } from './pages/cart/cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PAGES404Component } from './pages/pages404/pages404.component';
import { DetailsComponent } from './pages/details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NameFilterComponent,
    BeerCardComponent,
    RedBeerComponent,
    WhiteBeerComponent,
    BlondBeerComponent,
    WhishlistComponent,
    CartComponent,
    FooterComponent,
    UserProfileComponent,
    PAGES404Component,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
