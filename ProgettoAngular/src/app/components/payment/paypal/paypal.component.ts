import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogSystemService } from '../../../services/log-system.service';
import { BeerService } from '../../../services/beer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent {

  paypalForm: FormGroup;
  totalCart!:number;


  constructor(private fb: FormBuilder,
    private logSvc : LogSystemService,
    private beerSvc : BeerService,
    private router: Router) {
    this.paypalForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(){
    this.totalCart = this.beerSvc.totalCart;
  }


  submitForm() {
    if (this.paypalForm.valid) {
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

      })

    } else {
      console.log('Il modulo PayPal non è valido.');
    }
  }
}
