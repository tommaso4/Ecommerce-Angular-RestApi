import { Component, Input, OnInit } from '@angular/core';
import { Ibeer } from '../../Modules/ibeer';
import { BeerService } from '../../services/beer.service';
import { IUserAuth } from '../../Modules/iuser-auth';
import { IShop } from '../../Modules/ishop';
import { LogSystemService } from '../../services/log-system.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-add-to-shop',
  templateUrl: './add-to-shop.component.html',
  styleUrls: ['./add-to-shop.component.scss']
})
export class AddToShopComponent implements OnInit {
  @Input() totalCart:number = 0;
  @Input() beer!: Ibeer;
  allItem: IShop[] = [];
  loggedInUser: IUserAuth | null = null;
  isLogged: boolean = false;
  userId! : number

  constructor(
   private LSS: LogSystemService,
   private cartSvc: CartService) {}

  ngOnInit(): void {
    this.LSS.user$.subscribe((user: IUserAuth | null) => {
      this.loggedInUser = user;
      this.userId = Number(user?.user.id)
      this.isLogged = !!user;
      if (user && user.user.id && this.beer) {
      }
    });
    this.cartSvc.cart$.subscribe((total: number) => {
      this.totalCart = total;
    });
  }

  fetchShop(userId: number): void {
    this.cartSvc.getShop(userId).subscribe({
      next: (data: any) => {
        this.allItem = data;
        console.log(this.allItem);
        this.addToShop();
      },
      error: (error) => {
        console.error('Errore nel recupero delle birre:', error);
      }
    });
  }

  addToShop() {
    if (!this.beer) {
      console.error('Nessuna birra selezionata.');
      return;
    }

    const accessData = this.loggedInUser;

    if (!accessData) {
      alert("Per aggiungere ai preferiti devi loggarti o registrarti");
      return;
    }

    const existingBeerIndex = this.allItem.findIndex(item => item.beerId === this.beer.id);

    if (existingBeerIndex !== -1) {
      const existingBeer = this.allItem[existingBeerIndex];
      const numberBeerToUpdate: number = existingBeer.numberBeer !== undefined ? existingBeer.numberBeer + 1 : 1;

      this.cartSvc.updateShopItem(existingBeer.id, {
        nameBeer: this.beer.nome,
        beerId: this.beer.id,
        numberBeer: numberBeerToUpdate,
        userId: accessData.user.id,
        price: this.beer.prezzo,
        img: this.beer.urlImmagine,
        totalPrice: this.beer.prezzo * numberBeerToUpdate
      }).subscribe((data: any) => {
        console.log('Birra aggiornata:', data);
        this.fetchShopUpdate(this.userId)
      });

    } else {
      this.cartSvc.addToShop(Number(accessData.user.id), {
        nameBeer: this.beer.nome,
        beerId: this.beer.id,
        numberBeer: 1,
        price: this.beer.prezzo,
        img: this.beer.urlImmagine,
        totalPrice: this.beer.prezzo
      }).subscribe((data: any) => {
        console.log('Birra creata:', data);
        this.fetchShopUpdate(this.userId)
      });
    }
  }

  calculateTotalCart() {
    this.totalCart = this.allItem.reduce((total, item) => total + item.totalPrice, 0);
  }

  fetchShopUpdate(userId: number): void {
    this.cartSvc.getShop(userId).subscribe({
      next: (data: any) => {
        this.allItem = data;
        console.log(this.allItem);
        const updatedTotal = this.cartSvc.calculateTotalCart(this.allItem);
        this.cartSvc.setTotalCart(updatedTotal);
      },
      error: (error) => {
        console.error('Errore nel recupero delle birre:', error);
      }
    });
  }
}

