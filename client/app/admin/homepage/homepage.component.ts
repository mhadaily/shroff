import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-homepage',
  template: `
    <nav class="navbar bg-inverse">
      <div class="nav navbar-nav">

        <a routerLink="/" class="nav-item nav-link" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact:true}"> <i
          class="fa fa-home"></i> Home </a>

        <a routerLink="/admin" class="nav-item nav-link" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact:true}"> <i
          class="fa fa-home"></i> Admin Homepage </a>

        <a [routerLink]="['exchange']" class="nav-item nav-link" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact:true}"> <i
          class="fa fa-home"></i> Exchange Module </a>

        <!--<a [routerLink]="['exchange','exchanges']" class="nav-item nav-link" routerLinkActive="active"-->
        <!--[routerLinkActiveOptions]="{exact:true}"> <i-->
        <!--class="fa fa-home"></i> Exchanges </a>-->

        <!--<a [routerLink]="['exchange','currencies']" class="nav-item nav-link" routerLinkActive="active"-->
        <!--[routerLinkActiveOptions]="{exact:true}"> <i-->
        <!--class="fa fa-home"></i> currencies </a>-->

      </div>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AdminHomepageComponent implements OnInit {

  welcome: string;

  constructor() {
    this.welcome = 'Welcome to admin panel';
  }

  ngOnInit() {
    console.log('admin homepage');
  }

}
