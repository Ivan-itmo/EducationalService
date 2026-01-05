// src/app/student/profile/profile.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-student',
  imports: [FormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  standalone: true
})
export class ProfileStudent implements OnInit {
  // Изначально пустой профиль
  profile = {
    username: '',
    firstName: '',
    lastName: '',
    middleName: '',
    age: null as number | null,
    subject: ''
  };

  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (!username) {
      this.router.navigate(['/']);
      return;
    }

    // Загружаем профиль с сервера
    this.http.get<StudentProfileResponse>(`/api/profile/student/${username}`)
      .subscribe({
        next: (data) => {
          // ✅ ЗАМЕНЯЕМ ВЕСЬ ОБЪЕКТ — мгновенное обновление UI
          this.profile = {
            username: username,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            middleName: data.middleName || '',
            age: data.age,
            subject: data.subject || ''
          };
          this.cdr.detectChanges(); // гарантируем отображение
        },
        error: () => {
          // Если профиля нет — оставляем пустой (но с username)
          this.profile = {
            username: username,
            firstName: '',
            lastName: '',
            middleName: '',
            age: null,
            subject: ''
          };
        }
      });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    // Отправляем данные (без валидации — любые поля могут быть пустыми)
    this.http.put('/api/profile/student', this.profile).subscribe({
      next: () => {
        this.successMessage = '✅ Профиль успешно обновлён!';
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/student/home']);
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = '❌ Не удалось сохранить профиль. Попробуйте позже.';
        console.error('Profile update error:', err);
        this.cdr.detectChanges();
      }
    });
  }
}

// Интерфейс ответа от сервера
interface StudentProfileResponse {
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  age: number | null;
  subject: string;
}
