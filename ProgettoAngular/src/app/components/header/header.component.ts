import { Component, Input, OnInit } from '@angular/core';
import { LogSystemService } from '../../services/log-system.service';
import { IUserAuth } from '../../Modules/iuser-auth';
import { RolesService } from '../../services/roles.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  user!: IUserAuth;
  toggle: boolean=true;
  admin: boolean = false;

  constructor(
    private LSS: LogSystemService,
    private roleSvc: RolesService
  ) {}

  ngOnInit() {
    this.LSS.user$.subscribe((user: IUserAuth | null) => {
      this.isLogged = !!user;
      this.user = user!;
    });
    this.roleSvc.userRole$.subscribe(user=> this.admin = user?.role== 'admin' ? true : false)
  }
}
