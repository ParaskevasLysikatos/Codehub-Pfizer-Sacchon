package gr.codehub.teamOne.representation;

import gr.codehub.teamOne.model.PatientDoctorAssociation;
import lombok.Data;

import java.util.Date;

@Data
public class PatientDoctorAssociationDTO {

    private long patient;
    private Long doctor;
    private Boolean isActive;

    public static PatientDoctorAssociation getAssociation(PatientDoctorAssociationDTO mAssociationDTO){

        PatientDoctorAssociation mAssociation = new PatientDoctorAssociation();
        mAssociation.setDoctor(mAssociation.getDoctor());
        mAssociation.setPatient(mAssociation.getPatient());
        mAssociation.setActive(true);
        return mAssociation;
    }

    public static PatientDoctorAssociationDTO getAssociation(PatientDoctorAssociation mAssociation){

        PatientDoctorAssociationDTO mAssociationDTO = new PatientDoctorAssociationDTO();
        mAssociationDTO.setPatient(mAssociation.getPatient().getId());


        if (mAssociation.getDoctor() != null){
            mAssociationDTO.setDoctor(mAssociation.getDoctor().getId());
        }
        return mAssociationDTO;
    }
}
