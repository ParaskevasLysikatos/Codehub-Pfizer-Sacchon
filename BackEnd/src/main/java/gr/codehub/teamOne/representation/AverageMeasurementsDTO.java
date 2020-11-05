package gr.codehub.teamOne.representation;

import lombok.Data;

@Data
public class AverageMeasurementsDTO {
    private Double avgCarbIntake;
    private Double avgBloodGlucoseLevel;
    private Long numberOfResults;
}
