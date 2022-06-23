import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { NavItem } from 'src/app/utils/navItem';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  imageurl:any="../../assets/dummypic.jpg"
  
  constructor(
    private route: Router,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.buildNavigationMenu();
  }

  buildNavigationMenu() {

    let menu: NavItem[] = [

      {
        optionId: 1,
        displayName: 'Vehicles Data',
        logo: './assets/grp1.jpg',
        isActive: true
      }
    ]
    this.navigationOptions = menu.filter(option => option.isActive == true)
  }

  navigate(val) {
    console.log(val)
    let route : string;
    let queryParams = {};
    switch(val.optionId){

      case 1 :
          route = 'home/vehicle-info';
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
