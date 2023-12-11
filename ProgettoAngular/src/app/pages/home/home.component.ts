import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Beer } from '../../core/models/beer.model';
import { BeerService } from '../../core/services/beer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  beersList$: Observable<Beer[]>;

  constructor(private beerService: BeerService) {
    this.beersList$ = this.beerService.beers$;
  }

  searchBeersByName() {
    const page: number = 1;
    if (this.beerService.beerName !== '') {
      this.beerService.getBeersByName(page);
    } else {
      this.beerService.getBeers();
    }
  }

}

