// src/main/java/project/rest/ChatResource.java
package project.rest;

import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import project.entities.Chat;
import project.entities.Message;
import project.service.ChatService;
import project.rest.dto.MessageDto;

import java.util.List;

@Path("/chats")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ChatResource {

    @EJB
    private ChatService chatService;

    // Получить список чатов пользователя
    @GET
    public Response getChats(@QueryParam("userId") Long userId) {
        if (userId == null) {
            return Response.status(400).entity("userId is required").build();
        }
        try {
            List<Chat> chats = chatService.getChatsByUserId(userId);
            return Response.ok(chats).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity("Error loading chats").build();
        }
    }

    // Создать/найти чат и получить его ID
    @POST
    @Path("/create")
    public Response createChat(@QueryParam("currentUserId") Long currentUserId,
                               @QueryParam("otherUserId") Long otherUserId) {
        if (currentUserId == null || otherUserId == null) {
            return Response.status(400).entity("Both user IDs are required").build();
        }
        try {
            Chat chat = chatService.findOrCreateChat(currentUserId, otherUserId);
            return Response.ok(chat).build(); // возвращаем chat с id
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity("Error creating chat").build();
        }
    }

    // Получить сообщения чата
    @GET
    @Path("/{chatId}/messages")
    public Response getMessages(@PathParam("chatId") Long chatId) {
        try {
            List<MessageDto> messages = chatService.getMessagesByChatId(chatId);
            return Response.ok(messages).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity("Error loading messages").build();
        }
    }

    // Отправить сообщение
    @POST
    @Path("/{chatId}/messages")
    public Response sendMessage(@PathParam("chatId") Long chatId,
                                SendMessageRequest request) {
        if (request == null || request.getSenderId() == null || request.getContent() == null) {
            return Response.status(400).entity("senderId and content are required").build();
        }
        try {
            chatService.saveMessage(chatId, request.getSenderId(), request.getContent());
            return Response.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(500).entity("Error sending message").build();
        }
    }

    public static class SendMessageRequest {
        private Long senderId;
        private String content;

        public Long getSenderId() { return senderId; }
        public void setSenderId(Long senderId) { this.senderId = senderId; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
    }
}