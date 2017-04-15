import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddExchangeComponent } from './add-exchange/add-exchange.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddExchangeComponent },
  { path: 'admin', loadChildren: 'admin/admin.module#AdminModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
