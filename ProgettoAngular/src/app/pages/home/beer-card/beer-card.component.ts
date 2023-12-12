import { Component, Input } from '@angular/core';
import { Beer } from '../../../core/models/beer.model';


@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss']
})
export class BeerCardComponent {
  @Input() beer: Beer = { id: 0, name: '', abv: 0, image_url: '', price : 0 };

  constructor() { }
}
