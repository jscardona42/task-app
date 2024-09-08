import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/home/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  siginUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, user);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  sigoutUser(UserId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/logout/${UserId}`);
  }
}
