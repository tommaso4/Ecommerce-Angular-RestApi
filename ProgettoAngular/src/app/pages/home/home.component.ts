import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Birra } from '../../core/models/beer.model';
import { BeerService } from '../../core/services/beer.service';
import { PaginatorService } from '../../core/services/paginator.service';


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

    // Metodo per filtrare le birre per nome
    searchBeersByName(name: string): void {
      if (!name) {
        this.beers = this.allBeers.slice(); // Mostra tutte le birre se il campo di ricerca è vuoto
        return;
      }
      // Filtra le birre in base al nome
      this.beers = this.allBeers.filter((beer: any) =>
        beer.name.toLowerCase().includes(name.toLowerCase())
      );
      this.updatePage(); // Aggiorna la paginazione con i nuovi dati filtrati
    }


    handleBeerNameEvent(name: string): void {
      this.beerService.setBeerName(name);
      this.updatePage(); // Aggiorna la visualizzazione quando il nome della birra cambia
    }
  }

