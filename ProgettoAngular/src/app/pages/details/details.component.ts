import { RolesService } from './../../services/roles.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerService } from '../../services/beer.service';
import { Ibeer } from '../../Modules/ibeer';
import { LogSystemService } from '../../services/log-system.service';
import { IUserAuth } from '../../Modules/iuser-auth';
import { take} from 'rxjs';
import { IShop } from '../../Modules/ishop';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  admin!:boolean
  isLogged: boolean = false;
  beerId!: number;
  beer!: Ibeer;
  allItem: IShop[]= [];

  constructor(
    private route: ActivatedRoute,
    private beerService: BeerService,
    private LSS:LogSystemService,
    private RolesSVC:RolesService
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

    this.LSS.user$.subscribe((user: IUserAuth | null) => {
      this.isLogged = !!user;
      if (user && user.user.id) {
        const userId = Number(user.user.id); // Ottieni l'ID dell'utente da LSS.user$
        this.fetchShop(userId); // Passa l'ID dell'utente a fetchShop() per ottenere le birre associate a quell'utente
      }
    });

    this.RolesSVC.userRole$.subscribe(role =>{
      if(!role) return;
      this.admin=role.role==`admin`?true:false
    });
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


  fetchShop(userId: number): void {
    this.beerService.getShop(userId).subscribe({
      next: (data:any) => {
        this.allItem = data; // Assegna l'array di IShop alla variabile allItem
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
      this.beerService.addToWishList(beerid, accessData.user.id).pipe(take(1)).subscribe( )
    })
  }
}


