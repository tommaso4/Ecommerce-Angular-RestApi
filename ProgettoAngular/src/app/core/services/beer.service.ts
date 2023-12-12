import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { Birra } from '../models/beer.model';
import { environment } from '../../environments/environment';
import { Ibeer } from '../../Modules/ibeer';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private apiUrl = environment.apiUrl;
  beerName: string = ""
  constructor(private http: HttpClient) { }

  getBeers(): Observable<Ibeer[]> {
    return this.http.get<Ibeer[]>(this.apiUrl);
  }

  getBeerById(id: number): Observable<Beer> {
    if (!isNaN(id) && id > 0) {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Beer>(url);
    } else {
      return throwError('ID della birra non valido');
    }
  }



  setBeerName(name: string): void {
    this.beerName = name;
  }
}


