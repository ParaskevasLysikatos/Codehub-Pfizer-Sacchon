package gr.codehub.teamOne.resource.impl;

import gr.codehub.teamOne.Utilities.GeneralFunctions;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.repository.UserRepository;
import gr.codehub.teamOne.repository.util.JpaUtil;
import gr.codehub.teamOne.representation.UsersDTO;
import gr.codehub.teamOne.resource.interfaces.ProfileResource;
import gr.codehub.teamOne.resource.util.ResourceUtils;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import javax.persistence.EntityManager;

public class ProfileResourceImpl extends ServerResource implements ProfileResource {

    private EntityManager em;
    private UserRepository userRepository;

    @Override
    protected void doInit() throws ResourceException {
        try {
            em = JpaUtil.getEntityManager();
            userRepository = new UserRepository(em);
        } catch (Exception e) {
            throw new ResourceException(e);
        }
    }

    @Override
    protected void doRelease() throws ResourceException {
        em.close();
    }

    /**
     * Method to get Profile information for a user using email to identify user.
     *
     * @return Profile information .
     * @throws NotFoundException When there is no user with this email.
     */
    @Override
    public UsersDTO getProfileInfo() throws NotFoundException {

        ResourceUtils.checkRole(this, GeneralFunctions.rolesWithAccess(true, true, true));

        String usrEmail = this.getRequest().getClientInfo().getUser().getIdentifier();

        Users user = userRepository.getUserInfo(usrEmail);
        return UsersDTO.getUsersDTO(user);
    }

    /**
     * Method to Update  Profile information for a user using email to identify user.
     *
     * @param usersDTO Users Representation Object.
     * @return Profile information .
     * @throws NotFoundException When there is no user with this email.
     */
    @Override
    public UsersDTO updateProfileInfo(UsersDTO usersDTO) throws NotFoundException {

        String usrEmail = this.getRequest().getClientInfo().getUser().getIdentifier();

        Users user = userRepository.getUserInfo(usrEmail);
        userRepository.save(UsersDTO.updateUserDTO(user, usersDTO));
        return UsersDTO.getUsersDTO(user);
    }

    @Override
    public String deleteUser() {
        return null;
    }
}

