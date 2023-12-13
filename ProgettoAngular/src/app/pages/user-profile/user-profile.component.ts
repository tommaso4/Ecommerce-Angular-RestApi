import { Component } from '@angular/core';
import { LogSystemService } from '../../services/log-system.service';
import { IUser } from '../../Modules/iuser';
import Swal from 'sweetalert2';

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
  adminSwitch!:boolean


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

  toggleAdminMode(){
    if(this.adminSwitch){

    }else{

    }

  }

  async adminRequest(){
    const { value: password } = await Swal.fire({
      title: "Enter your password",
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off"
      }
    });
    if (password) {
      Swal.fire(`Entered password: ${password}`);
    }
  }

}

