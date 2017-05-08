import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, Jsonp} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Bucketlist } from '../../interfaces/bucketlist.interface';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BucketlistService {
  url = 'http://127.0.0.1:5000';
  bucket_json;
  bucket_arry;

  constructor(private _http: Http, private _router: Router) { }

  getAllBucketlist(): Observable<Bucketlist[]> {
    let head = new Headers();
    head.append('Access-Control-Allow-Origin', '*');
    head.append('TOKEN', localStorage.getItem('TOKEN') );
    head.append('Content-Type', 'application/json');
    head.append('Access-Control-Allow-Methods', 'POST, GET, PUT');
    return this._http.get(`${this.url}/api/v1/bucketlists/`, { headers: head })
      .map((response: Response) => {
      this.bucket_json = response.json();
      this.bucket_arry = this.bucket_json.bucketlists;
      return <Bucketlist[]> this.bucket_arry;
    })
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    const message = `Error status code ${error.status} at ${error.url}`;
    if (error.status === 404) {
      this._router.navigate(['/404']);
      // this._errorPage.pageNotFound(error.status);
    } else if (error.status === 401) {
      this._router.navigate(['/401']);
    }
    return Observable.throw(message);
  }
}