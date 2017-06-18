import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ToastComponent } from './toast/toast.component';
import { GetObjectKeyPipe } from './pipes/get-object-key.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ToastComponent,
    GetObjectKeyPipe
  ],
  declarations: [
    ToastComponent,
    GetObjectKeyPipe
  ],
  providers: [ToastComponent]
})
export class SharedModule {
}
