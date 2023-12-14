import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'] // Utilizza 'styleUrls' invece di 'styleUrl'
})
export class PaymentComponent implements OnInit {
  totalCart: number = 0;

  constructor(private cartSvc: CartService) {}

  ngOnInit() {
    this.cartSvc.getTotalCart().subscribe((total: number) => {
      this.totalCart = total;
    });
  }
}
