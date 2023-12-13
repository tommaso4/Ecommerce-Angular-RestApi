import { Component } from '@angular/core';
import { LogSystemService } from '../../services/log-system.service';
import { IUserAuth } from '../../Modules/iuser-auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLogged = false;
  user!: IUserAuth;
  constructor(private LSS:LogSystemService) { }

  ngOnInit(){
    this.LSS.user$.subscribe((user:IUserAuth|null)=>{
      this.isLogged=!!user;
      this.user = user!;
    })

  }

}
