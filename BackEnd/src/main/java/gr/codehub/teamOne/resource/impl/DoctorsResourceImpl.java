package gr.codehub.teamOne.resource.impl;

import gr.codehub.teamOne.Utilities.GeneralFunctions;
import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.repository.UserRepository;
import gr.codehub.teamOne.repository.util.JpaUtil;
import gr.codehub.teamOne.representation.DoctorsDTO;
import gr.codehub.teamOne.resource.interfaces.DoctorsResource;
import gr.codehub.teamOne.resource.util.ResourceUtils;
import gr.codehub.teamOne.security.AccessRole;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

public class DoctorsResourceImpl extends ServerResource implements DoctorsResource {

    private UserRepository userRepository;
    private EntityManager em;

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
     * Method to get all the doctors from base
     *
     * @return Doctors Representation List of objects
     */
    @Override
    public List<DoctorsDTO> getsDoctors() throws NotFoundException {

        ResourceUtils.checkRole(this, GeneralFunctions.rolesWithAccess(false, true, true));
        List<Users> doctorList = GeneralFunctions.removeInactiveUsers(userRepository.getAllUsersBasedOnRole(AccessRole.ROLE_DOCTOR));

        List<DoctorsDTO> doctorsDTOList = new ArrayList<>();
        doctorList.forEach(doctors -> doctorsDTOList.add(DoctorsDTO.getDoctorDTO(doctors)));

        return doctorsDTOList;
}







}
