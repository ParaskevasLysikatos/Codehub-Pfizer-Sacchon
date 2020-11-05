package gr.codehub.teamOne.router;

import gr.codehub.teamOne.resource.impl.MeasurementsResourceImpl;
import gr.codehub.teamOne.resource.impl.PingServerResourceImpl;
import gr.codehub.teamOne.resource.impl.LoginRegisterResourceImpl;
import org.restlet.Application;
import org.restlet.routing.Router;

public class PatientRouter {

    private Application application;

    public PatientRouter(Application application) {
        this.application = application;
    }

    public Router createApiRouter() {

        Router router = new Router(application.getContext());
        router.attach("/measurements", MeasurementsResourceImpl.class);
        router.attach("/users", LoginRegisterResourceImpl.class);

        router.attach("/ping", PingServerResourceImpl.class);

        return router;
    }
}
