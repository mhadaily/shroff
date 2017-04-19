import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { HomepageComponent } from './homepage/homepage.component';
import { ExchangesComponent } from './features/exchanges/exchanges.component';
import { CurrenciesComponent } from './features/currencies/currencies.component';
import { RolesComponent } from './features/roles/roles.component';

import { ExchangeRoutingModule } from './exchange.routes';
import { ExchangeService } from './services/exchange.service';
import { CurrencyService } from './services/currency.service';
import { RoleService } from './services/role.service';
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
    CurrenciesComponent,
    RolesComponent
  ],
  providers: [
    ImageEncoderService,
    ExchangeService,
    CurrencyService,
    RoleService,
    MediaService
  ],
  exports: [
    HomepageComponent
  ]
})
export class ExchangeModule {
}
