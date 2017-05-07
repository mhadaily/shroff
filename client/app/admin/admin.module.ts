import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AdminHomepageComponent } from './homepage/homepage.component';
import { AdminRoutingModule } from './admin-routing.module';

import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

import { UsersComponent } from './user/user.component';
import { RolesComponent } from './roles/roles.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminHomepageComponent,
    UsersComponent,
    RolesComponent
  ],
  providers: [
    RoleService,
    UserService
  ]
})

export class AdminModule {
}
