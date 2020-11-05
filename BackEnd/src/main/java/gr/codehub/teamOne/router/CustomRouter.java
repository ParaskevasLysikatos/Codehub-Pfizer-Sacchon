package gr.codehub.teamOne.router;

import gr.codehub.teamOne.resource.impl.*;
import gr.codehub.teamOne.resource.interfaces.WaitConsultationResource;
import org.restlet.Application;
import org.restlet.routing.Router;

public class CustomRouter {

    private Application application;

    public CustomRouter(Application application) {
        this.application = application;
    }

    public Router createApiRouter() {

        Router router = new Router(application.getContext());

        router.attach("/patient", PatientResourceImpl.class);
        router.attach("/doctors", DoctorsResourceImpl.class);
        router.attach("/profile", ProfileResourceImpl.class);
        router.attach("/measurements", MeasurementResourceImpl.class);
        router.attach("/associations", PatientDoctorAssociationResourceImpl.class);
        router.attach("/consultation", ConsultationResourceImpl.class);
        router.attach("/consultation/wait", WaitConsultationResourceImpl.class);
        router.attach("/users/interacts", UsersResourceImpl.class);
        router.attach("/expired", ExpiredSessionResourceImpl.class);
        router.attach("/data", DataResourceImpl.class);
        router.attach("/pending", PendingDocResourceImpl.class);

        return router;
    }

    public Router publicResources() {

        Router router = new Router();

        router.attach("/ping", PingServerResourceImpl.class);
        router.attach("/users", LoginRegisterResourceImpl.class);

        return router;
    }

}
