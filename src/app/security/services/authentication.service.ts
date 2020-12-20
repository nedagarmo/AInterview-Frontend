import { Injectable } from '@angular/core';
import * as moment from "moment";
import { tap, shareReplay } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment'
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {

  }

  private setSession(authResult: any) {
    console.log("comprobación")
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  login(email:string, password:string) {
      return this.http.post<User>(environment.backend + '/api/login', { email, password })
          .pipe(tap((result: any) => this.setSession(result)), shareReplay())
  }

  register(email:string, password:string, fullName:string, rol:string) {
      return this.http.post<User>(environment.backend + '/api/register', { email, password, fullName, rol})
          .pipe(shareReplay())
  }

  logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("expires_at");
  }

  isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");

      if (expiration) {
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
      }

      return null;
  }
}
