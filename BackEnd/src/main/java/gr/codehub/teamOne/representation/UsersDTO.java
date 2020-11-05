package gr.codehub.teamOne.representation;

import gr.codehub.teamOne.model.Enums.Gender;
import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.security.AccessRole;
import lombok.Data;

import java.util.Date;

@Data
public class UsersDTO {

    private Long id;
    private String first_name;
    private String last_name;
    private String email;
    private String password;
    private AccessRole accountType;

    //Social Security number(amka).
    private Integer amka;
    private String mobile_phone_number;
    private String phone_number;
    private String address;
    private Gender gender;
    private Date registration_date;



    /**
     *Mapper: Convert a Users Representation Object to Users Object.
     *
     * @param usersDTO User Representation object.
     * @return users Users object.
     */
    public static Users getUsers(UsersDTO usersDTO){

        Users users = new Users();
        users.setFirst_name(usersDTO.getFirst_name());
        users.setLast_name(usersDTO.getLast_name());
        users.setEmail(usersDTO.getEmail());
        users.setPassword(usersDTO.getPassword());
        users.setAccountType(usersDTO.getAccountType());
        users.setAmka(usersDTO.getAmka());
        users.setMobile_phone_number(usersDTO.getMobile_phone_number());
        users.setPhone_number(usersDTO.getPhone_number());
        users.setAddress(usersDTO.getAddress());
        users.setGender(usersDTO.getGender());
        users.setRegistration_date(new Date());

        return users;
    }
    /**
     *Mapper: Convert a User Object to User Representation Object .
     *
     * @param users Users object.
     * @return  Users Representation Object.
     */
    public static UsersDTO getUsersDTO(Users users){

        UsersDTO usersDTO = new UsersDTO();
        usersDTO.setId(users.getId());
        usersDTO.setAccountType(users.getAccountType());
        usersDTO.setFirst_name(users.getFirst_name());
        usersDTO.setLast_name(users.getLast_name());
        usersDTO.setEmail(users.getEmail());
        usersDTO.setPassword(users.getPassword());
        usersDTO.setAccountType(users.getAccountType());
        usersDTO.setAmka(users.getAmka());
        usersDTO.setMobile_phone_number(users.getMobile_phone_number());
        usersDTO.setPhone_number(users.getPhone_number());
        usersDTO.setAddress(users.getAddress());
        usersDTO.setGender(users.getGender());
        usersDTO.setRegistration_date(users.getRegistration_date());

        return usersDTO;
    }

    /**
     * Get an existing user and set on it the new values
     *
     * @param baseUser Existing user
     * @param updatesOfUsers User with changed values
     * @return The user with new values
     */
    public static Users updateUserDTO(Users baseUser, UsersDTO updatesOfUsers){

        if(updatesOfUsers.getFirst_name() != null){
            baseUser.setFirst_name(updatesOfUsers.getFirst_name());
        }
        if(updatesOfUsers.getLast_name() != null){
            baseUser.setLast_name(updatesOfUsers.getLast_name());
        }
        if(updatesOfUsers.getEmail() != null){
            baseUser.setEmail(updatesOfUsers.getEmail());
        }
        if(updatesOfUsers.getPassword() != null){
            baseUser.setPassword(updatesOfUsers.getPassword());
        }
        if(updatesOfUsers.getAccountType() != null){
            baseUser.setAccountType(updatesOfUsers.getAccountType());
        }
        if(updatesOfUsers.getAmka() != null){
            baseUser.setAmka(updatesOfUsers.getAmka());
        }
        if(updatesOfUsers.getMobile_phone_number() != null){
            baseUser.setMobile_phone_number(updatesOfUsers.getMobile_phone_number());
        }
        if(updatesOfUsers.getPhone_number() != null){
            baseUser.setPhone_number(updatesOfUsers.getPhone_number());
        }
        if(updatesOfUsers.getAddress() != null){
            baseUser.setAddress(updatesOfUsers.getAddress());
        }
        if(updatesOfUsers.getGender() != null){
            baseUser.setGender(updatesOfUsers.getGender());
        }

        return baseUser;
    }
}