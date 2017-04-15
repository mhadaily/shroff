import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { DataService } from '../services/data.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  exchanges = [];
  isLoading = true;

  exchange = {};
  isEditing = false;

  addExchangeForm: FormGroup;
  name = new FormControl('', Validators.required);
  list = new FormControl('', Validators.required);

  constructor(private http: Http,
              private dataService: DataService,
              public toast: ToastComponent,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getExachnges();

    this.addExchangeForm = this.formBuilder.group({
      name: this.name,
      list: this.list,
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
    this.exchange = exchange;
  }

  cancelEditing() {
    this.isEditing = false;
    this.exchange = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the exchanges to reset the editing
    this.getExachnges();
  }

  editExchange(exchange) {
    this.dataService.editExchange(exchange).subscribe(
      res => {
        this.isEditing = false;
        this.exchange = exchange;
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
