package gr.codehub.teamOne.security;

public enum AccessRole {

    ROLE_NA("n/a"),
    ROLE_ADMIN("admin"),
    ROLE_DOCTOR("doctor"),
    ROLE_PATIENT("patient"),
    ROLE_PENDING("pending");

    private final String roleName;

    AccessRole(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleName() {
        return roleName;
    }

    /**
     * Method that takes a role as String and try to find the equal AccessRole
     * @param roleParameter The user role as string
     * @return The equal AccessRole
     */
    public static AccessRole getRoleValue(String roleParameter) {
        for (AccessRole accessRole : AccessRole.values()) {
            if (roleParameter.equals(accessRole.getRoleName())) {
                return accessRole;
            }
        }
        return ROLE_NA;
    }

    /**
     * Method that takes index of role as String and try to find the equal AccessRole
     * @param index The user role as string
     * @return The equal AccessRole
     */
    public static AccessRole getRoleFromIndex(String index) {

        int amkaKey;

        try {
            amkaKey = Integer.parseInt(index);
        } catch (NumberFormatException e) {
            throw new NumberFormatException("This is not amka number ! Error: " + e);
        }

        for (AccessRole accessRole : AccessRole.values()) {
            if (amkaKey == accessRole.ordinal()) {
                return accessRole;
            }
        }
        return ROLE_NA;
    }
}
