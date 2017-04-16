import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ToastComponent } from './toast/toast.component';

@NgModule({
   imports: [
       CommonModule,
       FormsModule,
       ReactiveFormsModule,
       HttpModule
   ],
   exports: [
       // Shared Modules
       CommonModule,
       FormsModule,
       ReactiveFormsModule,
       HttpModule,
       // Shared Components
       ToastComponent
   ],
   declarations: [ToastComponent],
   providers: [ToastComponent],
})
export class SharedModule { }
