import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IRegister } from '../Modules/iregister';
import { ILogin } from '../Modules/ilogin';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IUserAuth } from '../Modules/iuser-auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { IUser } from '../Modules/iuser';

@Injectable({
  providedIn: 'root'
})
export class LogSystemService {

  authorized:BehaviorSubject<IUserAuth|null>=new BehaviorSubject<IUserAuth|null>(null);
  user$=this.authorized.asObservable();
  booleanUser$=this.user$.pipe(map(user=>!!user))
  jwt:JwtHelperService=new JwtHelperService();

  APIUser:string=`${environment.API}/users`
  APIRegister:string=`${environment.API}/register`;
  APILogin:string=`${environment.API}/login`;


  constructor(
    private http:HttpClient,
    private router: Router
  ){
    this.logged();
  }

  register(user:IRegister):Observable<IUserAuth>{
    return this.http.post<IUserAuth>(this.APIRegister,user)
  }

  updateUser(user:IUserAuth):Observable<IUser>{
    this.authorized.next(user);
    return this.http.put<IUser>(`${this.APIUser}/${user.user.id}`, user.user)
  }

  login(user:ILogin):Observable<IUserAuth>{
    return this.http.post<IUserAuth>(this.APILogin,user)
    .pipe(tap(data=>{
      this.authorized.next(data);
      this.autoLogOut(data.accessToken)
      localStorage.setItem('user', JSON.stringify(data))
    }))
  }

  logged(){
    let localLogin:string|null=localStorage.getItem('user');
    if (!localLogin) return;

    let oldAuth:IUserAuth=JSON.parse(localLogin);
    if(this.jwt.isTokenExpired(oldAuth.accessToken)) return

    this.autoLogOut(oldAuth.accessToken);
    this.authorized.next(oldAuth);
  }

  logOut(){
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.authorized.next(null);
    this.router.navigate(['/home']);
  }

  deleteAccount(id:string):Observable<IUser>{
    return this.http.delete<IUser>(`${this.APIUser}/${id}`);
  }

  autoLogOut(token:string){
    let expiringDate=this.jwt.getTokenExpirationDate(token) as Date;
    let remainingTimeMs=expiringDate.getTime() - new Date().getTime();
    setTimeout(() => {
      this.logOut()
    }, remainingTimeMs)
  }
}
