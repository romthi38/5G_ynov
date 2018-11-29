import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { catchError, tap } from 'rxjs/operators';
import { ApiResponse } from '@models/api-response';
import { User, UserStatus } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private selectedStatuses = new BehaviorSubject([]);
  private searchedLogin = new BehaviorSubject('');
  private loggedInUser = new BehaviorSubject({
    id: null,
    login: '',
    status: null,
    avatar: '',
    lastname: '',
    firstname: '',
  });
  currentSelectedStatuses = this.selectedStatuses.asObservable();
  currentSearchedLogin = this.searchedLogin.asObservable();
  currentLoggedInUser = this.loggedInUser.asObservable();

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.api_routes.users_get_all)
      .pipe(
        tap(res => console.log('Fetched users', res)),
        catchError(this.handleError)
      );
  }

  getConnected(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.api_routes.users_get_onlines)
    .pipe(
        // tap(res => console.log('Fetched connected users', res)),
        catchError(this.handleError)
    );
  }

  getLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }

  private handleError(error: HttpErrorResponse) {
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
    return throwError(
      'Something bad happened; please try again later.');
  }

  changeSelectedStatuses(statuses: Array<string>) {
    this.selectedStatuses.next(statuses);
  }

  changeSearchedLogin(login: string) {
    this.searchedLogin.next(login);
  }

  changeLoggedInUser(user) {
    this.loggedInUser.next(user);
  }
}
