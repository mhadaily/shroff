import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder, FormControlName, FormGroupName, FormArray } from '@angular/forms';

import { ExchangeService } from '../services/exchange.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  exchanges = [];
  isLoading = true;
  lists = ['usd', 'euro'];
  currency = {};
  isEditing = false;

  addExchangeForm: FormGroup;

  constructor(private http: Http,
              private dataService: ExchangeService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getExachnges();

    this.addExchangeForm = this.formBuilder.group({
      exchanges: this.formBuilder.array([
        this.formBuilder.group({
          usd: this.formBuilder.group({
            buy: ['', Validators.required],
            sell: ['', Validators.required]
          })
        }),
        this.formBuilder.group({
          euro: this.formBuilder.group({
            buy: ['', Validators.required],
            sell: ['', Validators.required]
          })
        })
      ])
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
    this.currency = exchange;
  }

  cancelEditing() {
    this.isEditing = false;
    this.currency = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the exchanges to reset the editing
    this.getExachnges();
  }

  editExchange(exchange) {
    this.dataService.editExchange(exchange).subscribe(
      res => {
        this.isEditing = false;
        this.currency = exchange;
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
