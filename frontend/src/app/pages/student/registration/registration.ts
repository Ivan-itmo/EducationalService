import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})

export class RegisterStudentComponent {
  username = '';
  password = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

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
        console.error('Registration error:', err);
      }
    });
  }
}
