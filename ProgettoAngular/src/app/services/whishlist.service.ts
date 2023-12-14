
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IwishListItem } from '../Modules/iwishListItem';
import { LogSystemService } from './log-system.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {
  private api = environment.API ;

  constructor(
    private router: Router,
    private LSS:LogSystemService,
    private httpClient:HttpClient) { }

  getWishlist(userId:string): Observable<IwishListItem[] >{
    return this.httpClient.get<IwishListItem[]>('http://localhost:3000/wishlist?_expand=beer&userId='+userId);
  }

  removeWish(id:any): Observable<any>{
    const url = `http://localhost:3000/wishlist/${id}`
    return this.httpClient.delete(url)
  }

  addToWishList(beerId: number, userId: string): Observable<{ id: number, beerId: number, userId: number }> {
    return this.httpClient.post<{ id: number, beerId: number, userId: number }>(this.api + '/wishlist', { beerId: beerId, userId: userId });
  }
}

