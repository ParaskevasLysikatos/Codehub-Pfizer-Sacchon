package gr.codehub.teamOne.resource.impl;

import gr.codehub.teamOne.exceptions.NotFoundException;
import gr.codehub.teamOne.repository.util.JpaUtil;
import gr.codehub.teamOne.resource.interfaces.PingServerResource;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import javax.persistence.EntityManager;

public class PingServerResourceImpl extends ServerResource implements PingServerResource {

    private EntityManager em;
    public static final String PING = "Sacchon Web API v0.9.82 running";

    @Override
    protected void doInit() throws ResourceException {

        try{
            em = JpaUtil.getEntityManager();
        }catch (Exception e){
            throw new ResourceException(e);
        }
    }

    @Override
    protected void doRelease() throws ResourceException {
        em.close();
    }

    /**
     * @return Default text to show that server works
     */
    @Override
    public String ping() throws NotFoundException {
        return PING;
    }
}
