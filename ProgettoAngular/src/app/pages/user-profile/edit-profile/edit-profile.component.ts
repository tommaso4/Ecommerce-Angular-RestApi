import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { tap, catchError } from 'rxjs';
import { LogSystemService } from '../../../services/log-system.service';
import { IUser } from '../../../Modules/iuser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent {

  @Input() editMode!:boolean;

  form!: FormGroup;
  confirmPassword!:string;
  loading!:boolean;
  user:IUser|undefined;

  constructor(
    private fb:FormBuilder,
    private LSS:LogSystemService,
    private router:Router
    ){
    this.LSS.user$.subscribe(user =>this.user=user?.user);
  }

  ngOnInit(){
    if(!this.user) return;
    this.form = this.fb.group({
      name: this.fb.control(this.user?.name,[Validators.required]),
      surname: this.fb.control(this.user?.surname,[Validators.required]),
      email: this.fb.control(this.user?.email,[Validators.email]),
      password: this.fb.control(null),

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
    this.form.value.password=this.user?.password;
    console.log(this.user);

    if(!this.user) return
    console.log(this.form.value);

    this.LSS.updateUser(this.user?.id,this.form.value).pipe(tap(()=>{
      this.loading=false;
      this.editMode=false;
      this.router.navigate(['/userprofile']);
      this.user=this.form.value
    }),catchError(err=>{
      this.loading=false
      throw err
    })).subscribe()
  }
}
