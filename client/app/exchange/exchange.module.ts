import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { HomepageComponent } from './homepage/homepage.component';
import { ExchangesComponent } from './features/exchanges/exchanges.component';
import { CurrenciesComponent } from './features/currencies/currencies.component';

import { ExchangeRoutingModule } from './exchange.routes';
import { ExchangeService } from './services/exchange.service';
import { CurrencyService } from './services/currency.service';
import { MediaService } from './services/media.service';
import { ImageEncoderService } from './services/image-encoder.service';

@NgModule({
  imports: [
    SharedModule,
    ExchangeRoutingModule
  ],
  declarations: [
    HomepageComponent,
    ExchangesComponent,
    CurrenciesComponent
  ],
  providers: [
    ImageEncoderService,
    ExchangeService,
    CurrencyService,
    MediaService
  ],
  exports: [
    HomepageComponent
  ]
})
export class ExchangeModule {
}
