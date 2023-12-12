import { Component } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Ibeer } from '../../Modules/ibeer';

@Component({
  selector: 'app-blond-beer',
  templateUrl: './blond-beer.component.html',
  styleUrl: './blond-beer.component.scss'
})
export class BlondBeerComponent {
  beer:Ibeer[] = [];

  constructor(private beerSvc:BeerService){}

  ngOnInit(){
    this.InBirreBlond();
  }

  InBirreBlond(){
    this.beerSvc.getBlondBeer().subscribe(
      (beer) => {
        this.beer = beer;
        console.log(this.beer);
      }
    )
  }
}
