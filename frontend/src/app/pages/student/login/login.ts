import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-student',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginStudentComponent {
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
    this.router.navigate(['/student/welcome']); // ← возвращаемся назад в истории браузера
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
        // Сохраняем данные (если нужно)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);

        this.successMessage = 'Вход выполнен! Перенаправление...';
        this.cdr.detectChanges();

        // Через 1.5 секунды — переходим
        setTimeout(() => {
          this.router.navigate(['/student/home']);
        }, 1000);
      },
      error: () => {
        this.errorMessage = 'Неверный логин или пароль';
        this.cdr.detectChanges();
      }
    });
  }
}
