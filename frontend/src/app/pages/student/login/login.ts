import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginStudentComponent {
  username = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    this.http.post('/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
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
