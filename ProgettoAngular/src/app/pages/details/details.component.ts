import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerService } from '../../services/beer.service';
import { Ibeer } from '../../Modules/ibeer';
import { LogSystemService } from '../../services/log-system.service';
import { WhishlistService } from '../../components/whishlist/whishlist.service';
import { IUserAuth } from '../../Modules/iuser-auth';
import { take } from 'rxjs';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  isLogged: boolean = false;
  beerId!: number;
  beer!: Ibeer;

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
      if (accessData) {
        console.log(accessData);
        console.log('vvvvvvv:',this.beer);
        console.log(this.beer)
        if(!this.beer) return;
        this.beerService.addToShop(Number(accessData.user.id), {

          nameBeer: this.beer.nome,
          beerId: this.beer.id,
        });
      }else{

        alert("Per aggiungere ai preferiti devi loggarti o registrarti");
      }
    });
  }

  addToWish(beerid:number):void{
    this.LSS.user$.subscribe(accessData=>{
      if(!accessData?.user?.id) return;
      this.beerService.addToWishList(beerid, accessData.user.id).pipe(take(1)).subscribe( )
    })
  }
}


