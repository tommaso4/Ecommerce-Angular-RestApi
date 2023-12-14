import { Component } from '@angular/core';

@Component({
  selector: 'app-bancomat',
  templateUrl: './bancomat.component.html',
  styleUrls: ['./bancomat.component.scss']
})
export class BancomatComponent {

  bancomatNumber: string = '';

  submitForm(form: any) {
    if (form.valid) {
      console.log('Numero Bancomat valido:', this.bancomatNumber);
    } else {
      console.log('Il modulo Bancomat non è valido.');
    }
  }
}
