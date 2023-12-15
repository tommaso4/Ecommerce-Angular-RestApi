import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IShop } from '../../Modules/ishop';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  totalCart!: number;
  allItem : IShop[] | null =[];

  constructor(private cartSvc: CartService) {

  }

  ngOnInit() {
    this.fetchCart();
    this.cartSvc.allItem$.subscribe((items) => {
      this.allItem = items;
      console.log(this.allItem);
  })}


  fetchCart(){
    this.cartSvc.cart$.subscribe((total: number) => {
      this.totalCart = total;
      console.log(this.totalCart);
    });
}
}


