import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerService } from '../../core/services/beer.service';
import { Beer } from '../../core/models/beer.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {


  beerId!: number;
  beer!: any;

  constructor(
    private route: ActivatedRoute,
    private beerService: BeerService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString !== null) {
        this.beerId = +idString;
        this.getBeerDetails();
      } else {
        console.error('ID della birra non presente nei parametri');
      }
    });
  }


  getBeerDetails(): void {
    this.beerService.getBeerById(this.beerId).subscribe({
      next: (beer: Beer) => {
        this.beer = beer;
        console.log('Dettagli della birra:', this.beer);
      },
      error: (error) => {
        console.error('Errore nel recupero dei dettagli della birra:', error);
      }
    });
  }

  addToFavorite(){

  }
}


