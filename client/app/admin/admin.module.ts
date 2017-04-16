import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AdminHomepageComponent } from './homepage/homepage.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminHomepageComponent,
  ]
})

export class AdminModule {}
