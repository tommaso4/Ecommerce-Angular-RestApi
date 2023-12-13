import { Component } from '@angular/core';
import { BeerService } from '../../../services/beer.service';
import { Ibeer } from '../../../Modules/ibeer';
import { PaginatorService } from '../../../services/paginator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-white-beer',
  templateUrl: './white-beer.component.html',
  styleUrl: './white-beer.component.scss'
})
export class WhiteBeerComponent {
  beer:Ibeer[] = [];

  constructor(
    private beerSvc: BeerService,
    private paginatorService: PaginatorService,
    private router: Router
  ) {}

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
