import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exchange-homepage',
  template: `
    <exchange-exchanges></exchange-exchanges>
  `,
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
