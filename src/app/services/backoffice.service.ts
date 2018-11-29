import { Injectable } from '@angular/core';
import { ApiResponse } from '@models/api-response';
import { environment } from '@env/environment';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackofficeService {

  constructor(private http: HttpClient) { }

  editMessage(data) {
    return this.http.post<ApiResponse>(environment.api_routes.backoffice_director_message, data)
    .pipe(
        tap(res => console.log('Message posted', res)),
        catchError(this.handleError)
    );
  }

  getMessage(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.api_routes.backoffice_director_message)
    .pipe(
        catchError(this.handleError)
    );
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
    return throwError('Something bad happened; please try again later.');
  }
}
