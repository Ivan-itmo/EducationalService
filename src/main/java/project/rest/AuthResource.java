// src/main/java/project/rest/AuthResource.java
package project.rest;

import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import project.service.UserService;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON) // ← теперь все методы ожидают JSON
public class AuthResource {

    @EJB
    private UserService userService;

    // === РЕГИСТРАЦИЯ СТУДЕНТА ===
    @POST
    @Path("/register/student")
    public Response registerStudent(StudentRegisterRequest request) {
        if (request.getUsername() == null || request.getUsername().isEmpty() ||
                request.getPassword() == null || request.getPassword().isEmpty()) {
            return Response.status(400)
                    .entity(new AuthResponse("Username and password are required"))
                    .build();
        }

        try {
            userService.registerStudent(request.getUsername(), request.getPassword());
            return Response.ok(new AuthResponse("Student account created")).build();
        } catch (RuntimeException e) {
            return Response.status(400)
                    .entity(new AuthResponse("Username already taken"))
                    .build();
        }
    }

    // === РЕГИСТРАЦИЯ УЧИТЕЛЯ ===
    @POST
    @Path("/register/teacher")
    public Response registerTeacher(TeacherRegisterRequest request) {
        if (request.getUsername() == null || request.getUsername().isEmpty() ||
                request.getPassword() == null || request.getPassword().isEmpty()) {
            return Response.status(400)
                    .entity(new AuthResponse("Username and password are required"))
                    .build();
        }

        try {
            userService.registerTeacher(request.getUsername(), request.getPassword());
            return Response.ok(new AuthResponse("Teacher account created")).build();
        } catch (RuntimeException e) {
            return Response.status(400)
                    .entity(new AuthResponse("Username already taken"))
                    .build();
        }
    }

    // === ВХОД ===
    @POST
    @Path("/login")
    public Response login(LoginRequest request) {
        if (request.getUsername() == null || request.getUsername().isEmpty() ||
                request.getPassword() == null || request.getPassword().isEmpty()) {
            return Response.status(400)
                    .entity(new AuthResponse("Username and password are required"))
                    .build();
        }

        String role = userService.authenticate(request.getUsername(), request.getPassword());
        if (role != null) {
            return Response.ok(new LoginResponse(request.getUsername(), role)).build();
        } else {
            return Response.status(401)
                    .entity(new AuthResponse("Invalid credentials"))
                    .build();
        }
    }

    // === КЛАССЫ ЗАПРОСОВ ===
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class StudentRegisterRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class TeacherRegisterRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // === ОТВЕТЫ ===
    public static class LoginResponse {
        private String username;
        private String role;

        public LoginResponse(String username, String role) {
            this.username = username;
            this.role = role;
        }

        public String getUsername() { return username; }
        public String getRole() { return role; }
    }

    public static class AuthResponse {
        private String message;

        public AuthResponse(String message) {
            this.message = message;
        }

        public String getMessage() { return message; }
    }
}