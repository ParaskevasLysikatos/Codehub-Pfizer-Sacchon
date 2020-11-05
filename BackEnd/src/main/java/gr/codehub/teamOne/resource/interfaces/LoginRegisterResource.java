package gr.codehub.teamOne.resource.interfaces;

import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.exceptions.WrongUserRoleException;
import gr.codehub.teamOne.representation.LoginCredentialDTO;
import gr.codehub.teamOne.representation.LoginInfoDTO;
import gr.codehub.teamOne.representation.UsersDTO;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.Put;

import java.util.List;

public interface LoginRegisterResource {

    @Get("json")
    List<UsersDTO> getsUsers() throws NotFoundException;

    @Post("json")
    LoginInfoDTO loginUser(LoginCredentialDTO loginCredentialDTO) throws NotFoundException, BadEntityException, WrongUserRoleException;

    @Put("json")
    UsersDTO registerUser(UsersDTO usersDTO) throws NotFoundException, BadEntityException;
}