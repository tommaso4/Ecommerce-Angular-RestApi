import { Component } from '@angular/core';
import { BeerService } from '../../../services/beer.service';
import { Ibeer } from '../../../Modules/ibeer';
import { PaginatorService } from '../../../services/paginator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserAuth } from '../../../Modules/iuser-auth';
import { LogSystemService } from '../../../services/log-system.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-white-beer',
  templateUrl: './white-beer.component.html',
  styleUrl: './white-beer.component.scss'
})
export class WhiteBeerComponent {
  beer:Ibeer[] = [];
  isLogged: boolean = false;
  beerId!: number;
  birra!: Ibeer;

  constructor(
    private beerSvc: BeerService,
    private route: ActivatedRoute,
    private LSS:LogSystemService,
  ) {}

  ngOnInit(){
    this.InBirreWhite();
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');
      if (idString !== null) {
        this.beerId = +idString;
        this.getBeerDetails();
      } else {
        console.error('ID della birra non presente nei parametri');
      }
    });

    this.LSS.user$.subscribe((user:IUserAuth|null)=>{
      this.isLogged=!!user;
    })
  }

  addToWish(beerid:number){
    this.LSS.user$.subscribe(accessData=>{
      if(!accessData?.user?.id) return;
      this.beerSvc.addToWishList(beerid, accessData.user.id).pipe(take(1)).subscribe(
        )
    })
  }

  getBeerDetails(): void {
    this.beerSvc.getBeerById(this.beerId).subscribe({
      next: (beer: Ibeer) => {
        this.birra = beer;
        console.log('Dettagli della birra:', this.beer);
      },
      error: (error) => {
        console.error('Errore nel recupero dei dettagli della birra:', error);
      }
    });
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
