import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Movie } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = environment.apiUrl + '/trailers';

  private http = inject(HttpClient);

  // GET all items
  getAll(type: string = '', param: string = ''): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + type + '?language=en' + param);
  }

  // GET item by ID
  getById(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // POST (create) item
  create(item: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, item)
      .pipe(catchError(this.handleError));
  }

  // PUT (update) item
  update(id: number, item: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/${id}`, item)
      .pipe(catchError(this.handleError));
  }

  // DELETE item
  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => 'Something bad happened; please try again later.');
  }
}
