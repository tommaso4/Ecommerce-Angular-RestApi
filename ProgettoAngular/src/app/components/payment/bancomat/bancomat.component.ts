import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { LogSystemService } from '../../../services/log-system.service';
import { BeerService } from '../../../services/beer.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { IShop } from '../../../Modules/ishop';

@Component({
  selector: 'app-bancomat',
  templateUrl: './bancomat.component.html',
  styleUrls: ['./bancomat.component.scss']
})
export class BancomatComponent {

  bancomatNumber: string = '';
  totalCart!:number;


  constructor(
    private logSvc : LogSystemService,
    private cartSvc : CartService,
    private router: Router){}
    allItem : IShop[] | null =[];

    ngOnInit() {
      this.cartSvc.cart$.subscribe((total: number) => {
        this.totalCart = total;
      });
      this.cartSvc.allItem$.subscribe((items) => {
        this.allItem = items;
        console.log(this.allItem);
    })
    }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.logSvc.user$.subscribe( user =>{
        Swal.fire({
          position: "center",
            icon: "success",
            title: `Thanks you ${user?.user.name}!! Your order has been successfully!! You had pay ${this.totalCart} $}`,
            showConfirmButton: false,
            background: "#0a2f69",
            color: " #f6b74b",
            timer: 4000,
        }).then(() => {
          this.router.navigate(['/home']);
        });
        setTimeout(() => {
          this.deleteAll();
        }, 2000);
      })
    } else {
      console.log('Il modulo Bancomat non è valido.');
    }
  }

  deleteAll() {
    if(!this.allItem)return;
    this.allItem.forEach(item => {
     this.cartSvc.deleteCart(item.id).subscribe({
      next: (data: any) => {
        this.allItem=data;
        this.cartSvc.setTotalCart(0);
        this.totalCart = 0;
        this.cartSvc.setAllItemSubject([])
      },
      error: (error) => {
        console.error(`Errore durante la cancellazione degli elementi. URL: `, error);
      }
    });
  });
  }
}
