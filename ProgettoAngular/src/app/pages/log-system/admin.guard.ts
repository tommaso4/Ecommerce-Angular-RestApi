import { RolesService } from './../../services/roles.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LogSystemService } from '../../services/log-system.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(
    private RolesSVC:RolesService,
    private router:Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.RolesSVC.userRole$.pipe(map(userRole=>{
        if(!userRole) return false;
        let admin= userRole.role==`admin`?true:false
        if(!admin)this.router.navigate([`/`]);
        return admin
      }));;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute,state);
  }
}
