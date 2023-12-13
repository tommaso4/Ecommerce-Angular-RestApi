import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';

import { BeerService } from '../../services/beer.service';
import { PaginatorService } from '../../services/paginator.service';
import { Router } from '@angular/router';
import { LogSystemService } from '../../services/log-system.service';


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
      private paginatorService: PaginatorService,
      private router: Router,
     private logService:LogSystemService
    ) {}

    ngOnInit(): void {
      this.fetchBeers();
    }

    fetchBeers(): void {
      this.beerService.getBeers().subscribe({
        next: (data: any[]) => {
          this.allBeers = data;
          this.updatePage();
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
          beer.nome.toLowerCase().includes(this.beerService.beerName.toLowerCase())
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
    searchBeersByName(nome: string): void {
      if (!nome) {
        this.beers = this.allBeers.slice(); // Mostra tutte le birre se il campo di ricerca è vuoto
        return;
      }
      // Filtra le birre in base al nome
      this.beers = this.allBeers.filter((beer: any) =>
        beer.nome.toLowerCase().includes(nome.toLowerCase())
      );
      this.updatePage(); // Aggiorna la paginazione con i nuovi dati filtrati
    }


    handleBeerNameEvent(nome: string): void {
      this.beerService.setBeerName(nome);
      this.updatePage(); // Aggiorna la visualizzazione quando il nome della birra cambia
    }
    //metodo per aggiungere la birra alla lista dei desideri da richiamare nel bottone addToWishList nella pagina edit component
  addToWishList(beerId:number): void {
    this.logService.user$.subscribe(accessData=>{
      if(!accessData?.user?.id) return;
    this.beerService.addToWishList(beerId,accessData.user.id).pipe(take(1)).subscribe(


    )});
  }
  }

