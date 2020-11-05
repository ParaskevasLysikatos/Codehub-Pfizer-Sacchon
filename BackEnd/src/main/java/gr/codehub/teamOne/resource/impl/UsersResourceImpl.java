package gr.codehub.teamOne.resource.impl;

import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.exceptions.WrongUserRoleException;
import gr.codehub.teamOne.model.PatientDoctorAssociation;
import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.repository.PatientDoctorAssociationRepository;
import gr.codehub.teamOne.repository.UserRepository;
import gr.codehub.teamOne.repository.util.JpaUtil;
import gr.codehub.teamOne.representation.UsersDTO;
import gr.codehub.teamOne.representation.UsersSearchDTO;
import gr.codehub.teamOne.representation.UsersSpecificSearchDTO;
import gr.codehub.teamOne.resource.interfaces.UsersResource;
import gr.codehub.teamOne.security.AccessRole;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

public class UsersResourceImpl extends ServerResource implements UsersResource {

    private UserRepository userRepository;
    private PatientDoctorAssociationRepository patientDoctorAssociationRepository;
    private EntityManager em;

    @Override
    protected void doInit() throws ResourceException {

        try {
            em = JpaUtil.getEntityManager();
            userRepository = new UserRepository(em);
            patientDoctorAssociationRepository = new PatientDoctorAssociationRepository(em);
        } catch (Exception e) {
            throw new ResourceException(e);
        }
    }

    @Override
    protected void doRelease() throws ResourceException {
        em.close();
    }

    /**
     * Method to search user in base, based on Social Security number(amka).
     * @param usersSearchDTO Object with Social Security number(amka).
     * @return the user with the Social Security number(amka).
     * @throws NotFoundException When there is no user with this Social Security number(amka)
     */
    @Override
    public UsersDTO findUserByAmkaOrID(UsersSpecificSearchDTO usersSearchDTO) throws NotFoundException {

        Users person;

        if(usersSearchDTO.getUserID() != null){
            Optional<Users> tempPerson = userRepository.findById(usersSearchDTO.getUserID());
            if(!tempPerson.isPresent()) throw new NotFoundException("No user with this userID");
            person = tempPerson.get();
        } else {
            UsersSearchDTO mUserSearchDTO = new UsersSearchDTO();
            mUserSearchDTO.setRole(usersSearchDTO.getRole());
            mUserSearchDTO.setAmka(usersSearchDTO.getAmka());
            person = userRepository.findByAmka(mUserSearchDTO);

        }

        if (person == null) throw new NotFoundException("There is no user with this amka");
        return UsersDTO.getUsersDTO(person);
    }

    @Override
    public String removeUser() throws NotFoundException, WrongUserRoleException {

        String usrEmail = this.getRequest().getClientInfo().getUser().getIdentifier();

        Optional<Users> userToDelete = userRepository.findByEmail(usrEmail);
        if(!userToDelete.isPresent()) throw new NotFoundException("User is not valid");
        if(userToDelete.get().getAccountType() == AccessRole.ROLE_ADMIN) throw new WrongUserRoleException("You are using an admin account");

        userToDelete.get().setActive(false);
        userRepository.save(userToDelete.get());

        if(userToDelete.get().getAccountType() == AccessRole.ROLE_PATIENT){

            PatientDoctorAssociation demandedAssociation = patientDoctorAssociationRepository.disableAssociationForPatient(userToDelete.get().getId());
            if(demandedAssociation == null) throw new NotFoundException("Not found association with this patient");
            demandedAssociation.setDoctor(null);
            demandedAssociation.setActive(false);
            patientDoctorAssociationRepository.save(demandedAssociation);

        } else { // If it is doctor

            List<PatientDoctorAssociation> demandedAssociationList = patientDoctorAssociationRepository.getAssociationWitSpecificDoctor(userToDelete.get().getId());

            //Make Doctor null in all associations that he take apart
            if(demandedAssociationList.size() > 0){
                demandedAssociationList.forEach( obj -> {
                    obj.setDoctor(null);
                    patientDoctorAssociationRepository.save(obj);
                });
            }
        }
        return "Account become inactive";
    }
}
