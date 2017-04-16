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
      </div>
    </nav>
    <p>
      {{ welcome }}
    </p>
  `,
})
export class AdminHomepageComponent implements OnInit {

  welcome: string;

  constructor() {
    this.welcome = 'Welcome to admin panel';
  }

  ngOnInit() {

  }

}
