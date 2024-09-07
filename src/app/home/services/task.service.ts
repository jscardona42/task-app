import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tasks`);
  }

  getTaskById(taskId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tasks/${taskId}`);
  }

  getTaskByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tasks/${userId}`);
  }

  createTask(tasks: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tasks`, tasks);
  }

  updateTask(taskId: number, tasks: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tasks/update${taskId}`, tasks);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tasks/delete/${taskId}`, {});
  }

}
