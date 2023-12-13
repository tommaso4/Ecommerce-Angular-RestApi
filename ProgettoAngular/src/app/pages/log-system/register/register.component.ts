import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LogSystemService } from '../../../services/log-system.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  confirmPassword!:string;
  form!: FormGroup;
  loading!:boolean;
  emailExist: boolean=false;
  regExPassword:string=`^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}$`

  constructor(
    private fb:FormBuilder,
    private LSS:LogSystemService,
    private RolesSVC:RolesService,
    private router:Router
  ){}

  ngOnInit(){
    this.form = this.fb.group({
      name: this.fb.control(null,[Validators.required]),
      surname: this.fb.control(null,[Validators.required]),
      email: this.fb.control(null,[Validators.required, Validators.email]),
      password: this.fb.control(null,[Validators.required,Validators.pattern(this.regExPassword)]),
      confirmPassword: this.fb.control (null,[Validators.required, this.passwordMatchValidator] as Validators)
    })
  }

  submit(){
    this.loading=true;
    this.form.value.admin=false;

    delete this.form.value.confirmPassword;

    this.LSS.register(this.form.value).pipe(catchError(err=>{
      this.loading=false
      this.emailExist=true
      throw err
    })).subscribe(data=>{
      this.RolesSVC.setRoleNewUser(data.user.id,`customer`).subscribe(()=>{
        this.router.navigate(['/LogSystem/login']);
        this.loading=false;
      })
    });
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
}
