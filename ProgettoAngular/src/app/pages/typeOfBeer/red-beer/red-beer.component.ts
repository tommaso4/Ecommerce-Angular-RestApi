import { Component } from '@angular/core';
import { Ibeer } from '../../../Modules/ibeer';
import { BeerService } from '../../../services/beer.service';
import { ActivatedRoute } from '@angular/router';
import { LogSystemService } from '../../../services/log-system.service';
import { IUserAuth } from '../../../Modules/iuser-auth';
import { take } from 'rxjs';
import { WhishlistService } from '../../../services/whishlist.service';

@Component({
  selector: 'app-red-beer',
  templateUrl: './red-beer.component.html',
  styleUrl: './red-beer.component.scss'
})
export class RedBeerComponent {

  beer:Ibeer[] = [];
  isLogged: boolean = false;
  beerId!: number;
  birra!: Ibeer;
  constructor(
    private beerSvc:BeerService,
    private route: ActivatedRoute,
    private LSS:LogSystemService,
    private whishlistSvc: WhishlistService){}

  ngOnInit(){
    this.InBirreRosse();
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
      this.whishlistSvc.addToWishList(beerid,Number(accessData.user.id)).pipe(take(1)).subscribe(
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

  InBirreRosse(){
    this.beerSvc.getRedBeer().subscribe(
      (beer) => {
        this.beer = beer;
        console.log(this.beer);
      }
    )
  }
}
