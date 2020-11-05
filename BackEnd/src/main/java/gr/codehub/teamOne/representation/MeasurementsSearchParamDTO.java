package gr.codehub.teamOne.representation;

import lombok.Data;

import java.util.Date;

@Data
public class MeasurementsSearchParamDTO {

    private Integer amka;
    private Long userID;
    private Date startAt;
    private Date endAt;
}
