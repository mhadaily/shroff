import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './services/data.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    DataService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
