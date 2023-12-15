import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { ICart } from '../Modules/icart';
import { IShop } from '../Modules/ishop';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrlShop= `${environment.API}/shop`;
  totalCart = new BehaviorSubject<number>(0);
  cart$ = this.totalCart.asObservable();





  constructor(
    private http:HttpClient,
  ) { }


  setTotalCart(data: number) {
    this.totalCart.next(data);
  }


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
        }).pipe(tap(()=> {
          // this.totalCart.next(beer.price)
        }))
  }

  updateShopItem(beerId: number|undefined, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrlShop}/${beerId}`, updatedData);
  }

  deleteCart(id?: number):Observable<any>{
    return this.http.delete(`${this.apiUrlShop}/${id}`);
  }


  errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }

calculateTotalCart(items: IShop[]): number {
  return items.reduce((total, item) => total + item.totalPrice, 0);
}

}
