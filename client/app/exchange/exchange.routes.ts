import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExchangesComponent } from './features/exchanges/exchanges.component';
import { CurrenciesComponent } from './features/currencies/currencies.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RolesComponent } from './features/roles/roles.component';

export const EXCHANGE_ROUTE: Routes = [
  {
    path: '', component: HomepageComponent, children: [
    {
      path: 'exchanges',
      component: ExchangesComponent
    },
    {
      path: 'currencies',
      component: CurrenciesComponent
    },
    {
      path: 'roles',
      component: RolesComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(EXCHANGE_ROUTE)],
  exports: [RouterModule]
})

export class ExchangeRoutingModule {
}

