
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IwishListItem } from '../Modules/iwishListItem';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {
  private api = `${environment.API}/wishlist` ;

  constructor(
    private httpClient:HttpClient) { }

  getWishlist(userId:string): Observable<IwishListItem[] >{
    return this.httpClient.get<IwishListItem[]>(`${this.api}?_expand=beer&userId=${userId}`);
  }

  removeWish(id:any): Observable<any>{
    const url = `${this.api}/${id}`
    return this.httpClient.delete(url)
  }

  addToWishList(beerId: number, userId: string): Observable<{ id: number, beerId: number, userId: number }> {
    return this.httpClient.post<{ id: number, beerId: number, userId: number }>(this.api, { beerId: beerId, userId: userId });
  }
}

