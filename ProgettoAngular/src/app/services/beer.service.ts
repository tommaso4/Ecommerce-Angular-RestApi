
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Ibeer } from '../Modules/ibeer';
import { ICreateBeer } from '../Modules/i-create-beer';


@Injectable({
  providedIn: 'root'
})

export class BeerService {
  private apiUrl = `${environment.API}/beers` ;
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

  deleteBeer(beerId: number): Observable<void> {
    const url = `${this.apiUrl}/${beerId}`;
    return this.http.delete<void>(url).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('Errore durante l\'eliminazione della birra'));
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

  createBeer(newBeer: ICreateBeer): Observable<ICreateBeer> {
    return this.http.post<ICreateBeer>(this.apiUrl, newBeer).pipe(
      catchError((error: any) => {
        return throwError(() => new Error('Errore durante la creazione della birra'));
      })
    );
  }

}
