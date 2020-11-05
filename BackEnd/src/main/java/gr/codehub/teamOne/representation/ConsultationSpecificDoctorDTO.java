package gr.codehub.teamOne.representation;

import lombok.Data;

import java.util.Date;

@Data
public class ConsultationSpecificDoctorDTO {
    private Long userID;
    private Integer amka;
    private Date startAt;
    private Date endAt;
}
