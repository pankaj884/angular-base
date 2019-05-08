import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs/index';

const baseUrl = environment.apiUrl;

@Injectable()
export class AuthService {

  private loggedInSource = new Subject<string>();
  loggedIn$ = this.loggedInSource.asObservable();

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
  }

  public getToken(): string {
    return this.jwtHelperService.tokenGetter();
  }

  public isAuthenticated(): boolean {
    const token: string = this.jwtHelperService.tokenGetter();

    if (!token) {
      return false;
    }

    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);

    return !tokenExpired;
  }

  public setCredentials(data) {
    localStorage.setItem('globals', JSON.stringify(data));
    this.loggedInSource.next(data);
  }

  public clearCredentials() {
    localStorage.removeItem('globals');
    this.loggedInSource.next(null);
  }

  public login(params) {

    /* const body = `email=${encodeURIComponent(params.username)}&password=${encodeURIComponent(params.password)}
     &organisationName=${encodeURIComponent(params.organisationName)}`; */

    const body = `email=${encodeURIComponent(params.username)}&password=${encodeURIComponent(params.password)}`;

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };

    return this.http.post(baseUrl + '/auth/login', body, httpOptions);
  }

  public register(body) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post(baseUrl + '/auth/organisation/registration', body, httpOptions);
  }

  public forgetPassword(body) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post(baseUrl + '/users/forgotPassword', body, httpOptions);
  }

  public getUser() {
    return JSON.parse(localStorage.getItem('globals'));
  }
}
