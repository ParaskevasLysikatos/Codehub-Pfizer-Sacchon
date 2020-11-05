package gr.codehub.teamOne.representation;

import gr.codehub.teamOne.model.Enums.Gender;
import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.security.AccessRole;
import lombok.Data;

import java.util.Date;

@Data
public class PatientDTO {

    private String first_name;
    private String last_name;
    private String email;
    private String password;
    private Integer amka;
    private String mobile_phone_number;
    private String phone_number;
    private String address;
    private Gender gender;
    private Date registration_date;
    private AccessRole accountType;

    /**
     *Mapper: Convert a Patient Representation Object to Users Object.
     *
     * @param patientDTO Patient Representation object.
     * @return patient Users object.
     */
    public static Users getPatient(PatientDTO patientDTO) {

        Users patient = new Users();
        patient.setFirst_name(patientDTO.getFirst_name());
        patient.setLast_name(patientDTO.getLast_name());
        patient.setEmail(patientDTO.getEmail());
        patient.setPassword(patientDTO.getPassword());
        patient.setAccountType(patientDTO.getAccountType());
        patient.setAmka(patientDTO.getAmka());
        patient.setMobile_phone_number(patientDTO.getMobile_phone_number());
        patient.setPhone_number(patientDTO.getPhone_number());
        patient.setAddress(patientDTO.getAddress());
        patient.setGender(patientDTO.getGender());
        patient.setRegistration_date(new Date());

        return patient;
    }
    /**
     *Mapper: Convert a User Object (patient) to Patient Representation Object .
     *
     * @param patient Users object.
     * @return  Patient Representation Object.
     */
    public static PatientDTO getPatientDTO(Users patient) {

        PatientDTO patientDTO = new PatientDTO();
        patientDTO.setAccountType(patient.getAccountType());
        patientDTO.setFirst_name(patient.getFirst_name());
        patientDTO.setLast_name(patient.getLast_name());
        patientDTO.setEmail(patient.getEmail());
        patientDTO.setPassword(patient.getPassword());
        patientDTO.setAmka(patient.getAmka());
        patientDTO.setMobile_phone_number(patient.getMobile_phone_number());
        patientDTO.setPhone_number(patient.getPhone_number());
        patientDTO.setAddress(patient.getAddress());
        patientDTO.setGender(patient.getGender());
        patientDTO.setRegistration_date(patient.getRegistration_date());

        return patientDTO;
    }
}