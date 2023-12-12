import { Component } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Ibeer } from '../../Modules/ibeer';

@Component({
  selector: 'app-white-beer',
  templateUrl: './white-beer.component.html',
  styleUrl: './white-beer.component.scss'
})
export class WhiteBeerComponent {
  beer:Ibeer[] = [];

  constructor(private beerSvc:BeerService){}

  ngOnInit(){
    this.InBirreWhite();
  }

  InBirreWhite(){
    this.beerSvc.getWhiteBeer().subscribe(
      (beer) => {
        this.beer = beer;
        console.log(this.beer);
      }
    )
  }
}
