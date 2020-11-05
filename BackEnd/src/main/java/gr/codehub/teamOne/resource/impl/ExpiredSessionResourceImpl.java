package gr.codehub.teamOne.resource.impl;

import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.repository.UserRepository;
import gr.codehub.teamOne.repository.util.JpaUtil;
import gr.codehub.teamOne.representation.ExpiredSessionDTO;
import gr.codehub.teamOne.resource.interfaces.ExpiredSessionResource;
import gr.codehub.teamOne.security.AccessRole;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

public class ExpiredSessionResourceImpl extends ServerResource implements ExpiredSessionResource {

    private EntityManager em;
    private UserRepository userRepository;
    private boolean needDoctors;

    @Override
    protected void doInit() throws ResourceException {

        try{

            em = JpaUtil.getEntityManager();
            userRepository = new UserRepository(em);
            needDoctors = Boolean.parseBoolean(getQueryValue("needDoctors"));

        }catch(Exception e){
            throw new ResourceException(e);
        }
    }

    @Override
    protected void doRelease() throws ResourceException {
        em.close();
    }

    @Override
    public List<ExpiredSessionDTO> getExpiredDoctors() {

        List<ExpiredSessionDTO> listWithExpiredDocs = new ArrayList<>();
        List<Users> expiredDoctors;
        if(needDoctors){
            expiredDoctors = userRepository.getExpiredDoctors(AccessRole.ROLE_DOCTOR);
        } else {
            expiredDoctors = userRepository.getExpiredDoctors(AccessRole.ROLE_PATIENT);
        }

        if (expiredDoctors.size() > 0){

            expiredDoctors.forEach( doctor -> listWithExpiredDocs.add(ExpiredSessionDTO.getExpiredAccounts(doctor)));
            return listWithExpiredDocs;
        }
        return null;
    }
}
