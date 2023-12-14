import { Component } from '@angular/core';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
    totalCart!:number;

    constructor(private beerSvc : BeerService){}

    ngOnInit(){
      this.totalCart = this.beerSvc.totalCart;
    }
}
