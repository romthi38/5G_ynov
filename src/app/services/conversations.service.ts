import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ApiResponse } from '@models/api-response';
import { environment } from '@env/environment';
import { catchError, tap } from 'rxjs/operators';
import { Conversation } from '@models/conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationsService {
  private conversation = new BehaviorSubject(null);
  private conversationsList = new BehaviorSubject([]);
  private previewMessage = new BehaviorSubject('');
  currentConversation = this.conversation.asObservable();
  currentConversationsList = this.conversationsList.asObservable();
  currentPreviewMessage = this.previewMessage.asObservable();

  constructor(private http: HttpClient) { }

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(environment.api_routes.discussions_list)
    .pipe(
        tap(res => console.log('Fetched conversations', res)),
        catchError(this.handleError)
    );
  }

  getOrCreate(data): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.api_routes.discussions_get_or_create, data)
    .pipe(
        tap(res => console.log('Get or created conversation', res)),
        catchError(this.handleError)
    );
  }

  getMessages(discussionId, messagesNumber): Observable<ApiResponse> {
    const params = new HttpParams().set('messagesNumber', messagesNumber);
    const options = environment.production ? {params} : {};

    return this.http.get<ApiResponse>(`${environment.api_routes.discussions_get_messages}/${discussionId}`, options)
    .pipe(
        // tap(res => console.log('Fetched messages', res)),
        catchError(this.handleError)
    );
  }

  leave(data) {
    return this.http.post<ApiResponse>(environment.api_routes.discussions_leave, data)
    .pipe(
        tap(res => console.log('Discussion left', res)),
        catchError(this.handleError)
    );
  }

  addMembers(data) {
    return this.http.post<ApiResponse>(environment.api_routes.discussions_add_members, data)
    .pipe(
        tap(res => console.log('Added members', res)),
        catchError(this.handleError)
    );
  }

  postMessage(data) {
    return this.http.post<ApiResponse>(environment.api_routes.discussions_post_message, data)
    .pipe(
        tap(res => console.log('Message posted', res)),
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

  changeCurrentConversation(conv: Conversation) {
    this.conversation.next(conv);
  }

  changeCurrentConversationsList(list: Conversation[]) {
    this.conversationsList.next(list);
  }

  changeCurrentPreviewMessage(message: string) {
    this.previewMessage.next(message);
  }
}
