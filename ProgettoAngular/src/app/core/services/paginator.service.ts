import { Injectable } from '@angular/core';
import { BeerService } from './beer.service';

@Injectable()
export class PaginatorService {

  constructor(private beerService: BeerService) { }

  goToPage(page: number) {
    if (this.beerService.beerName !== '') {
      this.beerService.getBeersByName(page);
    } else {
      this.beerService.getBeers(page);
    }
  }
}
