package gr.codehub.teamOne.resource.interfaces;

import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.representation.PendingDocDTO;
import gr.codehub.teamOne.representation.UsersDTO;
import org.restlet.resource.Get;
import org.restlet.resource.Post;

import java.util.List;

public interface PendingDocResource {

    @Get("json")
    List<UsersDTO> getAllPendingDoctors();

    @Post("json")
    String approveDoctorAccount(PendingDocDTO pendingDocDTO) throws BadEntityException, NotFoundException;
}
