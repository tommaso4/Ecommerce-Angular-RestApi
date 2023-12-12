import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Beer } from '../models/beer.model';


@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  paginate(data: any[], page: number, itemsPerPage: number): any[] {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }
}
