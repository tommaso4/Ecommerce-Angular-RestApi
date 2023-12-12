
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Ibeer } from '../../Modules/ibeer';

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

  addToShop(beer:Ibeer): Observable<Ibeer> {
    const url = `${this.api}/shop`
    return this.http.post<Ibeer>(url,beer)
  }

  setBeerName(name: string): void {
    this.beerName = name;
  }


  updateBeer(beerId: number, updatedBeer: Ibeer): Observable<Ibeer> {
    const url = `${this.apiUrl}/${beerId}`;
    return this.http.put<Ibeer>(url, updatedBeer).pipe(
      catchError((error: any) => {
        return throwError('Errore durante l\'aggiornamento della birra');
      })
    );
  }

  //metodo per ottenere la lista delle birre preferite(parametri: id oggetto dove salviamo le bire e i due id birra e del user proprietario account)
  addToWishList(beerId: number,userId:string): Observable<{id:number,beerId:number,userId:number}> {
    return this.http.post<{id:number,beerId:number,userId:number}>(this.api+'/wishlist',{beerId:beerId,userId:userId});


  }
}
