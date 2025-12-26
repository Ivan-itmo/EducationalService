// src/main/java/project/rest/AuthResource.java
package project.rest;

import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import project.service.UserService;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @EJB
    private UserService userService;

    @POST
    @Path("/register")
    public Response register(RegisterRequest request) {
        try {
            userService.register(request.getUsername(), request.getPassword());
            return Response.ok(new AuthResponse("User registered")).build();
        } catch (RuntimeException e) {
            return Response.status(400)
                    .entity(new AuthResponse("User already exists"))
                    .build();
        }
    }

    @POST
    @Path("/login")
    public Response login(LoginRequest request) {
        boolean valid = userService.validateCredentials(
                request.getUsername(),
                request.getPassword()
        );
        if (valid) {
            return Response.ok(new AuthResponse("Login successful")).build();
        } else {
            return Response.status(401)
                    .entity(new AuthResponse("Invalid credentials"))
                    .build();
        }
    }

    // DTO
    public static class RegisterRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class AuthResponse {
        private String message;

        public AuthResponse(String message) {
            this.message = message;
        }

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}