// src/app/pages/register/register.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    // Только два поля: логин и пароль
    this.registerForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit() {
    const { username, password } = this.registerForm.value;

    // Отправляем простой объект
    this.http.post('/api/auth/register', { username, password }).subscribe({
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
