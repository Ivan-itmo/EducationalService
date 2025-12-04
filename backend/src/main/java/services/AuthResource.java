package services;

import beans.LoginBean;
import entities.User;
import jakarta.ejb.EJB;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.Map;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {
    @EJB
    private LoginBean loginBean;
    private static class AuthRequest{
        public String login;
        public String password;
    }


    @POST
    @Path("/login")
    public Response login(AuthRequest authRequest) {
        if (authRequest.login == null || authRequest.password == null) {
            return Response.status(400).entity(Map.of("error", "Login and password are required")).build();
        }

        User user = loginBean.login(authRequest.login, authRequest.password);
        if (user == null) {
            return Response.status(401).entity(Map.of("error", "Invalid login or password")).build();
        }
        return Response.status(200).entity(Map.of("status", "success")).build();


    }
}