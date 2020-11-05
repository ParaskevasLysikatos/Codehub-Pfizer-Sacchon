package gr.codehub.teamOne.resource;
import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.model.Measurement;
import gr.codehub.teamOne.representation.MeasurementDTO;
import gr.codehub.teamOne.representation.MeasurementsSearchParamDTO;
import gr.codehub.teamOne.representation.PatientDTO;
import org.restlet.resource.Get;
import org.restlet.resource.Post;

import java.util.List;

public interface PatientResource {

    @Get("json")
    List<PatientDTO> getsPatients() throws NotFoundException;

    @Post("json")
    List<MeasurementDTO> getMeasurement(MeasurementsSearchParamDTO paramDTO) throws NotFoundException, BadEntityException;
}
