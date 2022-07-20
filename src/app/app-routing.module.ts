import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { VehicleInfoComponent } from './components/vehicle-info/vehicle-info.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path : "home",
    component : SideNavComponent,
    children : [
      {
        path : "dashboard",
        component : DashboardComponent
      },
      {
        path : "vehicle-info",
        component : VehicleInfoComponent
      }
    ]
  },
  {
    path : "reg-user",
    component : RegisterUserComponent
  },
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : 'resetPass',
    component : ResetPassComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
