import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '', component: AdminHomepageComponent, children:[
    { path: 'exchange', loadChildren: 'app/exchange/exchange.module#ExchangeModule'}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {
}

