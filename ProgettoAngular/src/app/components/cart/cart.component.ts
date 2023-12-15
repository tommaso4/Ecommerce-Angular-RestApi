
import { Component } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { LogSystemService } from '../../services/log-system.service';
import { IUserAuth } from '../../Modules/iuser-auth';
import { IShop } from '../../Modules/ishop';
import { Ibeer } from '../../Modules/ibeer';
import { CartService } from '../../services/cart.service';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

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
  totalCart: number = 0;
  private apiUrlShop = environment.apiUrlShop;


  constructor
  (private beerSvc: BeerService,
   private LSS: LogSystemService,
   private cartSvc: CartService,
   private router: Router){}

  ngOnInit(): void {
    this.LSS.user$.subscribe((user: IUserAuth | null) => {
      this.loggedInUser = user;
      this.userId = Number(user?.user.id)
      this.isLogged = !!user;
      this.fetchShop(this.userId);
    });
  }

  totalsCart(){
    this.allItem.forEach(item => {this.totalCart += item.totalPrice})
    this.cartSvc.setTotalCart(this.totalCart)
    console.log(this.totalCart);
  }

  fetchShop(userId: number): void {
    this.cartSvc.getShop(userId).subscribe({
      next: (data: any) => {
        this.allItem = data;
        console.log(this.allItem);
        this.totalsCart()
      },
      error: (error) => {
        console.error('Errore nel recupero delle birre:', error);
      }
    });
  }

  updateQuantity(event: any, beerId: number) {
    const accessData = this.loggedInUser;
    if (!accessData) {
      alert("Per aggiornare il carello devi loggarti o registrarti");
      return;
    }
    const newQuantity = parseInt(event.target.value, 10);
    if (isNaN(newQuantity) || newQuantity <= 0) {
      console.error('La quantità deve essere un numero valido e maggiore di zero.');
      return;
    }
    const index = this.allItem.findIndex(item => item.beerId === beerId);
    if (index !== -1) {
      this.cartSvc.updateShopItem(this.allItem[index].id, {
        nameBeer: this.allItem[index].nameBeer,
        beerId: this.allItem[index].id,
        numberBeer: newQuantity,
        userId: accessData.user.id,
        price: this.allItem[index].price,
        img: this.allItem[index].img,
        totalPrice: this.allItem[index].price * newQuantity
      }).subscribe((data: any) => {
        console.log('Birra aggiornata:', data);
      });
      this.allItem[index].numberBeer = newQuantity;
      this.allItem[index].totalPrice = this.allItem[index].price * newQuantity;
      this.calculateTotalCart();
      const updatedTotal = this.cartSvc.calculateTotalCart(this.allItem);
      this.cartSvc.setTotalCart(updatedTotal);

    }
  }

  calculateTotalCart() {
    this.totalCart = this.allItem.reduce((total, item) => total + item.totalPrice, 0);
  }

  delateItemCart(itemId?: number) {
    if (itemId !== undefined) {
      this.cartSvc.deleteCart(itemId).subscribe(() => {
        this.allItem = this.allItem.filter(item => item.id !== itemId);
        this.fetchShop(this.userId);
        this.calculateTotalCart();
      });
    } else {
      console.error('itemId è undefined. Impossibile eliminare l\'elemento.');
    }
  }

  deleteAll() {
    this.allItem.forEach(item => {
     this.cartSvc.deleteCart(item.id).subscribe({
      next: (data: any) => {
        const index = this.allItem.indexOf(item);
        if (index > -1) {
          this.allItem.splice(index, 1);
        }
        this.cartSvc.setTotalCart(0);
        this.totalCart = 0;
      },
      error: (error) => {
        console.error(`Errore durante la cancellazione degli elementi. URL: ${this.apiUrlShop}`, error);
      }
    });
  });
  }

  goToPaymentPage(): void {
    this.router.navigate(['/payment']);
  }
}
