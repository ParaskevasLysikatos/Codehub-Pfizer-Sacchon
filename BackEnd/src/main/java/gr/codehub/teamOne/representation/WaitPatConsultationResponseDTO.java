package gr.codehub.teamOne.representation;

import lombok.Data;

@Data
public class WaitPatConsultationResponseDTO {

    private Long patientsId;
    private Long daysFromLastConsultation;
    private String first_name;
    private String last_name;
}
