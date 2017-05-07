import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './user/user.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  {
    path: '', component: AdminHomepageComponent, children: [
    { path: 'exchange', loadChildren: 'app/exchange/exchange.module#ExchangeModule' },
    { path: 'user', component: UserComponent },
    { path: 'role', component: RolesComponent }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {
}

