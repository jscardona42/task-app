import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  gerUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  getUserById(UserId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${UserId}`);
  }
}
