// src/main/java/project/service/ChatService.java
package project.service;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import project.entities.Chat;
import project.entities.Message;
import project.rest.dto.MessageDto;

import java.util.List;

@Stateless
public class ChatService {

    @PersistenceContext
    private EntityManager em;

    // Найти или создать чат между двумя пользователями
    public Chat findOrCreateChat(Long userId1, Long userId2) {
        if (userId1.equals(userId2)) {
            throw new IllegalArgumentException("Cannot chat with yourself");
        }

        // Сортируем, как в конструкторе Chat
        Long u1 = userId1 < userId2 ? userId1 : userId2;
        Long u2 = userId1 < userId2 ? userId2 : userId1;

        String jpql = "SELECT c FROM Chat c WHERE c.user1Id = :u1 AND c.user2Id = :u2";
        TypedQuery<Chat> query = em.createQuery(jpql, Chat.class);
        query.setParameter("u1", u1);
        query.setParameter("u2", u2);

        List<Chat> results = query.getResultList();
        if (!results.isEmpty()) {
            return results.get(0);
        }

        // Создаём новый чат
        Chat newChat = new Chat(u1, u2);
        em.persist(newChat);
        return newChat;
    }

    // Получить все чаты пользователя
    public List<Chat> getChatsByUserId(Long userId) {
        String jpql = """
            SELECT c FROM Chat c
            WHERE c.user1Id = :userId OR c.user2Id = :userId
            ORDER BY c.createdAt DESC
            """;
        TypedQuery<Chat> query = em.createQuery(jpql, Chat.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }

    // Сохранить сообщение в чат
    public void saveMessage(Long chatId, Long senderId, String content) {
        Chat chat = em.find(Chat.class, chatId);
        if (chat == null) {
            throw new IllegalArgumentException("Chat not found");
        }
        if (!chat.containsUser(senderId)) {
            throw new IllegalArgumentException("User is not a participant of this chat");
        }

        Message message = new Message(chat, senderId, content);
        em.persist(message);
    }

    // Получить сообщения чата
    public List<MessageDto> getMessagesByChatId(Long chatId) {
        String jpql = """
    SELECT NEW project.rest.dto.MessageDto(
        m.id,
        m.senderId,
        m.content,
        m.timestamp
    )
    FROM Message m
    WHERE m.chat.id = :chatId
    ORDER BY m.timestamp ASC
    """;
        TypedQuery<MessageDto> query = em.createQuery(jpql, MessageDto.class);
        query.setParameter("chatId", chatId);
        return query.getResultList();
    }
}