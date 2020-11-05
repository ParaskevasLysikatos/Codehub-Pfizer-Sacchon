package gr.codehub.teamOne.resource.interfaces;

import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.representation.AverageMeasurementsDTO;
import gr.codehub.teamOne.representation.MeasurementsSearchParamDTO;
import org.restlet.resource.Post;

public interface DataResource {

    @Post("json")
    AverageMeasurementsDTO getAvgData(MeasurementsSearchParamDTO measurementsSearchParamDTO) throws BadEntityException;
}
