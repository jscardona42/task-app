import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from 'src/app/home/interfaces/user';
import { Login } from 'src/app/home/interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup([]);
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateSession();
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      this.authService.siginUser(this.loginForm.value).subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Bienvenido ${data.user.name}`
          });

          this.setSession(data);

          setTimeout(() => {
            this.router.navigate(['home/task']);
          }, 2000);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Credenciales inválidas'
          });
        }
      });
    }
  }

  setSession(data: Login) {
    localStorage.setItem("data", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("permissions", JSON.stringify(data.permissions));
  }

  validateSession() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('data');

    if (token && userData) {
      this.router.navigate(['/home']);
    }
  }
}
