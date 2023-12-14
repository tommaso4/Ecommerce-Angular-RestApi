import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartTotalService {

  constructor() { }
  private totalCart = new BehaviorSubject<number>(0);
  totalCart$ = this.totalCart.asObservable();

  updateTotalCartValue(newValue: number) {
    this.totalCart.next(newValue);
  }
}
