import { BehaviorSubject, Observable, map } from "rxjs";
import { Beer } from "../models/beer.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class PaginatorService {
  private beers: Beer[] = [];
  private apiurl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.loadBeers();
  }

  private loadBeers() {
    this.http.get<Beer[]>(this.apiurl).subscribe((beers: Beer[]) => {
      this.beers = beers;
    });
  }

  getPaginatedBeers(page: number, perPage: number, beerName: string = ''): Beer[] {
    let filteredBeers = this.beers;

    if (beerName.trim() !== '') {
      filteredBeers = this.beers.filter(beer =>
        beer.name.toLowerCase().includes(beerName.toLowerCase())
      );
    }

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedBeers = filteredBeers.slice(startIndex, endIndex);
    
    return paginatedBeers;
  }
}

