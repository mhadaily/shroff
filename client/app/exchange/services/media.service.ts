import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { debug } from 'util';

@Injectable()
export class MediaService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  private API_URL: string = '/api/v1/media';

  constructor(private http: Http) { }

  getMedias(): Observable<any> {
    return this.http.get(this.API_URL)
               .map(res => res.json());
  }

  countMedias(): Observable<any> {
    return this.http.get(`${this.API_URL}/count`)
               .map(res => res.json());
  }

  addMedia(media): Observable<any> {
    return this.http
               .post(this.API_URL, media);
    // const photo: any = media.getAll('currencyImage')[0];
    // const fileLikeObject: any = {
    //   lastModifiedDate: photo.lastModifiedDate,
    //   fileSize: photo.size,
    //   mimeType: photo.type,
    //   fileName: photo.name
    // };
    // return this.http
    //            .post(this.API_URL, JSON.stringify(fileLikeObject), this.options);
  }

  getMedia(media): Observable<any> {
    return this.http
               .get(`${this.API_URL}/${media._id}`, this.options);
  }

  editMedia(media): Observable<any> {
    return this.http
               .put(`${this.API_URL}/${media._id}`, JSON.stringify(media), this.options);
  }

  deleteMedia(media): Observable<any> {
    return this.http
               .delete(`${this.API_URL}/${media._id}`, this.options);
  }
}
