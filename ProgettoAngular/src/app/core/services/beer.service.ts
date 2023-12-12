import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Birra } from '../models/beer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private apiUrl = environment.apiUrl ;
  beerName: string = ""
  constructor(private http: HttpClient) {}
  private beersSubject: BehaviorSubject<Birra[]> = new BehaviorSubject<Birra[]>([{ id: 0, name: '', abv: 0, image_url: '', price: 0 }]);
  beers$: Observable<Birra[]> = this.beersSubject.asObservable();
  perPage: number = 25;
  


  setBeerName(name: string): void {
    this.beerName = name;
  }

  getBeers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBeersByName(page: number = 1) {
    this.http.get<Birra[]>(`${this.apiUrl}/beers?beer_name=${this.beerName}&page=${page}&per_page=${this.perPage}`).subscribe((beers: Birra[]) => this.beersSubject.next(beers));
  }
}


