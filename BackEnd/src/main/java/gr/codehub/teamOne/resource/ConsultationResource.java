package gr.codehub.teamOne.resource;

import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.model.Consultation;
import gr.codehub.teamOne.representation.ConsultationDTO;
import org.restlet.resource.Get;
import org.restlet.resource.Post;

import java.util.List;

public interface ConsultationResource {

    @Get("json")
    List<Consultation> getConsultation();

    @Post("json")
    ConsultationDTO addConsultation(ConsultationDTO consultationDTO) throws BadEntityException;
}
