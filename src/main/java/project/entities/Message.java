// src/main/java/project/entities/Message.java
package project.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

    @Column(name = "sender_id", nullable = false)
    private Long senderId;

    @Column(name = "content", nullable = false, length = 5000)
    private String content;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    // Конструктор по умолчанию
    public Message() {
        this.timestamp = LocalDateTime.now();
    }

    // Основной конструктор
    public Message(Chat chat, Long senderId, String content) {
        this.chat = chat;
        this.senderId = senderId;
        this.content = content;
        this.timestamp = LocalDateTime.now();
    }

    // Геттеры
    public Long getId() { return id; }
    public Chat getChat() { return chat; }
    public Long getSenderId() { return senderId; }
    public String getContent() { return content; }
    public LocalDateTime getTimestamp() { return timestamp; }

    // Сеттеры
    public void setChat(Chat chat) { this.chat = chat; }
    public void setSenderId(Long senderId) { this.senderId = senderId; }
    public void setContent(String content) { this.content = content; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}