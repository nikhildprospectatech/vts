import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { NavItem } from 'src/app/utils/navItem';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  navigationOptions = [];
  panelOpenState;
  state: string;
  isState: string;
  email;
  isDisable : boolean = true;
  ismenu : boolean = false;
  userData;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  
  constructor(
    private route: Router,
    private breakpointObserver: BreakpointObserver,
    private backend : BackendService
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email')
    this._apiCall();
    this.buildNavigationMenu();
    if (this.route.url.includes('/home/vehicle-info')) {
      this.state = 'Vehicles Data';
    }
  }

  async _apiCall(){
    let res = await this.backend.getUser(this.email);
    this.userData = res;
  }

  buildNavigationMenu() {

    let menu: NavItem[] = [

      {
        optionId: 1,
        displayName: 'Vehicles Data',
        logo: '../assets/nav1.png',
        isActive: true
      }
    ]
    this.navigationOptions = menu.filter(option => option.isActive == true)
  }

  navigate(val) {
    let route : string;
    let queryParams = {};
    switch(val.optionId){

      case 1 :
          route = 'home/vehicle-info';
          this.state = 'Vehicles Data';
        break;

      default :
      route = 'vehicle-info';
        break;

    }

    this.route.navigate([route], { queryParams })
  }

  signOut(){

  }

}
