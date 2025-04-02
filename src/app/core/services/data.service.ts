import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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
}
