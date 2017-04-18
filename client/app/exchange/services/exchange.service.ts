import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ExchangeService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  private API_URL: string = '/api/v1/exchanges';

  constructor(private http: Http) { }

  getExchanges(): Observable<any> {
    return this.http.get(this.API_URL)
               .map(res => res.json());
  }

  countExchnages(): Observable<any> {
    return this.http.get(`${this.API_URL}/count`)
               .map(res => res.json());
  }

  addExchange(exchange): Observable<any> {
    return this.http
               .post(this.API_URL, JSON.stringify(exchange), this.options);
  }

  getExchange(exchange): Observable<any> {
    return this.http
               .get(`${this.API_URL}/${exchange._id}`, this.options);
  }

  editExchange(exchange): Observable<any> {
    return this.http
               .put(`${this.API_URL}/${exchange._id}`, JSON.stringify(exchange), this.options);
  }

  deleteExchange(exchange): Observable<any> {
    return this.http
               .delete(`${this.API_URL}/${exchange._id}`, this.options);
  }

}
