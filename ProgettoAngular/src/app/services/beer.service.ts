import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ibeer } from '../Modules/ibeer';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BeerService {

  constructor(private http:HttpClient) { }

  apiUrl:string = 'http://localhost:3000/beer'

  getRedBeer(): Observable<Ibeer[]> {
    return this.http.get<Ibeer[]>(this.apiUrl)
    .pipe(map((beer:Ibeer[]) => {
      const birrerosse = beer.filter(birra => birra.volume && birra.volume.tipologia && birra.volume.tipologia === 'rossa');
      return birrerosse;
    })
    );
  }
}
