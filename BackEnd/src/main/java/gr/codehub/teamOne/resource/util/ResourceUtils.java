package gr.codehub.teamOne.resource.util;

import org.restlet.data.Status;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

public class ResourceUtils {

    public static void checkRole(ServerResource serverResource, List<String> roles) throws ResourceException {

        AtomicBoolean hasAuthentication = new AtomicBoolean(false);

        roles.forEach(role -> {
            if (serverResource.isInRole(role)) {
                hasAuthentication.set(true);
            }
        });

        if (!hasAuthentication.get()) {
            throw new ResourceException(Status.CLIENT_ERROR_FORBIDDEN.getCode(), "You 're not authorize to send this call.");
        }
    }
}
