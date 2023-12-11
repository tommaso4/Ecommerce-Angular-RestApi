import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LogSystemService } from '../../../services/log-system.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

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


  constructor(
    private fb:FormBuilder,
    private LSS:LogSystemService,
    private router:Router
  ){}

  ngOnInit(){
    this.form = this.fb.group({
      name: this.fb.control(null,[Validators.required]),
      surname: this.fb.control(null,[Validators.required]),
      email: this.fb.control(null,[Validators.required, Validators.email]),
      password: this.fb.control(null,[Validators.required]),
      confirmPassword: this.fb.control (null,[Validators.required, this.passwordMatchValidator] as Validators)
    })
  }

  submit(){
    this.loading=true;
    delete this.form.value.confirmPassword;

    this.LSS.register(this.form.value).pipe(tap(()=>{
      this.loading=false;
      this.router.navigate(['/LogSystem/login']);
    }),catchError(err=>{
      this.loading=false
      this.emailExist=true
      throw err
    })).subscribe()
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
