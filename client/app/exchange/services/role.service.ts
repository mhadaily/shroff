import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RoleService {
  
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  private API_URL: string = '/api/v1/roles';
  
  constructor(private http: Http) { }
  
  getRoles(): Observable<any> {
    return this.http.get(this.API_URL)
               .map(res => res.json());
  }
  
  countRoles(): Observable<any> {
    return this.http.get(`${this.API_URL}/count`)
               .map(res => res.json());
  }
  
  addRole(role): Observable<any> {
    return this.http
               .post(this.API_URL, JSON.stringify(role), this.options);
  }
  
  getRole(role): Observable<any> {
    return this.http
               .get(`${this.API_URL}/${role._id}`, this.options);
  }
  
  editRole(role): Observable<any> {
    return this.http
               .put(`${this.API_URL}/${role._id}`, JSON.stringify(role), this.options);
  }
  
  deleteRole(role): Observable<any> {
    return this.http
               .delete(`${this.API_URL}/${role._id}`, this.options);
  }
}