import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ibeer } from '../Modules/ibeer';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BeerService {
  constructor(private http:HttpClient) { }

  apiUrl:string = 'http://localhost:3000/beers'

  getRedBeer(): Observable<Ibeer[]> {
    return this.http.get<Ibeer[]>(this.apiUrl)
    .pipe(map((beer:Ibeer[]) => {
      const birrerosse = beer.filter(birra => birra.ebc > 20 || birra.srm > 10);
      return birrerosse;
    })
    );
  }
  getBlondBeer(): Observable<Ibeer[]> {
    return this.http.get<Ibeer[]>(this.apiUrl)
    .pipe(map((beer:Ibeer[]) => {
      const birrerosse = beer.filter(birra => birra.ebc < 10);
      return birrerosse;
    })
    );
  }
  getWhiteBeer(): Observable<Ibeer[]> {
    return this.http.get<Ibeer[]>(this.apiUrl)
    .pipe(map((beer:Ibeer[]) => {
      const birrerosse = beer.filter(birra => birra.srm < 5);
      return birrerosse;
    })
    );
  }
}
