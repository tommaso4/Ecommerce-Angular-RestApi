import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  totalCart!: number;

  constructor(private cartSvc: CartService) {}

  ngOnInit() {
    this.cartSvc.getTotalCart().subscribe((total: number) => {
      this.totalCart = total;
      console.log(this.totalCart);
    });
  }
}

