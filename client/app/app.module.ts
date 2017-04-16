import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ExchangeService } from './exchange/services/exchange.service';
import { CurrencyService } from './exchange/services/currency.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    DynamicFormModule,
  ],
  providers: [
    ExchangeService,
    CurrencyService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule {
}
