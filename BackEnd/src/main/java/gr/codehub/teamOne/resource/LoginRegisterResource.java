package gr.codehub.teamOne.resource;

import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.representation.LoginCredentialDTO;
import gr.codehub.teamOne.representation.UsersDTO;
import gr.codehub.teamOne.security.AccessRole;
import org.restlet.resource.Delete;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.Put;

import java.util.List;

public interface LoginRegisterResource {

    @Get("json")
    List<UsersDTO> getsUsers() throws NotFoundException;

    @Post("json")
    AccessRole verifyUser(LoginCredentialDTO loginCredentialDTO) throws NotFoundException, BadEntityException;

    @Put("json")
    UsersDTO addUser(UsersDTO usersDTO) throws NotFoundException, BadEntityException;

    @Delete
    void removeUser() throws NotFoundException;
}