import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <nav class="navbar navbar-dark">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a routerLink="/" class="nav-item nav-link" routerLinkActive="active"
             [routerLinkActiveOptions]="{exact:true}"> <i
            class="fa fa-home"></i> Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a [routerLink]="['admin']" class="nav-item nav-link" routerLinkActive="active"
             [routerLinkActiveOptions]="{exact:true}"> <i
            class="fa fa-home"></i> Admin Homepage </a>
        </li>

      </ul>
    </nav>
    <p>Welcome to Shroff</p>
  `
})
export class HomeComponent {

}
