import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-homepage',
  template: `
    <a href="http://localhost:4200" class="nav-item nav-link"> <i
      class="fa fa-home"></i> Home </a>
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
