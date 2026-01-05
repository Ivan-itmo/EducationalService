import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register-teacher',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})

export class RegisterTeacherComponent {
  username = '';
  password = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) {}

  goBack(): void {
    this.router.navigate(['/teacher/welcome']); // ← возвращаемся назад в истории браузера
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    this.http.post('/api/auth/register/teacher', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.successMessage = 'Регистрация успешна! Теперь войдите.';
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/teacher/login']);
        }, 1000);
      },
      error: (err) => {
        this.errorMessage = 'Ошибка регистрации. Возможно, такой логин уже существует.';
        console.log('Ошибка:', this.errorMessage);
        this.cdr.detectChanges();
      }
    });
  }
}
