import { Injectable } from '@angular/core';
import * as moment from "moment";
import { tap, shareReplay } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {

  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  login(email:string, password:string ) {
      return this.http.post<User>('/api/login', { email, password })
          .pipe(tap((res: any) => this.setSession), shareReplay())
  }

  logout() {
      localStorage.removeItem("id_token");
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
