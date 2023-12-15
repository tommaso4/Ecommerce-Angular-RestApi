import { Component, Input, OnDestroy } from '@angular/core';
import { Ibeer } from '../../Modules/ibeer';
import { LogSystemService } from '../../services/log-system.service';
import { WhishlistService } from '../../services/whishlist.service';
import { IUserAuth } from '../../Modules/iuser-auth';
import { IwishListItem } from '../../Modules/iwishListItem';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss'],
})
export class BeerCardComponent {
  @Input() beer!: Ibeer;
  wishlistItems: IwishListItem[] | null = [];
  loggedInUser: IUserAuth | null = null;
  isLogged: boolean = false;
  userId!: string | undefined;
  isInWishlist: boolean = false;

  constructor(
    private logService: LogSystemService,
    private wishlistSvc: WhishlistService
  ) {
    this.logService.user$.subscribe((user: IUserAuth | null) => {
      this.loggedInUser = user;
      this.userId = user?.user.id;
      this.isLogged = !!user;
    });
  }
  ngOnInit() {
    this.wishlistSvc.whishlistItem$.subscribe((items) => {
      this.wishlistItems = items;
      console.log(this.wishlistItems);
      this.checkIfInWishlist();
    });
    console.log(this.beer);
  }

  addToWishList(beerId: number): void {
    this.fetchWishlist();
    if (!this.loggedInUser || !this.loggedInUser.user.id) {
      console.error('Utente non autorizzato');
      return;
    }
    if (!this.wishlistItems) return;
    const isProductInWishlist = this.wishlistItems.some(
      (item) => item.beerId === beerId
    );

    if (isProductInWishlist) {
      const existingWishlistItem = this.wishlistItems.find(
        (item) => item.beerId === beerId
      );

      if (existingWishlistItem) {
        this.wishlistSvc
          .removeWish(existingWishlistItem.id)
          .subscribe((data: any) => {
            console.log('Prodotto rimosso dalla lista dei desideri:', data);
          });
          this.isInWishlist = false;
      }
    } else {
      this.wishlistSvc
        .addToWishList(beerId, String(this.userId))
        .subscribe((data: any) => {
          console.log('Birra aggiunta alla lista dei desideri:', data);
        });
        this.isInWishlist = true;
    }
    this.fetchWishlist();
  }

  fetchWishlist() {
    this.wishlistSvc.getWishlist(String(this.userId)).subscribe({
      next: (data: any) => {
        this.wishlistItems = data;
      },
      error: (error) => {
        console.error('Errore nel recupero della lista dei desideri:', error);
      },
    });
  }

  checkIfInWishlist(): void {
    if (!this.wishlistItems) return;
    if (this.loggedInUser && this.loggedInUser.user.id) {
      const isProductInWishlist = this.wishlistItems.some(item => item.beerId === this.beer.id);
      this.isInWishlist = isProductInWishlist;
    }
  }
}
