import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IRoles } from '../Modules/iroles';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  loggedRoleSub:BehaviorSubject<IRoles|null>=new BehaviorSubject<IRoles|null>(null)
  userRole$=this.loggedRoleSub.asObservable();

  constructor(private http:HttpClient) {
    this.logged();
  }

  API:string=`${environment.API}/roles`

  getRoleByUserID(userID:string):Observable<IRoles|undefined>{
    return this.http.get<IRoles[]>(this.API).pipe(map(rolesArr=>rolesArr.find(element=>{
      if(element.userID==userID){
        localStorage.setItem('role', JSON.stringify(element))
        this.loggedRoleSub.next(element);
        return element
      }
      return undefined
    })))
  }

  setRoleNewUser(userID:string,role:string):Observable<IRoles>{
    let setRole={userID,role}
    return this.http.post<IRoles>(this.API,setRole)
  }

  upgradeUserRole(userRole:IRoles):Observable<IRoles>{
    return this.http.put<IRoles>(`${this.API}/${userRole.id}`,userRole)
    .pipe(tap((data)=>{
      this.loggedRoleSub.next(data);
      localStorage.setItem('role', JSON.stringify(data));
    }));
  }

  deleteUserRole(id:string):Observable<IRoles>{
    return this.http.delete<IRoles>(`${this.API}/${id}`);
  }

  logged(){
    let localRole:string|null=localStorage.getItem('role');
    if (!localRole) return;

    let userRole:IRoles=JSON.parse(localRole);

    this.loggedRoleSub.next(userRole);
  }
}
