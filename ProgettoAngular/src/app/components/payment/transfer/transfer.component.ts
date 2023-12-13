import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {
  transferForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.transferForm = this.fb.group({
      accountHolder: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.pattern('[0-9]{12}')]],
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  submitForm() {
    if (this.transferForm.valid) {
      console.log('Dati Bonifico validi:', this.transferForm.value);
    } else {
      console.log('Il modulo Bonifico non è valido.');
    }
  }
}
