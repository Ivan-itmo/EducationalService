import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login-teacher',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginTeacherComponent {
  username = '';
  password = '';
  errorMessage: string | null = null; // ← новая переменная

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    // Сбрасываем ошибку перед новой попыткой
    this.errorMessage = null;

    this.http.post('/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage = 'Неверный логин или пароль'; // ← сохраняем ошибку
        console.log('Ошибка:', this.errorMessage);
      }
    });
  }
}
