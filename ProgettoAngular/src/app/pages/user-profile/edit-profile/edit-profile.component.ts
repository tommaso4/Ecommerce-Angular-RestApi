import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { catchError } from 'rxjs';
import { LogSystemService } from '../../../services/log-system.service';
import { IUserAuth } from '../../../Modules/iuser-auth';

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

  constructor(
    private fb:FormBuilder,
    private LSS:LogSystemService,
    ){
    this.LSS.user$.subscribe(user =>{
      if(!user)  return
      this.userAuth=user
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
        message: 'Le password sono diverse!!'
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
}
