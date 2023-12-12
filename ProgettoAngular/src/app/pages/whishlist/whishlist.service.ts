
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRegister } from '../../Modules/iregister';
import { ILogin } from '../../Modules/ilogin';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IUserAuth } from '../../Modules/iuser-auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ICart } from '../../Modules/icart';
import { LogSystemService } from '../../services/log-system.service';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {
  private wishlist: ICart[] = [];

  constructor(private router: Router,
    private LSS:LogSystemService,) { }

  addToWishlist(icart: ICart): void {
    if (this.isUserLoggedIn()) {
      // Add icart to wishlist
      this.wishlist.push(icart);
    } else {
      const confirmLogin = confirm('Se vuoi salvare nella lista desideri, devi effettuare il login. Vuoi procedere?');
      if (confirmLogin) {
        this.router.navigate(['/LogSystem/login']);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  getWishlist(): ICart[] {
    return this.wishlist;
  }

  isUserLoggedIn(): boolean {
    return true;


  }
}









