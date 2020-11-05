package gr.codehub.teamOne.resource.impl;

import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.representation.MeasurementDTO;
import gr.codehub.teamOne.representation.PatientDTO;
import gr.codehub.teamOne.resource.MeasurementsResource;
import org.restlet.resource.ServerResource;

public class MeasurementsResourceImpl extends ServerResource implements MeasurementsResource {

    @Override
    public MeasurementDTO getBasket() throws NotFoundException {
        return null;
    }

    @Override
    public void removeMeasurements() throws NotFoundException {
    }

    @Override
    public MeasurementDTO updateMeasurements(PatientDTO patientRepresentation) throws NotFoundException, BadEntityException {
        return null;
    }

    @Override
    public MeasurementDTO createMeasurements() throws NotFoundException, BadEntityException {
        return null;
    }

    @Override
    public MeasurementDTO assignPatient(MeasurementDTO measurementDTO) throws NotFoundException, BadEntityException {
        return null;
    }
}
