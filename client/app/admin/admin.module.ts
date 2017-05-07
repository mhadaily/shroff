import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AdminHomepageComponent } from './homepage/homepage.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { RoleService } from './services/role.service';
import { RolesComponent } from './roles/roles.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminHomepageComponent,
    UserComponent,
    RolesComponent
  ],
  providers: [
    RoleService
  ]
})

export class AdminModule {
}
