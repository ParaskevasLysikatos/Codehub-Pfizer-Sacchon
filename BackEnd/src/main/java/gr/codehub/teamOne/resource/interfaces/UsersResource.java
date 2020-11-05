package gr.codehub.teamOne.resource.interfaces;

import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.exceptions.WrongUserRoleException;
import gr.codehub.teamOne.representation.UsersDTO;
import gr.codehub.teamOne.representation.UsersSearchDTO;
import gr.codehub.teamOne.representation.UsersSpecificSearchDTO;
import org.restlet.resource.Delete;
import org.restlet.resource.Post;

public interface UsersResource {

    @Post("json")
    public UsersDTO findUserByAmkaOrID(UsersSpecificSearchDTO usersSearchDTO) throws NotFoundException;

    @Delete
    String removeUser() throws NotFoundException, WrongUserRoleException;
}
