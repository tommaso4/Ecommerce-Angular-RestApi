import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { BeerCardComponent } from './pages/home/beer-card/beer-card.component';
import { HttpClientModule } from '@angular/common/http';

import { NameFilterComponent } from './pages/home/name-filter/name-filter.component';
import { SharedModule } from './shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NameFilterComponent,
    BeerCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FontAwesomeModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
