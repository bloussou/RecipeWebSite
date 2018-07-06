import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import * as jwt_decode from 'jwt-decode';

import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
export const TOKEN_NAME = 'jwt_token';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export interface UserDetails {
  _id: string;
  email: string;
  exp: number;
  iat: number;
}

export interface SignInResponse {
  user: {
    _id: number;
    email: string;
    token: string;
  };

}

export interface CurrentResponse {
  _id: number;
  email: string;
  token: string;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}


@Injectable()
export class AuthService {
  private token: string;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem(TOKEN_NAME);
    }
    return this.token;
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
    this.token = token;
  }

  logout(): void {
    this.token = '';
    window.localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['auth']);
  }

  getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {

    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  getCurrentUsers(): Observable<SignInResponse> {
    const response = this.http.get<SignInResponse>('http://localhost:8080/authRouter/api/current');
    const request = response.pipe(map((data: SignInResponse) => {
      if (data.user.token) {
        this.saveToken(data.user.token);
      }
      return data;
    }));
    return request;
  }

  signIn(user: User): Observable<SignInResponse> {
    const response = this.http.post<SignInResponse>('http://localhost:8080/authRouter/api/User', { user: user });
    const request = response.pipe(map((data: SignInResponse) => {
      if (data.user.token) {
        this.saveToken(data.user.token);
      }
      return data;
    }));
    return request;
  }

  login(user: User): Observable<any> {
    const response = this.http.post<any>('http://localhost:8080/authRouter/api/login', { user: user });
    const request = response.pipe(map((res: { user: { _id: string, email: string, token: string } }) => {
      const data = res.user;
      if (data.token) {
        this.saveToken(data.token);
      }
      return data;
    }));
    return request;
  }






}
