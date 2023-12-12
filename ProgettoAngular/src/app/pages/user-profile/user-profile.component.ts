import { Component } from '@angular/core';
import { LogSystemService } from '../../services/log-system.service';
import { IUser } from '../../Modules/iuser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  deletingName!:string;
  user!:IUser|undefined;
  deleting!:boolean;
  wrongName!: boolean;
  editMode!:boolean;


  constructor(
    private LSS:LogSystemService,
  ){

    this.LSS.user$.subscribe(user =>this.user=user?.user);
  }

  deleteAccount(){
    this.deleting=true;
  }

  logOut(){
    this.LSS.logOut()
  }

  confirmDelete(){
    if(this.deletingName==this.user?.name){
      this.LSS.deleteAccount(this.user.id).subscribe(()=>{
        alert(`Alla prossima ${this.user?.name}! Ci dispiace vederti andare via!`);
        this.logOut()
      })
    }else{
      this.wrongName=true;
    }
  }

  cancelDelete(){
    this.deleting=false;
  }
}

