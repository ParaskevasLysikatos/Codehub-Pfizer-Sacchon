package gr.codehub.teamOne.resource.impl;

import gr.codehub.teamOne.Utilities.GeneralFunctions;
import gr.codehub.teamOne.exceptions.BadEntityException;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.exceptions.WrongUserRoleException;
import gr.codehub.teamOne.model.Consultation;
import gr.codehub.teamOne.model.PatientDoctorAssociation;
import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.repository.ConsultationRepository;
import gr.codehub.teamOne.repository.PatientDoctorAssociationRepository;
import gr.codehub.teamOne.repository.UserRepository;
import gr.codehub.teamOne.repository.util.JpaUtil;
import gr.codehub.teamOne.representation.LoginCredentialDTO;
import gr.codehub.teamOne.representation.LoginInfoDTO;
import gr.codehub.teamOne.representation.UsersDTO;
import gr.codehub.teamOne.representation.UsersSearchDTO;
import gr.codehub.teamOne.resource.interfaces.LoginRegisterResource;
import gr.codehub.teamOne.security.AccessRole;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class LoginRegisterResourceImpl extends ServerResource implements LoginRegisterResource {

    private UserRepository userRepository;
    private PatientDoctorAssociationRepository associationRepository;
    private ConsultationRepository consultationRepository;
    private EntityManager em;

    @Override
    protected void doInit() throws ResourceException {

        try {
            em = JpaUtil.getEntityManager();
            userRepository = new UserRepository(em);
            associationRepository = new PatientDoctorAssociationRepository(em);
            consultationRepository = new ConsultationRepository(em);
        } catch (Exception e) {
            throw new ResourceException(e);
        }
    }

    @Override
    protected void doRelease() throws ResourceException {
        em.close();
    }

    /**
     * Method to get all the users from base
     *
     * @return Users Representation List of objects
     */
    @Override
    public List<UsersDTO> getsUsers() throws NotFoundException {

        List<Users> usersList = GeneralFunctions.removeInactiveUsers(userRepository.findAll());

        List<UsersDTO> usersDTOList = new ArrayList<>();

        usersList.forEach(users -> usersDTOList.add(UsersDTO.getUsersDTO(users)));

        return usersDTOList;
    }

    /**
     * Method to validate user existence in base
     *
     * @param loginCredentialDTO Object with login credentials for login
     * @return AccessRole to notify frontEnd about type of account
     * @throws NotFoundException  When there is no user with this credentials
     * @throws BadEntityException When input is null
     */
    @Override
    public LoginInfoDTO loginUser(LoginCredentialDTO loginCredentialDTO) throws NotFoundException, BadEntityException, WrongUserRoleException {

        if (loginCredentialDTO == null) throw new BadEntityException("Null userException error");

        List<Users> listWithUsers = userRepository.findUserWithCredential(loginCredentialDTO);
        listWithUsers = GeneralFunctions.removeInactiveUsers(listWithUsers);
        if (listWithUsers.size() == 0) throw new NotFoundException("User account not found !");

        //Update the lastLogin to keep last entry of user
        Users userToLogin = listWithUsers.get(0);

        //To check if account is doctor under pending state
        if(userToLogin.getAccountType() == AccessRole.ROLE_PENDING) throw new WrongUserRoleException("The account is doctor account under pending state");
        userToLogin.setLastLogin(new Date());
        userRepository.save(userToLogin);

        LoginInfoDTO loginInfoDTO = new LoginInfoDTO();
        loginInfoDTO.setRole(userToLogin.getAccountType());

        int numOfUnreadConsultations = 0;
        List<Consultation> rowsWithUnreadConsultation = consultationRepository.calculateUnreadConsultations(userToLogin);

        if(rowsWithUnreadConsultation != null){
            numOfUnreadConsultations = rowsWithUnreadConsultation.size();
        }
        if(numOfUnreadConsultations > 0){
            rowsWithUnreadConsultation.forEach( msg -> {
                msg.setRead(true);
                consultationRepository.save(msg);
            });
        }
        loginInfoDTO.setUnreadConsultations(numOfUnreadConsultations);
        return loginInfoDTO;
    }

    /**
     * Method to add account to base
     *
     * @param usersDTO Representation object to save it on base
     * @return Representation object that save in base
     * @throws BadEntityException For wrong object as input
     */
    @Override
    public UsersDTO registerUser(UsersDTO usersDTO) throws BadEntityException {

        boolean isInactiveAccount = false;
        if (usersDTO == null) throw new BadEntityException("Null userException error");

        Users oldAccount = userRepository.findByAmka(UsersSearchDTO.getUsersSearchDTO(usersDTO));

        Users users;

        //Check if account exist and its inactive
        if (oldAccount != null && !oldAccount.isActive()) {
            users = UsersDTO.updateUserDTO(oldAccount, usersDTO);
            isInactiveAccount = true;
        } else {

            if (userRepository.checkIfAccountExist(usersDTO))
                throw new BadEntityException("Found entry with the same AMKA or email");
            users = UsersDTO.getUsers(usersDTO);
        }
        users.setActive(true);

        //Check if try to add to create doctor account and change it as pending role
        if(users.getAccountType() == AccessRole.ROLE_DOCTOR){
            users.setAccountType(AccessRole.ROLE_PENDING);
        }
        userRepository.save(users);

        //To add entry on association
        if (users.getAccountType() == AccessRole.ROLE_PATIENT) {
            createNewEntryOnAssociationForPatient(users, isInactiveAccount);
        }
        return UsersDTO.getUsersDTO(users);
    }

    /**
     * Function that create a new empty association with the patient that we create and null on doctor id to assign later
     *
     * @param newPatient To get patientID for the new association
     */
    private void createNewEntryOnAssociationForPatient(Users newPatient, boolean alreadyExist) {

        PatientDoctorAssociation mAssociation;

        if (alreadyExist) {
            mAssociation = associationRepository.getAssociationIfExist(newPatient.getId());
        } else {
            mAssociation = new PatientDoctorAssociation();
        }

        mAssociation.setPatient(newPatient);
        mAssociation.setDoctor(null);
        mAssociation.setActive(true);

        associationRepository.save(mAssociation);
    }
}
