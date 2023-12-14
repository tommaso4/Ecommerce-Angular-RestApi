import { Component, Input } from '@angular/core';

import { Ibeer } from '../../Modules/ibeer';
import { take } from 'rxjs';
import { BeerService } from '../../services/beer.service';
import { LogSystemService } from '../../services/log-system.service';


@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss']
})
export class BeerCardComponent {
  @Input() beer!: Ibeer;
  islogged:boolean = true;

  constructor(private beerSvc:BeerService,private logService: LogSystemService) { }
  addToWishList(beerId: number): void {
    this.logService.user$.subscribe(accessData => {
      if (!accessData?.user?.id) return;
      this.beerSvc.addToWishList(beerId, accessData.user.id).pipe(take(1)).subscribe(
      )
    });
  }

}
