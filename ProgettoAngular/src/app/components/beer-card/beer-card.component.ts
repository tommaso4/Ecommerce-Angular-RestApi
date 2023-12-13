import { Component, Input } from '@angular/core';

import { Ibeer } from '../../Modules/ibeer';


@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss']
})
export class BeerCardComponent {
  @Input() beer: Ibeer | null = null; // Inizializzato a null anziché {}

  constructor() { }
}
