import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { BeerService } from '../../services/beer.service';
import { PaginatorService } from '../../services/paginator.service';
import { LogSystemService } from '../../services/log-system.service';
import { IUserAuth } from '../../Modules/iuser-auth';
import { WhishlistService } from '../../services/whishlist.service';
import { IwishListItem } from '../../Modules/iwishListItem';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  beers: any[] = [];
  allBeers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 25;
  islogged:boolean = false;
  userId!: string|undefined;
  wishlistItems: IwishListItem[]=[]

  constructor(
    private beerService: BeerService,
    private paginatorService: PaginatorService,
    private logService: LogSystemService,
    private whishlistSvc: WhishlistService
    ) {}

  ngOnInit(): void {
    this.logService.user$.subscribe((user:IUserAuth|null)=>{
      this.islogged = !!user
      this.userId = user?.user.id
    })
    this.fetchBeers();
    this.getWhishlist();
  }

  fetchBeers(): void {
    this.beerService.getBeers().subscribe({
      next: (data: any[]) => {
        this.allBeers = data;
        this.updatePage();
        console.log(this.allBeers)
      },
      error: (error) => {
        console.error('Errore nel recupero delle birre:', error);
      }
    });
  }

  updatePage(): void {
    if (this.beerService.beerName) {
      this.beers = this.allBeers.filter((beer: any) =>
        beer.nome.toLowerCase().includes(this.beerService.beerName.toLowerCase())
      );
    } else {
      this.beers = this.paginatorService.paginate(this.allBeers, this.currentPage, this.itemsPerPage);
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

  searchBeersByName(nome: string): void {
    if (!nome) {
      this.beers = this.allBeers.slice();
      return;
    }
    // Filtra le birre in base al nome
    this.beers = this.allBeers.filter((beer: any) =>
      beer.nome.toLowerCase().includes(nome.toLowerCase())
    );
    this.updatePage();
  }

  handleBeerNameEvent(nome: string): void {
    this.beerService.setBeerName(nome);
    this.updatePage();
  }

  getWhishlist(){
    if(!this.userId)return
      this.whishlistSvc.getWishlist(this.userId).subscribe((items) => {
        console.log(items)
        this.whishlistSvc.setWhishListItem(items)
      });

  }
}

