import { Component, Input, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Ibeer } from '../../Modules/ibeer';
import { LogSystemService } from '../../services/log-system.service';
import { WhishlistService } from '../../services/whishlist.service';
import { IUserAuth } from '../../Modules/iuser-auth';
import { BeerService } from '../../services/beer.service';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss']
})
export class BeerCardComponent implements OnDestroy {
  @Input() beer!: Ibeer;
  wishlistItems: any[] = [];
  loggedInUser: IUserAuth | null = null;
  isLogged: boolean = false;
  userId!: number;
  isInWishlist: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private logService: LogSystemService,
    private wishlistSvc: WhishlistService,
    private beerSvc: BeerService
  ) {
    this.logService.user$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: IUserAuth | null) => {
        this.loggedInUser = user;
        this.userId = Number(user?.user.id);
        this.isLogged = !!user;
      });
  }
  ngOnInit(): void {
    this.fetchWishlist();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addToWishList(beerId: number, event:Event): void {
    event.stopPropagation();
    if (!this.loggedInUser || !this.loggedInUser.user.id) {
      console.error('Utente non autorizzato');
      return;
    }

    const isProductInWishlist = this.wishlistItems.some(item => item.beerId === beerId);

    if (isProductInWishlist) {
      const existingWishlistItem = this.wishlistItems.find(item => item.beerId === beerId);

      if (existingWishlistItem) {
        this.wishlistSvc.removeWish(existingWishlistItem.id).subscribe((data: any) => {
          console.log('Prodotto rimosso dalla lista dei desideri:', data);
        });
      }
    } else {
      this.wishlistSvc.addToWishList(beerId, this.userId).subscribe((data: any) => {
        console.log('Birra aggiunta alla lista dei desideri:', data)
      });
    }
    this.fetchWishlist();
  }

  fetchWishlist(): void {
    this.wishlistSvc.getWishlist(this.userId).subscribe({
      next: (data: any) => {
        this.wishlistItems = data;
        this.checkIfInWishlist();
      },
      error: (error) => {
        console.error('Errore nel recupero della lista dei desideri:', error);
      }
    });
  }

  checkIfInWishlist(): void {
    // Verifica se il prodotto è nella lista dei desideri e aggiorna isInWishlist
    if (this.loggedInUser && this.loggedInUser.user.id) {
      const isProductInWishlist = this.wishlistItems.some(item => item.beerId === this.beer.id);
      this.isInWishlist = isProductInWishlist;
    }
  }


}
