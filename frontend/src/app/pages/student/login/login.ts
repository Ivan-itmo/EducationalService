import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';

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

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) {}

  onSubmit() {
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
        this.errorMessage = 'Неверный логин или пароль';
        console.log('Ошибка:', this.errorMessage);
        this.cdr.detectChanges();
      }
    });
  }
}
