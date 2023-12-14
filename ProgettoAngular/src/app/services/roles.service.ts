import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IRoles } from '../Modules/iroles';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http:HttpClient) { }

  API:string=`${environment.API}/roles`

  setRoleNewUser(userID:string,role:string):Observable<IRoles>{
    let setRole={userID,role}
    return this.http.post<IRoles>(this.API,setRole)
  }
  deleteUserRole(id:string):Observable<IRoles>{
    return this.http.delete<IRoles>(`${this.API}/${id}`);
  }
}
