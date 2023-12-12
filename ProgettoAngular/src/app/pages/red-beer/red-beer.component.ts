import { Component } from '@angular/core';
import { Ibeer } from '../../Modules/ibeer';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-red-beer',
  templateUrl: './red-beer.component.html',
  styleUrl: './red-beer.component.scss'
})
export class RedBeerComponent {

  beer:Ibeer[] = [];

  birreRosse:any;

  constructor(private beerSvc:BeerService){}

  ngOnInit(){
    this.beerSvc.getRedBeer().subscribe(res=>{
      this.birreRosse = res;
      this.beer.push(this.birreRosse);
    })
  }
}
