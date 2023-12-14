import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LogSystemService } from '../../../services/log-system.service';
import { BeerService } from '../../../services/beer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {

  transferForm: FormGroup;
  totalCart!:number;


  constructor(private fb: FormBuilder,
    private logSvc : LogSystemService,
    private beerSvc : BeerService,
    private router: Router) {
    this.transferForm = this.fb.group({
      accountHolder: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern('[0-9]{12}')]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(){
    this.totalCart = this.beerSvc.totalCart;
  }

  submitForm() {
    if (this.transferForm.valid) {
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
      console.log('Il modulo Bonifico non è valido.');
    }
  }
}
