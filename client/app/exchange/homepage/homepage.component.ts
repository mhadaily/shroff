import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exchange-homepage',
  template: `
    <a [routerLink]="'exchanges'" class="nav-item nav-link" routerLinkActive="active"
       [routerLinkActiveOptions]="{exact:true}"> <i
      class="fa fa-home"></i> Exchanges </a>
    <a [routerLink]="'currencies'" class="nav-item nav-link" routerLinkActive="active"
       [routerLinkActiveOptions]="{exact:true}"> <i
      class="fa fa-home"></i> Currencies </a>
    <a [routerLink]="'roles'" class="nav-item nav-link" routerLinkActive="active"
       [routerLinkActiveOptions]="{exact:true}"> <i
      class="fa fa-home"></i> Roles </a>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit() {
    console.log('exchnage cmodule');
  }
  
}
