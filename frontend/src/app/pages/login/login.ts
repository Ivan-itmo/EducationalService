// src/app/pages/login/login.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      username: [''], // ← просто строка, без валидации
      password: ['']
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    console.log('Login with:', username, password);

    this.http.post('/api/auth/login', { username, password }).subscribe({
      next: () => {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Неверный логин или пароль');
      }
    });
  }
}
