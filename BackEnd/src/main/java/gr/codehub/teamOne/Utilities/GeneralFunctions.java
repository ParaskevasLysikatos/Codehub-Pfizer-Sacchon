package gr.codehub.teamOne.Utilities;

import gr.codehub.teamOne.model.PatientDoctorAssociation;
import gr.codehub.teamOne.model.Users;
import gr.codehub.teamOne.security.AccessRole;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class GeneralFunctions {

    public static int DaysToConsiderUserExpired = 15;

    /**
     * To avoid multiple creation of List only to set roles that have access on method
     *
     * @param patient  if its true means that account with roleType User have access to method
     * @param doctor if its true means that account with roleType Owner have access to method
     * @param admin if its true means that account with roleType Admin have access to method
     * @return A list of string with tags of roles that have access on method
     */
    public static List<String> rolesWithAccess(boolean patient, boolean doctor, boolean admin) {
        List<String> tempListWithRoles = new ArrayList<>();
        if (doctor) {
            tempListWithRoles.add(AccessRole.ROLE_DOCTOR.getRoleName());
        }
        if (patient) {
            tempListWithRoles.add(AccessRole.ROLE_PATIENT.getRoleName());
        }
        if (admin) {
            tempListWithRoles.add(AccessRole.ROLE_ADMIN.getRoleName());
        }
        return tempListWithRoles;
    }

    public static List<Users> removeInactiveUsers(List<Users> listWithAllUsers){

        if (listWithAllUsers != null){

            List<Users> listWithoutInactiveUsers = new ArrayList<>();

            listWithAllUsers.forEach( usr -> {
                if(usr.isActive()){
                    listWithoutInactiveUsers.add(usr);
                }
            });

            return listWithoutInactiveUsers;
        }
        return null;
    }

    public static List<PatientDoctorAssociation> removeInactiveAssociations(List<PatientDoctorAssociation> listWithAllAssociations){

        if (listWithAllAssociations != null){

            List<PatientDoctorAssociation> listWithoutInactiveAssociations = new ArrayList<>();

            listWithAllAssociations.forEach( associate -> {
                if(associate.isActive()){
                    listWithoutInactiveAssociations.add(associate);
                }
            });

            return listWithoutInactiveAssociations;
        }
        return null;
    }

    public static long compareDateWithNow(Date mDate){

        Date d1 = new Date();
        Date d2 = mDate;
        long diffRaw = Math.abs(d1.getTime() - d2.getTime());
        return TimeUnit.DAYS.convert(diffRaw, TimeUnit.MILLISECONDS);
    }
}
