import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Beer } from '../models/beer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private beersSubject: BehaviorSubject<Beer[]> = new BehaviorSubject<Beer[]>([]);
  beers$: Observable<Beer[]> = this.beersSubject.asObservable();
  perPage: number = 25;
  beerName: string = '';
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.getBeers();
  }

  getBeers(page: number = 1) {
    this.http.get<Beer[]>(this.apiUrl).pipe(
      map((beers: Beer[]) => {
        return beers.slice((page - 1) * this.perPage, page * this.perPage);
      })
    ).subscribe((paginatedBeers: Beer[]) => {
      this.beersSubject.next(paginatedBeers);
    });
  }

  getBeersByName(page: number = 1) {
    this.http.get<Beer[]>(this.apiUrl).pipe(
      map((beers: Beer[]) => {
        const filteredBeers = beers.filter(beer => beer.name.toLowerCase().includes(this.beerName.toLowerCase()));
        console.log(filteredBeers);
        return filteredBeers.slice((page - 1) * this.perPage, page * this.perPage);

      })
    )

  }
}

