import { Component, Input, OnInit } from '@angular/core';
import { Ibeer } from '../../Modules/ibeer';
import { BeerService } from '../../services/beer.service';
import { IUserAuth } from '../../Modules/iuser-auth';
import { IShop } from '../../Modules/ishop';
import { LogSystemService } from '../../services/log-system.service';

@Component({
  selector: 'app-add-to-shop',
  templateUrl: './add-to-shop.component.html',
  styleUrls: ['./add-to-shop.component.scss']
})
export class AddToShopComponent implements OnInit {
  @Input() beer!: Ibeer;
  allItem: IShop[] = [];
  loggedInUser: IUserAuth | null = null;
  isLogged: boolean = false;
  userId! : number

  constructor(private beerService: BeerService, private LSS: LogSystemService) {}

  ngOnInit(): void {
    this.LSS.user$.subscribe((user: IUserAuth | null) => {
      this.loggedInUser = user;
      this.userId = Number(user?.user.id)
      this.isLogged = !!user;
      if (user && user.user.id && this.beer) {
      }
    });
  }

  fetchShop(userId: number): void {
    this.beerService.getShop(userId).subscribe({
      next: (data: any) => {
        this.allItem = data;
        console.log(this.allItem);
        this.addToShop();
      },
      error: (error) => {
        console.error('Errore nel recupero delle birre:', error);
      }
    });
  }


  addToShop() {
    if (!this.beer) {
      console.error('Nessuna birra selezionata.');
      return;
    }

    const accessData = this.loggedInUser;

    if (!accessData) {
      alert("Per aggiungere ai preferiti devi loggarti o registrarti");
      return;
    }



    const existingBeerIndex = this.allItem.findIndex(item => item.beerId === this.beer.id);

    if (existingBeerIndex !== -1) {
      const existingBeer = this.allItem[existingBeerIndex];
      const numberBeerToUpdate: number = existingBeer.numberBeer !== undefined ? existingBeer.numberBeer + 1 : 1;

      this.beerService.updateShopItem(existingBeer.id, {
        nameBeer: this.beer.nome,
        beerId: this.beer.id,
        numberBeer: numberBeerToUpdate,
        userId: accessData.user.id,
        price: this.beer.prezzo,
        img: this.beer.urlImmagine,
        totalPrice: this.beer.prezzo * numberBeerToUpdate
      }).subscribe((data: any) => {
        console.log('Birra aggiornata:', data);
      });
    } else {
      this.beerService.addToShop(Number(accessData.user.id), {
        nameBeer: this.beer.nome,
        beerId: this.beer.id,
        numberBeer: 1,
        price: this.beer.prezzo,
        img: this.beer.urlImmagine,
        totalPrice: this.beer.prezzo * 1
      }).subscribe((data: any) => {
        console.log('Birra creata:', data);

      });
    }
  }


}
