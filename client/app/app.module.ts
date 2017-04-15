import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './services/data.service';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { AddExchangeComponent } from './add-exchange/add-exchange.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddExchangeComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    DynamicFormModule
  ],
  providers: [
    DataService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
