import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getExchanges(): Observable<any> {
    return this.http.get('/api/exchanges').map(res => res.json());
  }

  countExchnages(): Observable<any> {
    return this.http.get('/api/exchanges/count').map(res => res.json());
  }

  addExchange(exchange): Observable<any> {
    return this.http.post('/api/exchanges', JSON.stringify(exchange), this.options);
  }

  getExchange(exchange): Observable<any> {
    return this.http.get(`/api/exchanges/${exchange._id}`, this.options);
  }

  editExchange(exchange): Observable<any> {
    return this.http.put(`/api/exchanges/${exchange._id}`, JSON.stringify(exchange), this.options);
  }

  deleteExchange(exchange): Observable<any> {
    return this.http.delete(`/api/exchanges/${exchange._id}`, this.options);
  }

}
