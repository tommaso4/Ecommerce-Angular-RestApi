import { Component, Input } from '@angular/core';

import { Ibeer } from '../../Modules/ibeer';
import { take } from 'rxjs';
import { BeerService } from '../../services/beer.service';
import { LogSystemService } from '../../services/log-system.service';
import { WhishlistService } from '../../services/whishlist.service';


@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss']
})
export class BeerCardComponent {
  @Input() beer!: Ibeer;
  islogged:boolean = true;

  constructor(
    private logService: LogSystemService,
    private wishlistSvc: WhishlistService) { }

   addToWishList(beerId: number,event:Event): void {
    event.stopPropagation()
    this.logService.user$.subscribe(accessData => {
      if (!accessData?.user?.id) return;
      this.wishlistSvc.addToWishList(beerId, accessData.user.id).pipe(take(1)).subscribe(
      )
    });
  }

}
