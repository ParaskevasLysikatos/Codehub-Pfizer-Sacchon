package gr.codehub.teamOne.resource.interfaces;

import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.representation.MeasurementDTO;
import gr.codehub.teamOne.representation.MeasurementsSearchParamDTO;
import org.restlet.resource.*;

import java.util.List;

public interface MeasurementResource {

    @Get("json")
    MeasurementDTO getSpecificMeasurement() throws BadEntityException, NotFoundException;

    @Delete
    String deleteMeasurement() throws NotFoundException, BadEntityException;

    @Put("json")
    MeasurementDTO updateMeasurement(MeasurementDTO measurementDTO)
            throws NotFoundException, BadEntityException;

    @Post("json")
    String addMeasurement(MeasurementDTO measurementDTO)
            throws NotFoundException, BadEntityException;

    @Patch("json")
    List<MeasurementDTO> getAllMeasurementsBasedOn(MeasurementsSearchParamDTO paramDTO) throws NotFoundException, BadEntityException;
}

