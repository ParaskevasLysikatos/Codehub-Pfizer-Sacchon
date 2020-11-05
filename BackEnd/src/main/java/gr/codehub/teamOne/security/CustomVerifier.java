package gr.codehub.teamOne.security;

import gr.codehub.teamOne.security.dao.ApplicationUser;
import gr.codehub.teamOne.security.dao.ApplicationUserPersistence;
import org.restlet.Request;
import org.restlet.security.Role;
import org.restlet.security.SecretVerifier;

import java.sql.SQLException;

public class CustomVerifier extends SecretVerifier {

    @Override
    public int verify(String identifier, char[] secret) throws IllegalArgumentException {

        ApplicationUserPersistence applicationUserPersistence = ApplicationUserPersistence.getApplicationUserPersistence();
        ApplicationUser user = null;

        try {
            user = applicationUserPersistence.findById(identifier);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }

        if (user != null && compare(user.getPassword().toCharArray(), secret)) {
            Request mRequest = Request.getCurrent();
            mRequest.getClientInfo().getRoles().add(new Role(user.getAccessRole().getRoleName()));
            return SecretVerifier.RESULT_VALID;
        } else {
            return SecretVerifier.RESULT_INVALID;
        }
    }
}
