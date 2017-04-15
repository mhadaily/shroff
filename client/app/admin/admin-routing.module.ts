import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', component: AdminHomepageComponent }
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(routes);
