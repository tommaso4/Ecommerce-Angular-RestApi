import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Beer } from '../models/beer.model';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class BeerService {
  private apiUrl = environment.apiUrl ;
  beerName: string = ""
  constructor(private http: HttpClient) {}

  getBeers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  setBeerName(name: string): void {
    this.beerName = name;
  }
}


