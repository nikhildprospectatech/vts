import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, Routes } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  showPassword : boolean = false;

  constructor(
    private fb : FormBuilder,
    private backend : BackendService,
    private route : Router,
    private _snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['',  [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),]]
    })
  }

  get f(){
    return this.loginForm.controls;
  }

  getErrorMessage(formControl){
    let fg = this.loginForm.controls;
    if (formControl == 'password') {
      return fg['password'].hasError('required')
        ? 'password is required'
        : fg['password'].errors.pattern
          ? 'password need At least 8 characters and one Upper , Lower case & special character'
          : '';
    }else{
      return fg['email'].hasError('required')
      ? 'Email is required'
      : fg['email'].hasError('email')
      ? 'Not a valid email'
      : '';
    }
  }

  submit(){
    console.log(this.loginForm.value)

    this.backend.login(this.loginForm.value).subscribe(res => {
      if(res.success){
        this._snackBar.open("login successfully", "ok",{
          duration : 3000
        })
        localStorage.setItem('accessToken', res.token);
        localStorage.setItem("email" , res?.email)
        this.route.navigate(['/home/vehicle-info'])
        return
      }

      this._snackBar.open("Invalid credentials", "ok", {
        duration:3000
      })

    })

  }

  showPass(val){
    console.log(val)
    this.showPassword = !val
  }

}
