package gr.codehub.teamOne.repository;

import gr.codehub.teamOne.model.PatientDoctorAssociation;
import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.repository.lib.Repository;

import javax.persistence.EntityManager;
import java.util.List;

public class PatientDoctorAssociationRepository extends Repository<PatientDoctorAssociation, Long> {

    private EntityManager entityManager;

    public PatientDoctorAssociationRepository(EntityManager entityManager) {
        super(entityManager);
        this.entityManager = entityManager;
    }

    @Override
    public Class<PatientDoctorAssociation> getEntityClass() {
        return PatientDoctorAssociation.class;
    }

    @Override
    public String getEntityClassName() {
        return PatientDoctorAssociation.class.getName();
    }

    public PatientDoctorAssociation getAssociationIfExist(long patientID) {

        List associationList = entityManager.createQuery("from PatientDoctorAssociation where patient_id = :patientID")
                .setParameter("patientID", patientID)
                .getResultList();

        if (associationList.size() != 0){
            return (PatientDoctorAssociation) associationList.get(0);
        }
        return null;
    }

    public List getPatientWithoutDoctor(boolean withDoctor) {

        return entityManager.createQuery("from PatientDoctorAssociation where doctor_id " + (!withDoctor ?"!= NULL" : "= NULL"))
                .getResultList();
    }

    public PatientDoctorAssociation disableAssociationForPatient(Long patientID){

        List tempListWithAssociations = entityManager.createQuery("from PatientDoctorAssociation where patient_id = :patientID")
                .setParameter("patientID", patientID)
                .getResultList();

        if (tempListWithAssociations.size() > 0){
            return (PatientDoctorAssociation) tempListWithAssociations.get(0);
        }
        return null;
    }

    public List getAssociationWitSpecificDoctor(Long doctorID){

        return entityManager.createQuery("from PatientDoctorAssociation where doctor_id = :doctorID")
                .setParameter("doctorID", doctorID)
                .getResultList();
    }

    public List getIdsOfPatients(){
        return entityManager.createQuery("select patient.id from PatientDoctorAssociation")
                .getResultList();
    }
}
