
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Ibeer } from '../Modules/ibeer';
import { IShop } from '../Modules/ishop';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private apiUrl = environment.apiUrl ;
  private api = environment.API ;
  beerName: string = ""
  constructor(private http: HttpClient) {}

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

  addToShop(userId: number, beer: IShop) {
    let numberBeerToSend = 1; // Valore predefinito
    if (beer.numberBeer !== undefined && beer.numberBeer > 1) {
      numberBeerToSend = beer.numberBeer;
    }
    return this.http
    .post('http://localhost:3000/shop',
    {
      userId: userId,
      nameBeer: beer.nameBeer,
      beerId: beer.beerId,
      numberBeer: numberBeerToSend

    }).pipe()
    .subscribe((data: any) => {
      console.log(data);
      return data;
    });
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

    addToWishList(beerId: number,userId:string): Observable<{id:number,beerId:number,userId:number}> {
      return this.http.post<{id:number,beerId:number,userId:number}>(this.api+'/wishlist',{beerId:beerId,userId:userId});


    }

}
