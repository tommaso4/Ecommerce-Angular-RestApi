
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, mergeMap, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Ibeer } from '../Modules/ibeer';
import { IShop } from '../Modules/ishop';

@Injectable({
  providedIn: 'root'
})

export class BeerService {


  private apiUrl = environment.apiUrl ;
  beerName: string = ""

  constructor(private http: HttpClient) { }


  getBeers(): Observable<Ibeer[]> {
    return this.http.get<Ibeer[]>(this.apiUrl);
  }

  getBeerById(id: number): Observable<Ibeer> {
    if (!isNaN(id) && id > 0) {
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<Ibeer>(url);
    } else {
      return throwError('ID della birra non valido');
    }
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

  setBeerName(name: string): void {
    this.beerName = name;
  }

  updateBeer(beerId: number, updatedBeer: Ibeer): Observable<Ibeer> {
    const url = `${this.apiUrl}/${beerId}`;
    return this.http.put<Ibeer>(url, updatedBeer).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('Errore durante l\'aggiornamento della birra'));
      })
    );
  }

  getRedBeer(): Observable<Ibeer[]> {
    return this.http.get<Ibeer[]>(this.apiUrl)
      .pipe(map((beer: Ibeer[]) => {
        const birrerosse = beer.filter(birra => birra.ebc > 20 || birra.srm > 10);
        return birrerosse;
      })
      );
  }

  getBlondBeer(): Observable<Ibeer[]> {
    return this.http.get<Ibeer[]>(this.apiUrl)
      .pipe(map((beer: Ibeer[]) => {
        const birrerosse = beer.filter(birra => birra.ebc < 10);
        return birrerosse;
      })
      );
  }

  getWhiteBeer(): Observable<Ibeer[]> {
    return this.http.get<Ibeer[]>(this.apiUrl)
      .pipe(map((beer: Ibeer[]) => {
        const birrerosse = beer.filter(birra => birra.srm < 5);
        return birrerosse;
      })
      );
  }

}
