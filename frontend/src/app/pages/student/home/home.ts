// src/app/pages/student/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {DatePipe} from '@angular/common';

interface Chat {
  id: number;
  user1Id: number;
  user2Id: number;
  createdAt: string;
}

@Component({
  selector: 'app-home-student',
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class HomeStudent implements OnInit {
  username = localStorage.getItem('username') || 'Студент';
  userId = +localStorage.getItem('userId')!;

  targetUserId: number | null = null;
  chats: Chat[] = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadChats();
  }

  loadChats(): void {
    this.http.get<Chat[]>(`/api/chats?userId=${this.userId}`).subscribe({
      next: (chats) => {
        this.chats = chats;
      },
      error: (err) => {
        console.error('Ошибка загрузки чатов:', err);
      }
    });
  }

  startChat(): void {
    if (!this.targetUserId || this.targetUserId <= 0 || this.targetUserId === this.userId) {
      alert('Введите корректный ID собеседника (не свой!)');
      return;
    }

    // Создаём чат на бэкенде
    this.http.post<Chat>('/api/chats/create', {}, {
      params: {
        currentUserId: this.userId.toString(),
        otherUserId: this.targetUserId.toString()
      }
    }).subscribe({
      next: (chat) => {
        this.router.navigate(['/chat', chat.id]);
      },
      error: (err) => {
        alert('Не удалось создать чат. Проверьте ID.');
        console.error('Ошибка создания чата:', err);
      }
    });
  }

  openChat(chatId: number): void {
    this.router.navigate(['/chat', chatId]);
  }

  getOtherUserId(chat: Chat): number {
    return chat.user1Id === this.userId ? chat.user2Id : chat.user1Id;
  }

  logout(): void {
    // Удаляем все данные авторизации
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');

    // Переходим на стартовую страницу
    this.router.navigate(['/']);
  }
}
