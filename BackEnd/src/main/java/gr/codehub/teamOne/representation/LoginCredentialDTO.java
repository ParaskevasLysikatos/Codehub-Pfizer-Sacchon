package gr.codehub.teamOne.representation;

import gr.codehub.teamOne.security.AccessRole;
import lombok.Data;

@Data
public class LoginCredentialDTO {

    private String userEmail;
    private String userPassword;
    private AccessRole userRole;
}
