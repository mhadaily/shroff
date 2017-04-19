import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { CurrencyService } from '../../services/currency.service';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { ImageEncoderService } from '../../services/image-encoder.service';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'exchange-currencies',
  template: `
    <div class="card" *ngIf="isLoading">
      <h4 class="card-header">Loading...</h4>
      <div class="card-block text-xs-center">
        <i class="fa fa-circle-o-notch fa-spin fa-3x"></i>
      </div>
    </div>
    
    <app-toast [message]="toast.message"></app-toast>
    
    <div class="card" *ngIf="!isLoading">
      <h4 class="card-header">Current Currencies ({{currencies.length}})</h4>
      <div class="card-block">
        <table class="table table-bordered table-striped">
          <thead class="thead-default">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Code</th>
            <th>Country</th>
            <th>Base</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody *ngIf="currencies.length === 0">
          <tr>
            <td colspan="6">There are no currencies in the DB. Add a new currency below.</td>
          </tr>
          </tbody>
          <tbody *ngIf="!isEditing">
          <tr *ngFor="let currency of currencies">
            <td><img [src]="currency.image" width="30"></td>
            <td>{{currency.name}}</td>
            <td>{{currency.code}}</td>
            <td>{{currency.country}}</td>
            <td>{{currency.base}}</td>
            <td>
              <button class="btn btn-sm btn-warning" (click)="enableEditing(currency)"><i class="fa fa-pencil"></i> Edit
              </button>
              <button class="btn btn-sm btn-danger" (click)="deleteCurrency(currency)"><i class="fa fa-trash"></i> Delete
              </button>
            </td>
          </tr>
          </tbody>
          <tbody *ngIf="isEditing">
          <tr>
            <td colspan="6">
              <form class="form-inline text-center" enctype="multipart/form-data" [formGroup]="addCurrencyForm"
                    (ngSubmit)="editCurrency(currencyRow)">
                <input class="form-control" type="text" [(ngModel)]='currencyRow.name' formControlName="name" placeholder="name" min="0">
                <input class="form-control" type="text" [(ngModel)]='currencyRow.code' formControlName="code" placeholder="code" min="0">
                <input class="form-control" type="number" [(ngModel)]='currencyRow.base' formControlName="base" placeholder="base" min="0">
                <input class="form-control" type="text" [(ngModel)]='currencyRow.country' formControlName="country" placeholder="country"
                       min="0">
                <input class="form-control" type="file" formControlName="image" placeholder="image" min="0">
                {{<img [src]="currencyRow.image">}}
                <br>
                <button class="btn btn-sm btn-primary" type="submit" [disabled]="!addCurrencyForm.valid"><i
                  class="fa fa-floppy-o"></i> Save
                </button>
              </form>
              {{currencyRow | json }}
              <button class="btn btn-sm btn-warning" (click)="cancelEditing()"><i class="fa fa-times"></i> Cancel</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="card" *ngIf="!isEditing">
      <h4 class="card-header">Add new currency</h4>
      <div class="card-block">
        <form class="form-inline text-center" enctype="multipart/form-data" [formGroup]="addCurrencyForm" (ngSubmit)="addCurrency()">
          <input class="form-control" type="text" formControlName="name" placeholder="name" min="0">
          <input class="form-control" type="text" formControlName="code" placeholder="code" min="0">
          <input class="form-control" type="number" formControlName="base" placeholder="base" min="0">
          <input class="form-control" type="text" formControlName="country" placeholder="country" min="0">
          <input class="form-control" type="file" name="media"
                 (change)="imageFileChange($event.target.name, $event.target.files)"
                 formControlName="image" placeholder="image" accept="image/*">
          <div *ngIf="uploaded">
            <img [src]="uploaded['url']" [alt]="uploaded['originalName']">
          </div>
          <br>
          <button class="btn btn-primary" type="submit" [disabled]="!addCurrencyForm.valid"><i class="fa fa-floppy-o"></i>
            Add
          </button>
        </form>
        {{ addCurrencyForm.value | json }}
      </div>
    </div>
  `,
  styles: []
})
export class CurrenciesComponent implements OnInit {
  
  uploaded;
  currencies = [];
  isLoading = true;
  currencyRow = {};
  isEditing = false;
  
  addCurrencyForm: FormGroup;
  
  constructor(private _currency: CurrencyService,
              private _media: MediaService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder,
              private _svc: ImageEncoderService) { }
  
  ngOnInit() {
    this.getCurrencies();
    
    this.addCurrencyForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      image: [''],
      base: ['', Validators.required],
      country: ['', Validators.required]
    });
  }
  
  imageFileChange(fieldName: string, fileList: FileList) {
    // handle file changes
    const formData = new FormData();
    if (!fileList.length) return;

    Array
      .from(Array(fileList.length).keys())
      .map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });
    
    // save it
    // this.imageSave(formData);
  
    this._media.addMedia(formData).subscribe(
      res => {
        console.log(res.json());
      },
      error => console.log(error)
    );
  }
  
  imageSave(formData: FormData) {
    // upload data to the server
    this._svc.upload(formData)
        .take(1)
        .subscribe(
          x => {
            this.uploaded = x;
          },
          err => console.log(err));
  }
  
  getCurrencies() {
    this._currency.getCurrencies().subscribe(
      data => this.currencies = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }
  
  addCurrency() {
    let newValues = Object.assign({}, this.addCurrencyForm.value);
    newValues.image = this.uploaded.url;
    this._currency.addCurrency(newValues).subscribe(
      res => {
        const newCurrency = res.json();
        this.currencies.push(newCurrency);
        this.addCurrencyForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }
  
  enableEditing(currency) {
    this.isEditing = true;
    this.currencyRow = currency;
  }
  
  cancelEditing() {
    this.isEditing = false;
    this.currencyRow = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the currencies to reset the editing
    this.getCurrencies();
  }
  
  editCurrency(currency) {
    this._currency.editCurrency(currency).subscribe(
      res => {
        this.isEditing = false;
        this.currencyRow = currency;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }
  
  deleteCurrency(currency) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this._currency.deleteCurrency(currency).subscribe(
        res => {
          const pos = this.currencies.map(elem => { return elem._id; }).indexOf(currency._id);
          this.currencies.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
  
}
