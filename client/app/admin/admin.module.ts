import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AdminHomepageComponent } from './homepage/homepage.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminHomepageComponent,
    UserComponent
  ]
})

export class AdminModule {}
