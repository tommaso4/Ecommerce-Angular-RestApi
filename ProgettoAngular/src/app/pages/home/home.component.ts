import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Beer } from '../../core/models/beer.model';
import { BeerService } from '../../core/services/beer.service';
import { PaginatorService } from '../../core/services/paginator.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

  export class HomeComponent implements OnInit {
    beers: any[] = [];
    allBeers: any[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 25;

    constructor(
      private beerService: BeerService,
      private paginatorService: PaginatorService
    ) {}

    ngOnInit(): void {
      this.fetchBeers();
    }


    fetchBeers(): void {
      this.beerService.getBeers().subscribe({
        next: (data: any[]) => {
          this.allBeers = data;
          this.updatePage(); // Aggiorna la visualizzazione
          console.log(this.allBeers)
        },
        error: (error) => {
          console.error('Errore nel recupero delle birre:', error);
        }
      });
    }


    updatePage(): void {
      if (this.beerService.beerName) {
        this.beers = this.allBeers.filter((beer: any) =>
          beer.name.toLowerCase().includes(this.beerService.beerName.toLowerCase())
        );
      } else {
        this.beers = this.paginatorService.paginate(this.allBeers, this.currentPage, this.itemsPerPage);
      }
    }

    onPageChange(page: number): void {
      this.currentPage = page;
      this.updatePage();
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

