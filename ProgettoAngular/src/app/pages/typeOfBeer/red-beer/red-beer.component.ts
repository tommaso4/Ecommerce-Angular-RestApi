import { Component } from '@angular/core';
import { Ibeer } from '../../../Modules/ibeer';
import { BeerService } from '../../../services/beer.service';

@Component({
  selector: 'app-red-beer',
  templateUrl: './red-beer.component.html',
  styleUrl: './red-beer.component.scss'
})
export class RedBeerComponent {

  beer:Ibeer[] = [];

  constructor(private beerSvc:BeerService){}

  ngOnInit(){
    this.InBirreRosse();
  }

  InBirreRosse(){
    this.beerSvc.getRedBeer().subscribe(
      (beer) => {
        this.beer = beer;
        console.log(this.beer);
      }
    )
  }
}
