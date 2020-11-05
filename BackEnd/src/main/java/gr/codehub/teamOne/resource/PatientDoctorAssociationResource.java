package gr.codehub.teamOne.resource;

import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.exceptions.WrongUserRoleException;
import gr.codehub.teamOne.representation.PatientDoctorAssociationDTO;
import org.restlet.resource.Get;
import org.restlet.resource.Post;

import java.util.List;

public interface PatientDoctorAssociationResource {

    @Get("json")
    List<PatientDoctorAssociationDTO> getAllAssociations() throws BadEntityException;

    @Post("json")
    PatientDoctorAssociationDTO addNewAssociation(PatientDoctorAssociationDTO newAssociationDTO) throws BadEntityException, WrongUserRoleException;
}
