package beans;

import entities.User;
import jakarta.ejb.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import java.util.List;

@Stateless
public class LoginBean {
    @PersistenceContext
    private EntityManager em;

    public User login(String username, String password) {
        if (username == null || password == null) {
            return null;
        }
        try{
            TypedQuery<User> query = em.createQuery("SELECT u FROM User AS u WHERE u.username = :username", User.class);
            query.setParameter("username", username);
            List<User> users = query.getResultList();
            if (users.isEmpty()) {
                return null;
            }
            User user = users.get(0);
            if (user.getPassword().equals(password)) {
                return user;
            }
            return null;
        }
        catch (Exception e){
            return null;
        }
    }

}
