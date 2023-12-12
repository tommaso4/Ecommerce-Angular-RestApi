import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegister } from '../Modules/iregister';
import { ILogin } from '../Modules/ilogin';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { IUserAuth } from '../Modules/iuser-auth';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LogSystemService {

  authorized:BehaviorSubject<IUserAuth|null>=new BehaviorSubject<IUserAuth|null>(null);
  user$=this.authorized.asObservable();
  booleanUser$=this.user$.pipe(map(user=>!!user))
  jwt:JwtHelperService=new JwtHelperService();


  constructor(
    private http:HttpClient,
    private router: Router
  ){
    this.logged();
  }

  APIRegister:string=`${environment.apiUrl}/register`;
  APILogin:string=`${environment.apiUrl}/login`;

  register(user:IRegister):Observable<IUserAuth>{
    return this.http.post<IUserAuth>(this.APIRegister,user)
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

    this.autoLogOut(oldAuth.accessToken)
    this.authorized.next(oldAuth);
  }

  logOut(){
    localStorage.removeItem('user');
    this.authorized.next(null);
    this.router.navigate(['/Home']);
  }

  autoLogOut(token:string){
    let expiringDate=this.jwt.getTokenExpirationDate(token) as Date;
    let remainingTimeMs=expiringDate.getTime() - new Date().getTime();
    setTimeout(() => {
      this.logOut()
    }, remainingTimeMs)
  }
}
