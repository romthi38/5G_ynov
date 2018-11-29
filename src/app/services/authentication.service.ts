import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { ApiResponse } from '@models/api-response';
import { catchError, shareReplay, tap, timeout } from 'rxjs/operators';
import { throwError, TimeoutError } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { UsersService } from '@services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
      private http: HttpClient,
      private router: Router,
      private usersService: UsersService,
  ) {}

  heartBeat() {
    return this.http.post<ApiResponse>(environment.api_routes.heartbeat, {})
    .pipe(
        timeout(10000),
        tap(res => console.log('Boum boum', res)),
        catchError(this.handleError),
    );
  }

  login(login: string, password: string) {
    return this.http.post<ApiResponse>(environment.api_routes.login, {login, password})
    .pipe(
      tap(res => this.setSession(res)),
      shareReplay(),
      catchError(this.handleError),
    );
  }

  private setSession(authResult) {
    const token = authResult.payload.token;
    const user = authResult.payload.user;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.usersService.changeLoggedInUser(user);
  }

  logout() {
    return this.http.post<ApiResponse>(environment.api_routes.logout, {})
      .pipe(
        tap(res => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigateByUrl(environment.front_routes.login);
        }),
        catchError(this.handleError),
      );
  }

  public isLoggedIn() {
    return (!this.getToken() || this.isTokenExpired()) ? false : true;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  private handleError(error: HttpErrorResponse) {
    if (error.name === 'TimeoutError') {
      return throwError('Le serveur met trop de temps à répondre, veuillez vérifier votre connexion');
    }

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
