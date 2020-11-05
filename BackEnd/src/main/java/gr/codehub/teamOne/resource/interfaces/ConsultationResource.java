package gr.codehub.teamOne.resource.interfaces;

import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.representation.ConsultationDTO;
import gr.codehub.teamOne.representation.ConsultationDoctorResponseDTO;
import gr.codehub.teamOne.representation.ConsultationSpecificDoctorDTO;
import org.restlet.resource.*;

import java.util.List;

public interface ConsultationResource {

    @Get("json")
    List<ConsultationDTO> getConsultation() throws BadEntityException, NotFoundException;

    @Post("json")
    String addConsultation(ConsultationDTO consultationDTO) throws BadEntityException;

    @Put("json")
    String updateConsultation(ConsultationDTO consultationDTO) throws BadEntityException;

    @Delete("json")
    String deleteConsultation() throws BadEntityException;

    @Patch("json")
    List<ConsultationDoctorResponseDTO> getConsultationForDoctor(ConsultationSpecificDoctorDTO specificDoctorDTO);
}
