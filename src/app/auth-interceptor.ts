import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null;
    const user = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')!) : null;

    if (token) {
      const cloned = req.clone({
        headers: req.headers
          .set('Authorization', `Bearer ${token}`)
          .set('UserId', `${user.id}`)
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
