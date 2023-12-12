import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BeerCardComponent } from './pages/home/beer-card/beer-card.component';
import { HttpClientModule } from '@angular/common/http';
import { NameFilterComponent } from './pages/home/name-filter/name-filter.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { BlondBeerComponent } from './pages/blond-beer/blond-beer.component';
import { CartComponent } from './pages/cart/cart.component';
import { DetailsComponent } from './pages/details/details.component';
import { PAGES404Component } from './pages/pages404/pages404.component';
import { RedBeerComponent } from './pages/red-beer/red-beer.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { WhishlistComponent } from './pages/whishlist/whishlist.component';
import { WhiteBeerComponent } from './pages/white-beer/white-beer.component';
import { HeaderComponent } from './shared/header/header.component';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './pages/user-profile/edit-profile/edit-profile.component';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';


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
    DetailsComponent,
    HeaderComponent,
    PaginatorComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(far,fas,fab)
  }
}
