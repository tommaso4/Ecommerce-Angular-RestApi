import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerService } from '../../services/beer.service';
import { Ibeer } from '../../Modules/ibeer';
import { LogSystemService } from '../../services/log-system.service';
import { WhishlistService } from '../whishlist/whishlist.service';
import { IUserAuth } from '../../Modules/iuser-auth';
import { Observable, map, take, tap } from 'rxjs';
import { IShop } from '../../Modules/ishop';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  isLogged: boolean = false;
  beerId!: number;
  beer!: Ibeer;
  allItem: IShop[]= [];

  constructor(
    private route: ActivatedRoute,
    private beerService: BeerService,
    private LSS:LogSystemService,
    private whishlistService: WhishlistService
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

    this.LSS.user$.subscribe((user:IUserAuth|null)=>{
      this.isLogged=!!user;
    })
  }

  getBeerDetails(): void {
    this.beerService.getBeerById(this.beerId).subscribe({
      next: (beer: Ibeer) => {
        this.beer = beer;
        console.log('Dettagli della birra:', this.beer);
      },
      error: (error) => {
        console.error('Errore nel recupero dei dettagli della birra:', error);
      }
    });
  }


  addToShop() {
    this.LSS.user$.subscribe((accessData) => {
      if (!accessData) {
        alert("Per aggiungere ai preferiti devi loggarti o registrarti");
        return;
      }

      if (!this.beer) {
        return;
      }

      const beerExists = this.allItem.some(item => item.beerId === this.beer.id);

      if (beerExists) {
        const existingBeer = this.allItem.find(item => item.beerId === this.beer.id);
        if (!existingBeer || !existingBeer.id) {
          console.error('ID della birra esistente non valido.');
          return;
        }

        const numberBeerToUpdate = existingBeer.numberBeer !== undefined ? existingBeer.numberBeer + 1 : 1;

        this.beerService.updateShopItem(existingBeer.id, {
          nameBeer: this.beer.nome,
          beerId: this.beer.id,
          numberBeer: numberBeerToUpdate,
        }).subscribe((data: any) => {
          console.log('Birra aggiornata:', data);
          this.fetchShop();
        });
      } else {
        this.beerService.addToShop(Number(accessData.user.id), {
          nameBeer: this.beer.nome,
          beerId: this.beer.id,
        }).subscribe((data: any) => {
          console.log('Birra creata:', data);
          this.fetchShop();
        });
      }
    });
  }





  fetchShop(): void {
    this.beerService.getShop().subscribe({
      next: (data: any[]) => {
        this.allItem = data;
        console.log('Tutte le birre presenti nello shop:', this.allItem);
      },
      error: (error) => {
        console.error('Errore nel recupero delle birre:', error);
      }
    });
  }

  addToWish(beerid:number):void{
    this.LSS.user$.subscribe(accessData=>{
      if(!accessData?.user?.id) return;
      this.beerService.addToWishList(beerid, accessData.user.id).pipe(take(1)).subscribe(
        )
    })
  }

}


