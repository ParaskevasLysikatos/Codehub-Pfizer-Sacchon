package gr.codehub.teamOne.representation;

import gr.codehub.teamOne.security.AccessRole;
import lombok.Data;

@Data
public class UsersSpecificSearchDTO {
    private Long userID;
    private Integer amka;
    private AccessRole role;
}