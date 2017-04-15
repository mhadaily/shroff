import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomepageComponent } from './homepage/homepage.component';
import { adminRouting } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    adminRouting
  ],
  declarations: [
    AdminHomepageComponent
  ]
})

export class AdminModule {}
