import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Beer } from '../models/beer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  apiUrl: string = environment.apiUrl;
  private beersSubject: BehaviorSubject<Beer[]> = new BehaviorSubject<Beer[]>([{ id: 0, name: '', abv: 0, image_url: '' }]);
  beers$: Observable<Beer[]> = this.beersSubject.asObservable();
  perPage: number = 25;
  beerName: string = '';

  constructor(private http: HttpClient) {
    this.getBeers();
  }

  getBeers(page: number = 1) {
    this.http.get<Beer[]>(`${this.apiUrl}/beers?page=${page}&per_page=${this.perPage}`).subscribe((beers: Beer[]) => this.beersSubject.next(beers));
  }

  getBeersByName(page: number = 1) {
    this.http.get<Beer[]>(`${this.apiUrl}/beers?beer_name=${this.beerName}&page=${page}&per_page=${this.perPage}`).subscribe((beers: Beer[]) => this.beersSubject.next(beers));
  }

}
