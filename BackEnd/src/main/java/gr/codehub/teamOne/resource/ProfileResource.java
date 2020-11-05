package gr.codehub.teamOne.resource;

import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.representation.UsersDTO;
import org.restlet.resource.Get;
import org.restlet.resource.Put;

public interface ProfileResource {

    @Get("json")
    UsersDTO getProfileInfo() throws NotFoundException;

    @Put("json")
    UsersDTO updateProfileInfo(UsersDTO userDTO) throws  NotFoundException;
}
