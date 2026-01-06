// src/app/pages/chat/chat.component.ts
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {DatePipe} from '@angular/common';

interface Message {
  id: number;
  chat: { id: number };
  senderId: number;
  content: string;
  timestamp: string;
}

@Component({
  selector: 'app-chat',
  imports: [FormsModule, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
  standalone: true
})
export class ChatComponent implements OnInit {
  chatId!: number;
  currentUserId!: number;
  newMessage = '';
  messages: Message[] = [];

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chatId = +this.route.snapshot.paramMap.get('chatId')!;
    this.currentUserId = +localStorage.getItem('userId')!;

    this.loadMessages();
    // Автообновление каждые 3 секунды
    setInterval(() => {
      this.loadMessages();
    }, 3000);
  }

  loadMessages(): void {
    this.http.get<Message[]>(`/api/chats/${this.chatId}/messages`).subscribe({
      next: (data) => {
        this.messages = data;
        this.cdr.detectChanges();
        this.scrollToBottom();
      },
      error: (err) => console.error('Ошибка загрузки сообщений:', err)
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    const payload = {
      senderId: this.currentUserId,
      content: this.newMessage.trim()
    };

    this.http.post(`/api/chats/${this.chatId}/messages`, payload).subscribe({
      next: () => {
        this.newMessage = '';
        this.loadMessages(); // обновляем сразу
      },
      error: (err) => {
        console.error('Ошибка отправки:', err);
        alert('Не удалось отправить сообщение');
      }
    });
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }, 10);
  }

  goBack(): void {
    const role = localStorage.getItem('role');
    if (role === 'TEACHER') {
      this.router.navigate(['/teacher/home']);
    } else {
      this.router.navigate(['/student/home']);
    }
  }
}
