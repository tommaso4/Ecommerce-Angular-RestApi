import { IUserAuth } from './../../Modules/iuser-auth';
import { Component } from '@angular/core';
import { LogSystemService } from '../../services/log-system.service';
import { IUser } from '../../Modules/iuser';
import { RolesService } from '../../services/roles.service';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart.service';
import { WhishlistService } from '../../services/whishlist.service';

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
    private RolesSVC:RolesService,
    private CartSVC:CartService,
    private WLS:WhishlistService
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
          this.deleteCartArr();
          this.deleteWishlistArr();
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

  deleteCartArr(){
    if(!this.user?.id) return
    this.CartSVC.getShop(Number(this.user?.id)).subscribe(cartArr=>{
      cartArr.forEach(element => {
        this.CartSVC.deleteCart(element.id).subscribe();
      });
    })
  }

  deleteWishlistArr(){
    if(!this.user?.id) return
    this.WLS.getWishlist(this.user?.id).subscribe(wishlistArr=>{
      wishlistArr.forEach(element=>this.WLS.removeWish(element.id))
    })
  }
}

