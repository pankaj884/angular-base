import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const baseUrl = environment.apiUrl;

@Injectable()
export class ApiRequestService {

  constructor(private http: HttpClient) { }

  get(relPath, body = {}) {
    const options = {
      headers: httpOptions.headers,
      params: body
    };
    return this.http.get(baseUrl + relPath, options);
  }
  create(relPath, body = {}) {
    return this.http.post(baseUrl + relPath, body, httpOptions);
  }
  update(relPath, body = {}) {
    return this.http.put(baseUrl + relPath, body, httpOptions);
  }
  patchUpdate(relPath, body = {}) {
    return this.http.patch(baseUrl + relPath, body, httpOptions);
  }
  deleteApi(relPath) {
    return this.http.delete(baseUrl + relPath, httpOptions);
  }

  localGet(relPath, body = {}) {
    const options = {
      headers: httpOptions.headers,
      params: body
    };
    return this.http.get(relPath, options);
  }
}
