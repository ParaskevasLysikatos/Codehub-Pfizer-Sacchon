package gr.codehub.teamOne.model.Enums;


public enum Gender {
    NA("n/a"),
    MALE("male"),
    FEMALE("female");

    private final String genderCategory;

    Gender(String genderType) {
        this.genderCategory = genderType;
    }

    public String getGender(){
        return genderCategory;
    }
}

