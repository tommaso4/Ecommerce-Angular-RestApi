import { Component, Input, OnInit } from '@angular/core';
import { LogSystemService } from '../../services/log-system.service';
import { IUserAuth } from '../../Modules/iuser-auth';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  user!: IUserAuth;

  constructor(
    private LSS: LogSystemService,
  ) {}

  ngOnInit() {
    this.LSS.user$.subscribe((user: IUserAuth | null) => {
      this.isLogged = !!user;
      this.user = user!;
    });
  }
}
