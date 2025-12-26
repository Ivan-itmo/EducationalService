// src/main/java/project/service/UserService.java
package project.service;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import project.entities.User;
import project.util.PasswordUtil;

import java.util.List;

@Stateless
public class UserService {

    @PersistenceContext
    private EntityManager em;

    public User register(String username, String password) {
        if (findByUsername(username) != null) {
            throw new RuntimeException("User already exists");
        }
        String hash = PasswordUtil.hashPassword(password);
        User user = new User(username, hash);
        em.persist(user);
        return user;
    }

    public User findByUsername(String username) {
        TypedQuery<User> query = em.createQuery(
                "SELECT u FROM User u WHERE u.username = :username", User.class);
        query.setParameter("username", username);
        List<User> results = query.getResultList();
        return results.isEmpty() ? null : results.get(0);
    }

    public boolean validateCredentials(String username, String password) {
        User user = findByUsername(username);
        if (user == null) return false;
        return PasswordUtil.checkPassword(password, user.getPasswordHash());
    }
}