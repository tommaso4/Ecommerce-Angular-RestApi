import { Component, EventEmitter, Output } from '@angular/core';
import { BeerService } from '../../services/beer.service';

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
    const nome = target.value;

    this.beerService.setBeerName(nome);
    this.beerNameEvent.emit(nome); // Invia il nome inserito tramite evento
  }
}

