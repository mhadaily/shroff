import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CurrencyService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  private API_URL: string = '/api/v1/currencies';

  constructor(private http: Http) { }

  getCurrencies(): Observable<any> {
    return this.http
               .get(this.API_URL).map(res => res.json());
  }

  addCurrency(currency): Observable<any> {
    return this.http
               .post(this.API_URL, JSON.stringify(currency), this.options);
  }

  getCurrency(currency): Observable<any> {
    return this.http
               .get(`${this.API_URL}/${currency._id}`, this.options);
  }

  editCurrency(currency): Observable<any> {
    return this.http
               .put(`${this.API_URL}/${currency._id}`, JSON.stringify(currency), this.options);
  }

  deleteCurrency(currency): Observable<any> {
    return this.http
               .delete(`${this.API_URL}/${currency._id}`, this.options);
  }

}
