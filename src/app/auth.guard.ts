import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('data');

    if (token && userData) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
