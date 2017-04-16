import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ExchangeModule } from '../exchange/exchange.module';

import { AdminHomepageComponent } from './homepage/homepage.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ExchangeFeaturesComponent } from './exchange-features/exchange-features.component';

@NgModule({
  imports: [
    SharedModule,
    ExchangeModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminHomepageComponent,
    ExchangeFeaturesComponent
  ]
})

export class AdminModule {}
