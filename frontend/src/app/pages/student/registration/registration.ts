import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})

export class RegisterStudentComponent {
  username = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    this.http.post('/api/auth/register', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => {
        alert('Регистрация успешна! Теперь войдите.');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Ошибка регистрации. Возможно, такой логин уже существует.');
      }
    });
  }
}
