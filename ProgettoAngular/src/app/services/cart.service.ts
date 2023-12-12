import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, tap } from 'rxjs';
import { ICart } from '../Modules/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  addCartSubject=new Subject<ICart|null>();
  addedProduct$=this.addCartSubject.asObservable();
  deleteCartSubject=new Subject<ICart|null>();
  removedProduct$=this.deleteCartSubject.asObservable()

  constructor(
    private http:HttpClient,
  ) { }

  API:string=environment.API;

  getCartByUserID(userID:number):Observable<ICart[]>{
    return this.http.get<ICart[]>(this.API).pipe(map(cartArr=>cartArr.filter(cart=>cart.userID === userID)));
  }

  addCart(cart:ICart):Observable<ICart>{
    return this.http.post<ICart>(this.API,cart).pipe(tap(product=>this.addCartSubject.next(product)))
  }

  deleteCart(cartID:number):Observable<ICart>{
    return this.http.delete<ICart>(`${this.API}/${cartID}`).pipe(tap(product=>this.deleteCartSubject.next(product)));
  }

  updateCart(cart:ICart):Observable<ICart>{
    return this.http.put<ICart>(`${this.API}/${cart.ID}`,cart)
  }
}
