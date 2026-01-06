import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  errorMessage: string | null = null;
  successMessage: string | null = null; // ← добавили

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  goBack(): void {
    this.router.navigate(['/teacher/welcome']); // ← возвращаемся назад в истории браузера
  }

  onSubmit() {
    // Сбрасываем оба сообщения
    this.errorMessage = null;
    this.successMessage = null;

    this.http.post('/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        // Сохраняем данные
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);
        localStorage.setItem('userId', response.id.toString());

        // Показываем сообщение об успехе
        this.successMessage = 'Вход выполнен! Перенаправление...';
        this.cdr.detectChanges();

        // Переход через 1.5 секунды
        setTimeout(() => {
          this.router.navigate(['/teacher/home']);
        }, 1000);
      },
      error: () => {
        this.errorMessage = 'Неверный логин или пароль';
        this.cdr.detectChanges();
      }
    });
  }
}
