// src/main/java/project/rest/ProfileResource.java
package project.rest;

import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import project.entities.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import project.service.UserService;

@Path("/profile")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON) // ← принимаем JSON
public class ProfileResource {

    @EJB
    private UserService userService;

    // === ОБНОВЛЕНИЕ ПРОФИЛЯ СТУДЕНТА ===
    @PUT
    @Path("/student")
    public Response updateStudentProfile(StudentProfileRequest request) {
        if (request.getUsername() == null || request.getUsername().isEmpty()) {
            return Response.status(400)
                    .entity(new AuthResponse("Username is required"))
                    .build();
        }

        try {
            userService.updateStudentProfile(
                    request.getUsername(),
                    request.getFirstName(),
                    request.getLastName(),
                    request.getMiddleName(),
                    request.getAge(),
                    request.getSubject()
            );
            return Response.ok(new AuthResponse("Student profile updated")).build();
        } catch (RuntimeException e) {
            return Response.status(404)
                    .entity(new AuthResponse("Student not found"))
                    .build();
        }
    }

    // === ОБНОВЛЕНИЕ ПРОФИЛЯ УЧИТЕЛЯ ===
    @PUT
    @Path("/teacher")
    public Response updateTeacherProfile(TeacherProfileRequest request) {
        if (request.getUsername() == null || request.getUsername().isEmpty()) {
            return Response.status(400)
                    .entity(new AuthResponse("Username is required"))
                    .build();
        }

        try {
            userService.updateTeacherProfile(
                    request.getUsername(),
                    request.getFirstName(),
                    request.getLastName(),
                    request.getMiddleName(),
                    request.getAge(),
                    request.getSubject(),
                    request.getDegree()
            );
            return Response.ok(new AuthResponse("Teacher profile updated")).build();
        } catch (RuntimeException e) {
            return Response.status(404)
                    .entity(new AuthResponse("Teacher not found"))
                    .build();
        }
    }

    @GET
    @Path("/student/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStudentProfile(@PathParam("username") String username) {
        try {
            Student student = (Student) userService.findByUsername(username);
            if (student == null || student.getRole() != Role.STUDENT) {
                return Response.status(404).entity("Student not found").build();
            }
            return Response.ok(student).build();
        } catch (Exception e) {
            return Response.status(500).entity("Error loading profile").build();
        }
    }

    @GET
    @Path("/teacher/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTeacherProfile(@PathParam("username") String username) {
        try {
            Teacher teacher = (Teacher) userService.findByUsername(username);
            if (teacher == null || teacher.getRole() != Role.TEACHER) {
                return Response.status(404).entity("Teacher not found").build();
            }
            return Response.ok(teacher).build();
        } catch (Exception e) {
            return Response.status(500).entity("Error loading profile").build();
        }
    }

    // === КЛАССЫ ЗАПРОСОВ ===
    public static class StudentProfileRequest {
        private String username;
        private String firstName;
        private String lastName;
        private String middleName;
        private Integer age;
        private String subject;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        public String getMiddleName() { return middleName; }
        public void setMiddleName(String middleName) { this.middleName = middleName; }
        public Integer getAge() { return age; }
        public void setAge(Integer age) { this.age = age; }
        public String getSubject() { return subject; }
        public void setSubject(String subject) { this.subject = subject; }
    }

    public static class TeacherProfileRequest {
        private String username;
        private String firstName;
        private String lastName;
        private String middleName;
        private Integer age;
        private String subject;
        private String degree;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        public String getMiddleName() { return middleName; }
        public void setMiddleName(String middleName) { this.middleName = middleName; }
        public Integer getAge() { return age; }
        public void setAge(Integer age) { this.age = age; }
        public String getSubject() { return subject; }
        public void setSubject(String subject) { this.subject = subject; }
        public String getDegree() { return degree; }
        public void setDegree(String degree) { this.degree = degree; }
    }

    // === ОТВЕТ ===
    public static class AuthResponse {
        private String message;

        public AuthResponse(String message) {
            this.message = message;
        }

        public String getMessage() { return message; }
    }
}