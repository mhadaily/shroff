import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { HomepageComponent } from './homepage/homepage.component';
import { ExchangesComponent } from './features/exchanges/exchanges.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HomepageComponent,
    ExchangesComponent
  ],
  exports: [
    HomepageComponent
  ]
})
export class ExchangeModule {
}
