import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/api';
  private tasksSubject: BehaviorSubject<any | null> =
    new BehaviorSubject<any | null>(null);

  constructor(private http: HttpClient) { }

  getTaskById(taskId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tasks/${taskId}`);
  }

  getTaskByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tasks/${userId}`);
  }

  createTask(tasks: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tasks`, tasks);
  }

  updateTask(taskId?: number, task?: Task): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tasks/update/${taskId}`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tasks/delete/${taskId}`, {});
  }

  public loadTasks(filters?: {}): Observable<any> {
    return this.http.get<any | null>(`${this.apiUrl}/tasks`, {
      params: filters,
    });
  }

  public getTasks(): Observable<any | null> {
    return this.tasksSubject.asObservable();
  }

}
