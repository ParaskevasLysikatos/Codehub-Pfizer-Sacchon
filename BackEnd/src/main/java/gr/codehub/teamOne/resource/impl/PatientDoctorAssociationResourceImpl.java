package gr.codehub.teamOne.resource.impl;

import gr.codehub.teamOne.Utilities.GeneralFunctions;
import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.exceptions.WrongUserRoleException;
import gr.codehub.teamOne.model.PatientDoctorAssociation;
import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.repository.PatientDoctorAssociationRepository;
import gr.codehub.teamOne.repository.UserRepository;
import gr.codehub.teamOne.repository.util.JpaUtil;
import gr.codehub.teamOne.representation.PatientDTO;
import gr.codehub.teamOne.representation.PatientDoctorAssociationDTO;
import gr.codehub.teamOne.representation.UsersDTO;
import gr.codehub.teamOne.resource.interfaces.PatientDoctorAssociationResource;
import gr.codehub.teamOne.security.AccessRole;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class PatientDoctorAssociationResourceImpl extends ServerResource implements PatientDoctorAssociationResource {

    private UserRepository userRepository;
    private PatientDoctorAssociationRepository associationRepository;
    private EntityManager em;
    private Long categoryType;

    @Override
    protected void doInit() throws ResourceException {
        try{
            em = JpaUtil.getEntityManager();
            userRepository = new UserRepository(em);
            associationRepository = new PatientDoctorAssociationRepository(em);

            String tempCategory = getQueryValue("categoryType");
            categoryType = (tempCategory != null) ? Long.parseLong(getQueryValue("categoryType")) : null;
        }catch(Exception e){
            throw new ResourceException(e);
        }
    }

    @Override
    protected void doRelease() throws ResourceException {
        em.close();
    }

    /**
     * Base on categoryType (url attribute) user gives, it return a list with patient/doctors that is active
     *
     * null = patients with Doctor that call url
     * 1 = patients without Doctor
     * 2 = patients with Doctors
     * 3 = All patients that are also active
     *
     * @return List with association
     */
    @Override
    public List<UsersDTO> getAllAssociations() throws BadEntityException, NotFoundException {

        List<UsersDTO> tempListUsersDTO = new ArrayList<>();
        List<Users> tempListUsers;
        List<PatientDoctorAssociation> associationsList;

        if(categoryType == null){
            String usrEmail = this.getRequest().getClientInfo().getUser().getIdentifier();
            Optional<Users> doctor = userRepository.findByEmail(usrEmail);
            if(!doctor.isPresent()) throw new NotFoundException("Current doctor that called url, Not Found !");

            associationsList = GeneralFunctions.removeInactiveAssociations(associationRepository.getAssociationWitSpecificDoctor(doctor.get().getId()));
            tempListUsers = getOnDemandPatients(associationsList);
        } else if(categoryType == 2){
            associationsList = GeneralFunctions.removeInactiveAssociations(associationRepository.getPatientWithoutDoctor(true));
            tempListUsers = getOnDemandPatients(associationsList);
        } else if(categoryType == 1){
            associationsList = GeneralFunctions.removeInactiveAssociations(associationRepository.getPatientWithoutDoctor(false));
            tempListUsers = getOnDemandPatients(associationsList);
        } else if(categoryType == 3){
            associationsList = GeneralFunctions.removeInactiveAssociations(associationRepository.findAll());
            tempListUsers = getOnDemandPatients(associationsList);
        } else {
            throw new BadEntityException("Wrong categoryType url attribute");
        }

        tempListUsers.forEach(mObj -> tempListUsersDTO.add(UsersDTO.getUsersDTO(mObj)));
        return tempListUsersDTO;
    }

    private List<Users> getOnDemandPatients(List<PatientDoctorAssociation> associationsList){

        List<Users> tempListUsers = new ArrayList<>();
        if(associationsList.size() > 0){
            associationsList.forEach( obj -> {
                Optional<Users> tempUser = userRepository.findById(obj.getPatient().getId());
                tempListUsers.add(tempUser.get());
            });
        }
        return tempListUsers;
    }

    @Override
    public String addNewAssociation(PatientDoctorAssociationDTO newAssociationDTO) throws BadEntityException, WrongUserRoleException, NotFoundException {

        if (newAssociationDTO == null) throw new BadEntityException("Null userException error");

        //Take saved association(if exist)
        PatientDoctorAssociation mAssociation = PatientDoctorAssociationDTO.getAssociation(newAssociationDTO);

        Optional<Users> patient = userRepository.findById(newAssociationDTO.getPatient());
        if(!patient.isPresent()) throw new BadEntityException("There is no patient with that id");

        if(patient.get().getAccountType() != AccessRole.ROLE_PATIENT) throw new WrongUserRoleException("The user you add as patient, has wrong role");
        mAssociation.setPatient(patient.get());

        if(newAssociationDTO.getDoctor() != null ){

            Optional<Users> doctor = userRepository.findById(newAssociationDTO.getDoctor());
            if(!doctor.isPresent()) throw new BadEntityException("There is no doctor with that id");
            if(doctor.get().getAccountType() != AccessRole.ROLE_DOCTOR) throw new WrongUserRoleException("The user you add as doctor, has wrong role");
            mAssociation.setDoctor(doctor.get());
        }

        associationRepository.save(mAssociation);
        return "New association added";
    }

    @Override
    public String updateAssociation(PatientDoctorAssociationDTO newAssociationDTO) throws BadEntityException, WrongUserRoleException, NotFoundException {

        if (newAssociationDTO == null) throw new BadEntityException("Null userException error");

        //Take saved association(if exist)
        PatientDoctorAssociation mAssociation = associationRepository.getAssociationIfExist(newAssociationDTO.getPatient());

        if(mAssociation == null) throw new NotFoundException("There was no association with this patient");

        Optional<Users> patient = userRepository.findById(newAssociationDTO.getPatient());
        if(!patient.isPresent()) throw new BadEntityException("There is no patient with that id");
        if(!patient.get().isActive()) throw new BadEntityException("Patient id is inactive");

        if(patient.get().getAccountType() != AccessRole.ROLE_PATIENT) throw new WrongUserRoleException("The user you add as patient, has wrong role");
        mAssociation.setPatient(patient.get());

        if(newAssociationDTO.getDoctor() != null ){

            Optional<Users> doctor = userRepository.findById(newAssociationDTO.getDoctor());
            if(!doctor.isPresent()) throw new BadEntityException("There is no doctor with that id");
            if(doctor.get().getAccountType() != AccessRole.ROLE_DOCTOR) throw new WrongUserRoleException("The user you add as doctor, has wrong role");
            mAssociation.setDoctor(doctor.get());
        }
        mAssociation.setActive(true); // To be sure that association Stay active
        associationRepository.save(mAssociation);
        return "Association updated";
    }
}