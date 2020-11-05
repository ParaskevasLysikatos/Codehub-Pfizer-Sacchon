package gr.codehub.teamOne.resource.interfaces;

import gr.codehub.teamOne.representation.ExpiredSessionDTO;
import org.restlet.resource.Get;

import java.util.List;

public interface ExpiredSessionResource {

    @Get("json")
    List<ExpiredSessionDTO> getExpiredDoctors();
}
