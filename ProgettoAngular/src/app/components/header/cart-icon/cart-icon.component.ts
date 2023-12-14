import { Component } from '@angular/core';
import { LogSystemService } from '../../../services/log-system.service';
import { CartService } from '../../../services/cart.service';
import { IUserAuth } from '../../../Modules/iuser-auth';
import { IShop } from '../../../Modules/ishop';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.scss'
})
export class CartIconComponent {

  isLogged = false;
  user!: IUserAuth;
  totalCart!: number;
  allItem: IShop[] = [];
  loggedInUser: IUserAuth | null = null;
  userId! : number

  constructor(
    private LSS: LogSystemService,
    private cartSvc: CartService
  ) {}

  ngOnInit() {
    this.LSS.user$.subscribe((user: IUserAuth | null) => {
      this.loggedInUser = user;
      this.userId = Number(user?.user.id)
      this.isLogged = !!user;
    });
    this.fetchShopUpdate(this.userId);
    this.cartSvc.getTotalCart().subscribe((total: number) => {
      this.totalCart = total;
    });
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
