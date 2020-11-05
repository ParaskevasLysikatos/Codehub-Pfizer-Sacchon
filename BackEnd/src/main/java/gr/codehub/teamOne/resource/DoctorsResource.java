package gr.codehub.teamOne.resource;


import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.representation.DoctorsDTO;

import org.restlet.resource.Get;

import java.util.List;

public interface DoctorsResource {

    @Get("json")
    public List<DoctorsDTO> getsDoctors() throws NotFoundException;
}