import { IUserAuth } from './../../Modules/iuser-auth';
import { Component } from '@angular/core';
import { LogSystemService } from '../../services/log-system.service';
import { IUser } from '../../Modules/iuser';
import { RolesService } from '../../services/roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  userAuth!:IUserAuth|null
  user!:IUser|undefined;
  deletingName!:string;
  deleting!:boolean;
  wrongName!: boolean;
  editMode!:boolean;
  adminSwitch!:boolean;

  constructor(
    private LSS:LogSystemService,
    private RolesSVC:RolesService
  ){
    this.LSS.user$.subscribe(userAuth =>{
      this.userAuth=userAuth;
      this.user=this.userAuth?.user;
    });
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
        if(!this.user?.id) return
        this.RolesSVC.deleteUserRole(this.user?.id).subscribe(()=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Account deleted! See you next time ${this.user?.name}! We're sorry to see you're going!`,
            showConfirmButton: false,
            timer: 3000
          }).then(()=>this.logOut());

        })
      })
    }else{
      this.wrongName=true;
    }
  }

  cancelDelete(){
    this.deleting=false;
  }
}

