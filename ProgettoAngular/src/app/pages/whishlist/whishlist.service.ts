
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IwishListItem } from '../../Modules/iwishListItem';
import { LogSystemService } from '../../services/log-system.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {


  constructor(private router: Router,
    private LSS:LogSystemService, private httpClient:HttpClient) { }

  getWishlist(userId:string): Observable<IwishListItem[] >{
    return this.httpClient.get<IwishListItem[]>('http://localhost:3000/wishlist?_expand=beer&userId='+userId);
  }
}









