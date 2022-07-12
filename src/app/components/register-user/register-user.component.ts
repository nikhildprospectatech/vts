import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  userRegistrationForm: UntypedFormGroup;
  state;

  constructor(
    private fb: UntypedFormBuilder,
    private backend : BackendService,
    private _snackBar : MatSnackBar,
    private route : Router
  ) { }

  ngOnInit(): void {
    this.userRegistrationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['',[ Validators.required, Validators.email]],
      password: ['',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validator: this.confirmValidator("password", "confirmPassword")
      }
    )
  }

  get f() {
    return this.userRegistrationForm.controls;
  }

  submit() {
    if(!this.userRegistrationForm.valid){
      return
    }

    this.backend.saveUser(this.userRegistrationForm.value).subscribe( res => {
      if (res.success){
        localStorage.setItem("accessToken" , res?.token)
        localStorage.setItem("email" , res?.email)
        this._snackBar.open("user registered successfully", 'ok', {
          duration : 3000
        });
        this.route.navigate(['/home/vehicle-info'])
        return
      }

      this._snackBar.open( res.message, 'ok', {
        duration : 3000
      });
    })
    
  }

  confirmValidator(controlName: string, matchingControl: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchControl = formGroup.controls[matchingControl];

      if (
        matchControl.errors && !matchControl.errors.confirmValidator
      ) {
        return;
      }

      if (control.value !== matchControl.value) {
        matchControl.setErrors({ confirmValidator: true })
      } else {
        matchControl.setErrors(null);
      }
    }
  }

  getErrorMessage(formControl) {
    let fg = this.userRegistrationForm.controls;
    if (formControl == 'password') {
      return fg['password'].hasError('required')
        ? 'password is required'
        : fg['password'].errors.pattern
          ? 'password need At least 8 characters and one Upper , Lower case & special character'
          : '';
    }  else if (formControl == 'fullName') {
      return fg['fullName'].hasError('required')
        ? 'Full Name is required'
        : fg['fullName'].errors.pattern
        ? 'Full Name need At least 3  and max 15 characters'
        : '';
    } else {
      return fg['email'].hasError('required')
        ? 'Email is required'
        : fg['email'].hasError('email')
        ? 'Not a valid email'
        : '';
    }
  }

}
