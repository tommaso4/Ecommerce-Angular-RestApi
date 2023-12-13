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
  constructor(private LSS:LogSystemService) { }
  ngOnInit(){
    console.log('ciao');

    this.LSS.user$.subscribe((user:IUserAuth|null)=>{
      this.isLogged=!!user
    })
  }
}
