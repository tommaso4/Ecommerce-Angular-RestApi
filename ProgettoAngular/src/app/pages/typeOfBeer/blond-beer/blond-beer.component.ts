import { Component } from '@angular/core';
import { BeerService } from '../../../services/beer.service';
import { Ibeer } from '../../../Modules/ibeer';
import { ActivatedRoute } from '@angular/router';
import { LogSystemService } from '../../../services/log-system.service';
import { IUserAuth } from '../../../Modules/iuser-auth';
import { take } from 'rxjs';
import { WhishlistService } from '../../../services/whishlist.service';

@Component({
  selector: 'app-blond-beer',
  templateUrl: './blond-beer.component.html',
  styleUrl: './blond-beer.component.scss'
})
export class BlondBeerComponent {
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
    this.InBirreBlond();
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
      console.log(beerid);

      this.whishlistSvc.addToWishList(beerid,Number( accessData.user.id)).pipe(take(1)).subscribe(
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

  InBirreBlond(){
    this.beerSvc.getBlondBeer().subscribe(
      (beer) => {
        this.beer = beer;
        console.log(this.beer);
      }
    )
  }
}


