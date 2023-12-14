import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { ICart } from '../Modules/icart';
import { IShop } from '../Modules/ishop';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  addCartSubject=new Subject<ICart|null>();
  addedProduct$=this.addCartSubject.asObservable();
  deleteCartSubject=new Subject<ICart|null>();
  removedProduct$=this.deleteCartSubject.asObservable()
  private apiUrlShop= environment.apiUrlShop ;

  constructor(
    private http:HttpClient,
  ) { }

  API:string=environment.API;


  getShop(id: number): Observable<any> {
    let params = new HttpParams().set('userId', id.toString());

    return this.http.get<IShop>(this.apiUrlShop, { params }).pipe(
      catchError(this.errorHandler)
    );
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
          numberBeer: numberBeerToSend,
          price: beer.price,
          img: beer.img,
          totalPrice: beer.price * numberBeerToSend
        })
  }

  updateShopItem(beerId: number|undefined, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrlShop}/${beerId}`, updatedData);
  }

  deleteCart(beerId: number):Observable<any>{
    return this.http.delete(`${this.apiUrlShop}/${beerId}`);
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}
