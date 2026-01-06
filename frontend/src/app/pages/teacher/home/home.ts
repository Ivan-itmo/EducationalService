// src/app/pages/teacher/home/home.component.ts
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-teacher',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class HomeTeacher {
  // Получаем данные из localStorage
  username = localStorage.getItem('username') || 'Преподаватель';
  userId = localStorage.getItem('userId') || '???';

  targetUserId: number | null = null;

  constructor(private router: Router) {}

  startChat(): void {
    if (this.targetUserId && this.targetUserId > 0) {
      this.router.navigate(['/chat', this.targetUserId]);
    }
  }
}
