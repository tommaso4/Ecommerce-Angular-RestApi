import { Component, EventEmitter, Output } from '@angular/core';
import { BeerService } from '../../../core/services/beer.service';

@Component({
  selector: 'app-name-filter',
  templateUrl: './name-filter.component.html',
  styleUrls: ['./name-filter.component.scss']
})
export class NameFilterComponent {
  @Output() beerNameEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private beerService: BeerService) {}

  filterByName(event: Event) {
    const target = event.target as HTMLInputElement;
    const name = target.value;

    this.beerService.setBeerName(name);
    this.beerNameEvent.emit(name); // Invia il nome inserito tramite evento
  }
}

