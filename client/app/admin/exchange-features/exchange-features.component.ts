import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-exchange-features',
  template: `
    admin-exchange-features
    <exchange-homepage></exchange-homepage>
  `,
  styleUrls: ['./exchange-features.component.scss']
})
export class ExchangeFeaturesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
