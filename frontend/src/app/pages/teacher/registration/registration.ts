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

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    this.http.post('/api/auth/register', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        this.successMessage = 'Регистрация успешна! Теперь войдите.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = 'Ошибка регистрации. Возможно, такой логин уже существует.';
        console.log('Ошибка:', this.errorMessage);
        this.cdr.detectChanges();
      }
    });
  }
}
