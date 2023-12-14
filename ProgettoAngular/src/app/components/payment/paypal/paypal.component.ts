import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent {
  paypalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.paypalForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm() {
    if (this.paypalForm.valid) {
      console.log('Dati PayPal validi:', this.paypalForm.value);
    } else {
      console.log('Il modulo PayPal non è valido.');
    }
  }
}
