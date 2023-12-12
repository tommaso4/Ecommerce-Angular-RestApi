import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ICart } from '../Modules/icart';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http:HttpClient,
  ) { }

  API:string=environment.apiUrl;

  getCartByUserID(userID:number):Observable<ICart[]>{
    return this.http.get<ICart[]>(this.API).pipe(map(cartArr=>cartArr.filter(cart=>cart.userID === userID)))
  }

  addCart(cart:ICart):Observable<ICart>{
    return this.http.post<ICart>(this.API,cart)
  }

  deleteCart(cartID:number):Observable<ICart>{
    return this.http.delete<ICart>(`${this.API}/${cartID}`)
  }

  // updateCart(cart:ICart):Observable<ICart>{
  //   return this.http.put<ICart>()
  // }
}
