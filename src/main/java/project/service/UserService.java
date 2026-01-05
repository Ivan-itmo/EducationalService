// src/main/java/project/service/UserService.java
package project.service;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import project.entities.Role;
import project.entities.Student;
import project.entities.Teacher;
import project.entities.User;
import project.util.PasswordUtil;

import java.util.List;

@Stateless
public class UserService {

    @PersistenceContext
    private EntityManager em;

    // === РЕГИСТРАЦИЯ СТУДЕНТА (минимальная) ===
    public void registerStudent(String username, String password) {
        if (findByUsername(username) != null) {
            throw new RuntimeException("Username already taken");
        }
        String hash = PasswordUtil.hashPassword(password);
        Student student = new Student();
        student.setUsername(username);
        student.setPasswordHash(hash);
        student.setRole(Role.STUDENT);
        // остальные поля — null (заполнятся позже)
        em.persist(student);
    }

    // === РЕГИСТРАЦИЯ ПРЕПОДАВАТЕЛЯ (минимальная) ===
    public void registerTeacher(String username, String password) {
        if (findByUsername(username) != null) {
            throw new RuntimeException("Username already taken");
        }
        String hash = PasswordUtil.hashPassword(password);
        Teacher teacher = new Teacher();
        teacher.setUsername(username);
        teacher.setPasswordHash(hash);
        teacher.setRole(Role.TEACHER);
        // остальные поля — null
        em.persist(teacher);
    }

    // === ОБНОВЛЕНИЕ ПРОФИЛЯ СТУДЕНТА ===
    public void updateStudentProfile(String username, String firstName, String lastName,
                                     String middleName, Integer age, String subject) {
        Student student = (Student) findByUsername(username);
        if (student == null || student.getRole() != Role.STUDENT) {
            throw new RuntimeException("Student not found");
        }
        student.setFirstName(firstName);
        student.setLastName(lastName);
        student.setMiddleName(middleName);
        student.setAge(age);
        student.setSubject(subject);
        em.merge(student);
    }

    // === ОБНОВЛЕНИЕ ПРОФИЛЯ УЧИТЕЛЯ ===
    public void updateTeacherProfile(String username, String firstName, String lastName,
                                     String middleName, Integer age, String subject, String degree) {
        Teacher teacher = (Teacher) findByUsername(username);
        if (teacher == null || teacher.getRole() != Role.TEACHER) {
            throw new RuntimeException("Teacher not found");
        }
        teacher.setFirstName(firstName);
        teacher.setLastName(lastName);
        teacher.setMiddleName(middleName);
        teacher.setAge(age);
        teacher.setSubject(subject);
        teacher.setDegree(degree);
        em.merge(teacher);
    }

    // === НАЙТИ ПОЛЬЗОВАТЕЛЯ ПО ЛОГИНУ ===
    public User findByUsername(String username) {
        TypedQuery<User> query = em.createQuery(
                "SELECT u FROM User u WHERE u.username = :username", User.class);
        query.setParameter("username", username);
        List<User> results = query.getResultList();
        return results.isEmpty() ? null : results.get(0);
    }

    // === АВТОРИЗАЦИЯ + ОПРЕДЕЛЕНИЕ РОЛИ ===
    public String authenticate(String username, String password) {
        User user = findByUsername(username);
        if (user == null) return null;
        if (PasswordUtil.checkPassword(password, user.getPasswordHash())) {
            return user.getRole().name(); // "STUDENT" или "TEACHER"
        }
        return null;
    }
}