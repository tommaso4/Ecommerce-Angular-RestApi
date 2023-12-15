import { Component } from '@angular/core';
import { BeerService } from '../../services/beer.service';

import { ICreateBeer } from '../../Modules/i-create-beer';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  beer: ICreateBeer = {
    nome: '',
    slogan: '',
    descrizione: '',
    primaProduzione: '',
    urlImmagine: '',
    abv: 0,
    ebc: 0,
    srm: 0,
    prezzo: 0,
  };


  constructor(private beerService: BeerService) { }

  submitForm() {
    this.beerService.createBeer(this.beer).subscribe({
      next: (newBeer: ICreateBeer) => {

        console.log('Nuova birra creata:', newBeer);

      },
      error: (error) => {
        console.error('Errore durante la creazione della birra:', error);

      }
    });
  }
}
