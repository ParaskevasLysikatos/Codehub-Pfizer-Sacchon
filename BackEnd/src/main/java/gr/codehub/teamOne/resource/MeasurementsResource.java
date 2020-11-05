package gr.codehub.teamOne.resource;

import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.representation.MeasurementDTO;
import gr.codehub.teamOne.representation.PatientDTO;
import org.restlet.resource.*;

public interface MeasurementsResource {

    @Get("json")
    public MeasurementDTO getBasket() throws NotFoundException;

    @Delete
    public void removeMeasurements() throws NotFoundException;

    @Put("json")
    public MeasurementDTO updateMeasurements(PatientDTO patientRepresentation)
            throws NotFoundException, BadEntityException;

    @Post("json")
    public MeasurementDTO createMeasurements()
            throws NotFoundException, BadEntityException;

    @Patch("json")
    public MeasurementDTO assignPatient(MeasurementDTO measurementDTO)
            throws NotFoundException, BadEntityException;
}


