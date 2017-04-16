import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { ExchangeService } from '../../services/exchange.service';
import { ToastComponent } from '../../../shared/toast/toast.component';

@Component({
  selector: 'exchange-exchanges',
  template: `
    <div class="card" *ngIf="isLoading">
      <h4 class="card-header">Loading...</h4>
      <div class="card-block text-xs-center">
        <i class="fa fa-circle-o-notch fa-spin fa-3x"></i>
      </div>
    </div>

    <app-toast [message]="toast.message"></app-toast>

    <div class="card" *ngIf="!isLoading">
      <h4 class="card-header">Current exchnages ({{exchanges.length}})</h4>
      <div class="card-block">
        <table class="table table-bordered table-striped">
          <thead class="thead-default">
          <tr>
            <th>List</th>
            <th>CreatedAt</th>
            <th>updatedAt</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody *ngIf="exchanges.length === 0">
          <tr>
            <td colspan="4">There are no exchanges in the DB. Add a new exchange below.</td>
          </tr>
          </tbody>
          <tbody *ngIf="!isEditing">
          <tr *ngFor="let exchange of exchanges">
            <td>{{exchange.exchanges | json}}</td>
            <td>{{exchange.createdAt | date:"MM/dd/yy, hh:mm"}}</td>
            <td>{{exchange.updatedAt | date:"MM/dd/yy, hh:mm"}}</td>
            <td>
              <button class="btn btn-sm btn-warning" (click)="enableEditing(exchange)"><i class="fa fa-pencil"></i> Edit
              </button>
              <button class="btn btn-sm btn-danger" (click)="deleteExchange(exchange)"><i class="fa fa-trash"></i> Delete
              </button>
            </td>
          </tr>
          </tbody>
          <tbody *ngIf="isEditing">
          <tr>
            <td colspan="4">
              <form class="form-inline text-center" [formGroup]="addExchangeForm" (ngSubmit)="editExchange(exchangeRow)">
                <div formGroupName="exchanges">
                  <div class="form-group"
                       *ngFor="let currency of lists;">
                    <div class="form-group" [formGroupName]="currency">
                      <h3>{{currency}}</h3>
                      <input class="form-control" type="number" [(ngModel)]="exchangeRow['exchanges'][currency]['buy']"
                             formControlName="buy"
                             placeholder="buy" min="0">
                      <input class="form-control" type="number" [(ngModel)]="exchangeRow['exchanges'][currency]['sell']"
                             formControlName="sell"
                             placeholder="sell" min="0">
                    </div>
                  </div>
                </div>

                <br>
                <button class="btn btn-sm btn-primary" type="submit" [disabled]="!addExchangeForm.valid"><i
                  class="fa fa-floppy-o"></i> Save
                </button>
              </form>
              {{addExchangeForm.value | json }}
              <button class="btn btn-sm btn-warning" (click)="cancelEditing()"><i class="fa fa-times"></i> Cancel</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card" *ngIf="!isEditing">
      <h4 class="card-header">Add new exchange</h4>
      <div class="card-block">
        <form class="form-inline text-center" [formGroup]="addExchangeForm" (ngSubmit)="addExchange()">
          <div formGroupName="exchanges">
            <div class="form-group"
                 *ngFor="let currency of lists;">
              <div class="form-group" [formGroupName]="currency">
                <h3>{{currency}}</h3>
                <input class="form-control" type="number" formControlName="buy" placeholder="buy" min="0">
                <input class="form-control" type="number" formControlName="sell" placeholder="sell" min="0">
              </div>
            </div>
          </div>
          <br>
          <button class="btn btn-primary" type="submit" [disabled]="!addExchangeForm.valid"><i class="fa fa-floppy-o"></i>
            Add
          </button>
        </form>
        {{ addExchangeForm.value | json }}
      </div>
    </div>
  `,
  styleUrls: ['./exchanges.component.scss']
})
export class ExchangesComponent implements OnInit {

  exchanges = [];
  isLoading = true;
  lists = ['usd', 'euro'];
  exchangeRow = {};
  isEditing = false;

  addExchangeForm: FormGroup;

  constructor(private http: Http,
              private dataService: ExchangeService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getExachnges();

    this.addExchangeForm = this.formBuilder.group({
      exchanges: this.formBuilder.group({
        usd: this.formBuilder.group({
          buy: ['', Validators.required],
          sell: ['', Validators.required]
        }),
        euro: this.formBuilder.group({
          buy: ['', Validators.required],
          sell: ['', Validators.required]
        })
      })
    });
  }

  getExachnges() {
    this.dataService.getExchanges().subscribe(
      data => this.exchanges = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addExchange() {
    this.dataService.addExchange(this.addExchangeForm.value).subscribe(
      res => {
        const newExchange = res.json();
        this.exchanges.push(newExchange);
        this.addExchangeForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(exchange) {
    this.isEditing = true;
    this.exchangeRow = exchange;
  }

  cancelEditing() {
    this.isEditing = false;
    this.exchangeRow = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the exchanges to reset the editing
    this.getExachnges();
  }

  editExchange(exchange) {
    this.dataService.editExchange(exchange).subscribe(
      res => {
        this.isEditing = false;
        this.exchangeRow = exchange;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteExchange(exchange) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteExchange(exchange).subscribe(
        res => {
          const pos = this.exchanges.map(elem => { return elem._id; }).indexOf(exchange._id);
          this.exchanges.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}
