import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-homepage',
  template: `
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
