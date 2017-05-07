import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  private API_URL = '/api/v1/users';

  constructor(private http: Http) { }

  getUsers(): Observable<any> {
    return this.http.get(this.API_URL)
               .map(res => res.json());
  }

  countUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/count`)
               .map(res => res.json());
  }

  addUser(user): Observable<any> {
    return this.http
               .post(this.API_URL, JSON.stringify(user), this.options);
  }

  getUser(user): Observable<any> {
    return this.http
               .get(`${this.API_URL}/${user._id}`, this.options);
  }

  editUser(user): Observable<any> {
    return this.http
               .put(`${this.API_URL}/${user._id}`, JSON.stringify(user), this.options);
  }

  deleteUser(user): Observable<any> {
    return this.http
               .delete(`${this.API_URL}/${user._id}`, this.options);
  }
}
