import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomepageComponent } from './homepage/homepage.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminHomepageComponent
  ]
})

export class AdminModule {}
