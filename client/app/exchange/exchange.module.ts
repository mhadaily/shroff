import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { HomepageComponent } from './homepage/homepage.component';
import { ExchangesComponent } from './features/exchanges/exchanges.component';
import { CurrenciesComponent } from './features/currencies/currencies.component';

import { ExchangeRoutingModule } from './exchange.routes';
import { IntroComponent } from './features/intro/intro.component';

@NgModule({
  imports: [
    SharedModule,
    ExchangeRoutingModule
  ],
  declarations: [
    HomepageComponent,
    ExchangesComponent,
    CurrenciesComponent,
    IntroComponent
  ],
  exports: [
    HomepageComponent,
  ]
})
export class ExchangeModule {
}
