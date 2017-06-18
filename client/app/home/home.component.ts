import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <nav class="navbar navbar-dark bg-primary">
      <div class="nav navbar-nav">
        <a routerLink="/" class="nav-item nav-link" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact:true}"> <i
          class="fa fa-home"></i> Home </a>
        <a [routerLink]="['admin']" class="nav-item nav-link" routerLinkActive="active"
           [routerLinkActiveOptions]="{exact:true}"> <i
          class="fa fa-home"></i> Admin Homepage </a>
      </div>
    </nav>

    <p>Welcome to Shroff</p>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
