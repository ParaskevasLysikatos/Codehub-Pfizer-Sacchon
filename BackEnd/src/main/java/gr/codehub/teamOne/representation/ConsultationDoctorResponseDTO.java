package gr.codehub.teamOne.representation;

import lombok.Data;

import java.util.Date;

@Data
public class ConsultationDoctorResponseDTO {
    private String first_name;
    private String last_name;
    private String consultationMsg;
    private Date registeredDate;
}
