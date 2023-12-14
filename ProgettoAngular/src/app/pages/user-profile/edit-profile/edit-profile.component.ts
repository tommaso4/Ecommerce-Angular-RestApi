import { RolesService } from './../../../services/roles.service';
import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { catchError } from 'rxjs';
import { LogSystemService } from '../../../services/log-system.service';
import { IUserAuth } from '../../../Modules/iuser-auth';
import Swal from 'sweetalert2';
import { IRoles } from '../../../Modules/iroles';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {

  @Input() editMode!:boolean;

  regExPassword:string=`^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$`
  form!: FormGroup;
  confirmPassword!:string;
  loading!:boolean;
  userAuth:IUserAuth|undefined;
  admin!:boolean;
  userRole!:IRoles;

  constructor(
    private fb:FormBuilder,
    private LSS:LogSystemService,
    private RolesSVC:RolesService
    ){
    this.LSS.user$.subscribe(user =>{
      if(!user)  return
      this.userAuth=user
    });
    this.RolesSVC.userRole$.subscribe(role =>{
      if(!role) return;
      this.userRole=role;
      this.admin=role.role==`admin`?true:false
    });
  }

  ngOnInit(){
    if(!this.userAuth) return;
    this.form = this.fb.group({
      name: this.fb.control(this.userAuth?.user.name,[Validators.required]),
      surname: this.fb.control(this.userAuth?.user.surname,[Validators.required]),
      email: this.fb.control(this.userAuth?.user.email,[Validators.email]),
      password: this.fb.control(null,[Validators.required,Validators.pattern(this.regExPassword)]),

    })
  }

  isValid(nameForm:string):boolean|undefined{
    return this.form.get(nameForm)?.valid
  }

  isTouched(nameForm:string):boolean|undefined{
    return this.form.get(nameForm)?.touched
  }

  isValidAndTouched(nameForm:string):boolean|undefined{
    return !this.isValid(nameForm) && this.isTouched(nameForm)
  }

  passwordMatchValidator=(formC:FormControl):ValidationErrors|null => {
    if(formC.value!=this.form?.get(`password`)?.value){
      return {
        invalid: true,
        message: `Passwords don't match`
      }
    }
    return null;
  }

  getCustomMessage(nameForm:string){
    return this.form.get(nameForm)?.errors!['message']
  }

  submit(){
    this.loading=true;
    if(!this.userAuth) return
    this.form.value.id=this.userAuth.user.id
    this.userAuth.user=this.form.value
    this.LSS.updateUser(this.userAuth).pipe(catchError(err=>{
      this.loading=false
      throw err;
    }))
    .subscribe(data=>{
      if(!this.userAuth) return;
      this.loading=false;
      this.userAuth.user=data;
      localStorage.setItem('user', JSON.stringify(this.userAuth))
      window.location.reload();
    })
  }

  async adminSwitch(){
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
    if (password==`4DM1N`) {
      this.userRole.role=`admin`;
      this.RolesSVC.upgradeUserRole(this.userRole).subscribe(()=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Now you are an admin",
          showConfirmButton: false,
          timer: 3000
        });
      })

    }else{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "EH! Volevi!",
        showConfirmButton: false,
        timer: 3000
      });
    }
  }
}
