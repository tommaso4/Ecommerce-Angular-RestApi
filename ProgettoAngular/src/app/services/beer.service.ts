import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ibeer } from '../Modules/ibeer';
import { Observable, filter, map } from 'rxjs';

type responseData = {
  beer:Ibeer[];
}

@Injectable({
  providedIn: 'root'
})

export class BeerService {
  constructor(private http:HttpClient) { }

  apiUrl:string = 'http://localhost:3000/beer'

  getRedBeer(): Observable<Ibeer[]> {
    return this.http.get<Ibeer[]>(this.apiUrl)
    .pipe(map((beer:Ibeer[]) => beer.filter(birra => birra.volume.tipologia === 'rossa')));
  }
}
