package gr.codehub.teamOne.representation;

import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.security.AccessRole;
import lombok.Data;

@Data
public class DoctorsDTO {

    private String first_name;
    private String last_name;
    private String email;
    private String password;
    private Integer amka;
    private String mobile_phone_number;
    private String phone_number;
    private String address;
    private AccessRole accountType;

    /**
     *Mapper: Convert a Doctor Representation Object to Users Object.
     *
     * @param doctorsDTO Patient Representation object.
     * @return doctor Users object.
     */
    public static Users getDoctor(DoctorsDTO doctorsDTO){

        Users doctor=new Users();
        doctor.setFirst_name(doctorsDTO.getFirst_name());
        doctor.setLast_name(doctorsDTO.getLast_name());
        doctor.setEmail(doctorsDTO.getEmail());
        doctor.setPassword(doctorsDTO.getPassword());
        doctor.setAccountType(doctorsDTO.getAccountType());
        doctor.setAmka(doctorsDTO.getAmka());
        doctor.setMobile_phone_number(doctorsDTO.getMobile_phone_number());
        doctor.setPhone_number(doctorsDTO.getPhone_number());
        doctor.setAddress(doctorsDTO.getAddress());

        return doctor;
    }
    /**
     *Mapper: Convert a User Object (doctor) to Doctors Representation Object .
     *
     * @param doctor Users object.
     * @return doctorsDTO Doctors Representation Object.
     */
    public static DoctorsDTO getDoctorDTO(Users doctor) {

        DoctorsDTO doctorsDTO =new DoctorsDTO();
        doctorsDTO.setFirst_name(doctor.getFirst_name());
        doctorsDTO.setLast_name(doctor.getLast_name());
        doctorsDTO.setEmail(doctor.getEmail());
        doctorsDTO.setPassword(doctor.getPassword());
        doctorsDTO.setAccountType(doctor.getAccountType());
        doctorsDTO.setAmka(doctor.getAmka());
        doctorsDTO.setMobile_phone_number(doctor.getMobile_phone_number());
        doctorsDTO.setPhone_number(doctor.getPhone_number());
        doctorsDTO.setAddress(doctor.getAddress());

        return doctorsDTO;
    }
}
