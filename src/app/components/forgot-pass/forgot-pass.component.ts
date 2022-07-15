import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  forgotEmail;

  constructor(
    public dialogRef: MatDialogRef<ForgotPassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private backend : BackendService,
    private _snackBar : MatSnackBar,
    private ngxService : NgxUiLoaderService
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  resetFunc(){
    this.ngxService.start();
    this.backend.sendForgot({forgotPass : this.forgotEmail}).subscribe(res => {
      if(!res.msg){
        this._snackBar.open("Password reset link sent to registered Email Address", '', {
          duration: 3000
        })
        this.close();
        this.ngxService.stop()
        return
      }
      this._snackBar.open(res.msg, '', {
        duration: 3000
      })
      this.ngxService.stop()
    })
  }

}
