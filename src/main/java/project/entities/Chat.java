// src/main/java/project/entities/Chat.java
package project.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "chats")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user1_id", nullable = false)
    private Long user1Id;

    @Column(name = "user2_id", nullable = false)
    private Long user2Id;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // Конструктор по умолчанию
    public Chat() {
        this.createdAt = LocalDateTime.now();
    }

    // Конструктор для создания чата
    public Chat(Long user1Id, Long user2Id) {
        // Сортируем ID, чтобы чат между 1 и 2 = чат между 2 и 1
        if (user1Id < user2Id) {
            this.user1Id = user1Id;
            this.user2Id = user2Id;
        } else {
            this.user1Id = user2Id;
            this.user2Id = user1Id;
        }
        this.createdAt = LocalDateTime.now();
    }

    // Геттеры
    public Long getId() { return id; }
    public Long getUser1Id() { return user1Id; }
    public Long getUser2Id() { return user2Id; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    // Сеттеры (обычно не нужны, но на всякий)
    public void setId(Long id) { this.id = id; }
    public void setUser1Id(Long user1Id) { this.user1Id = user1Id; }
    public void setUser2Id(Long user2Id) { this.user2Id = user2Id; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // Помогает определить, принадлежит ли чат пользователю
    public boolean containsUser(Long userId) {
        return user1Id.equals(userId) || user2Id.equals(userId);
    }
}