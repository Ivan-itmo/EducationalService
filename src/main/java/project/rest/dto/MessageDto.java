// src/main/java/project/rest/dto/MessageDto.java
package project.rest.dto;

import java.time.LocalDateTime;

public class MessageDto {
    private Long id;
    private Long senderId;
    private String content;
    private LocalDateTime timestamp;

    // Обязательный конструктор для JPQL NEW
    public MessageDto(Long id, Long senderId, String content, LocalDateTime timestamp) {
        this.id = id;
        this.senderId = senderId;
        this.content = content;
        this.timestamp = timestamp;
    }

    // Геттеры (обязательны для JSON)
    public Long getId() { return id; }
    public Long getSenderId() { return senderId; }
    public String getContent() { return content; }
    public LocalDateTime getTimestamp() { return timestamp; }
}