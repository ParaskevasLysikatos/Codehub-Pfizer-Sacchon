package gr.codehub.teamOne.representation;

import gr.codehub.teamOne.security.AccessRole;
import lombok.Data;

@Data
public class UsersSearchDTO {
    private Integer amka;
    private AccessRole role;

    public static UsersSearchDTO getUsersSearchDTO(UsersDTO usersDTO){
        UsersSearchDTO searchDTO = new UsersSearchDTO();
        searchDTO.setAmka(usersDTO.getAmka());
        searchDTO.setRole(usersDTO.getAccountType());
        return  searchDTO;
    }
}
