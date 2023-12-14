import { Component } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { LogSystemService } from '../../services/log-system.service';
import { IUserAuth } from '../../Modules/iuser-auth';
import { IShop } from '../../Modules/ishop';
import { Ibeer } from '../../Modules/ibeer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  beer!: Ibeer;
  allItem: IShop[] = [];
  loggedInUser: IUserAuth | null = null;
  isLogged: boolean = false;
  userId! : number

  constructor
  (private beerSvc: BeerService,
   private LSS: LogSystemService){}

  ngOnInit(): void {
    this.LSS.user$.subscribe((user: IUserAuth | null) => {
      this.loggedInUser = user;
      this.userId = Number(user?.user.id)
      this.isLogged = !!user;
      this.fetchShop(this.userId);
    });
  }

  fetchShop(userId: number): void {
    this.beerSvc.getShop(userId).subscribe({
      next: (data: any) => {
        this.allItem = data;
        console.log(this.allItem);
      },
      error: (error) => {
        console.error('Errore nel recupero delle birre:', error);
      }
    });
  }
}
