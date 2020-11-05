package gr.codehub.teamOne.representation;

import gr.codehub.teamOne.model.Users;
import lombok.Data;

import java.util.Date;

@Data
public class ExpiredSessionDTO {

    private long doctorID;
    private Integer amka;
    private Date lastLogin;


    public static ExpiredSessionDTO getExpiredAccounts(Users users){

        ExpiredSessionDTO expiredSessionDTO = new ExpiredSessionDTO();
        expiredSessionDTO.setDoctorID(users.getId());
        expiredSessionDTO.setLastLogin(users.getLastLogin());
        expiredSessionDTO.setAmka(users.getAmka());

        return expiredSessionDTO;
    }
}
