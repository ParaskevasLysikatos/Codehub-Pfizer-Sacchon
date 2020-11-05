package gr.codehub.teamOne.representation;

import gr.codehub.teamOne.security.AccessRole;
import lombok.Data;

@Data
public class LoginInfoDTO {

    private AccessRole role;
    private int unreadConsultations;
}
