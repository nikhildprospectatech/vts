import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  resetForm: FormGroup;
  email;

  constructor(
    private fb: FormBuilder,
    private backend : BackendService,
    private ngxService : NgxUiLoaderService,
    private _snackBar : MatSnackBar,
    private  routes : ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.routes.queryParams.subscribe( params => {
      if(params){
        this.email = params.email;
      }
    })

    this.resetForm = this.fb.group({
      newPass: ['', [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        )
      ]],
      confirmPass: ['', [Validators.required]]
    },
      {
        validator: this.confirmValidator('newPass', 'confirmPass')
      }
    )
  }

  get f() {
    return this.resetForm.controls;
  }

  getErrorMessage(formControl) {
    let fg = this.resetForm.controls;

    if (formControl == 'newPass') {
      return fg['newPass'].hasError('required')
        ? 'password is required'
        : fg['newPass'].errors.pattern
          ? 'password need At least 8 characters and one Upper , Lower case & special character'
          : '';
    }
  }

  confirmValidator(formControlName, matchingControl) {
    return (formGroup: FormGroup) => {
      const formControl = formGroup.controls[formControlName];
      const matchControl = formGroup.controls[matchingControl];

      if (matchControl.errors && !matchControl.errors.confirmValidator) {
        return
      }

      if (formControl.value !== matchControl.value) {
        matchControl.setErrors({ confirmValidator: true })
      } else {
        matchControl.setErrors(null)
      }
    }
  }

  submit(){

    if(!this.resetForm.valid){
      return
    }

    this.ngxService.start();
    this.backend.resetPass({newPass : this.resetForm.value.newPass, email : this.email}).subscribe((res) => {
      if(res){
        this._snackBar.open("password reset successfully", '', {
          duration : 5000
        })
        this.ngxService.stop();
        this.resetForm.reset();
      }
    })

  }
}
