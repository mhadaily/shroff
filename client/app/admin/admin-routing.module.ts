import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomepageComponent } from './homepage/homepage.component';
import { EXCHANGE_FEATURES_ROUTE } from './exchange-features/exchange-features.routes';

const routes: Routes = [
  {
    path: '', component: AdminHomepageComponent, children: EXCHANGE_FEATURES_ROUTE
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {
}

