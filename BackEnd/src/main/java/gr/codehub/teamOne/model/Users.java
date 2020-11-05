package gr.codehub.teamOne.model;

import gr.codehub.teamOne.model.Enums.Gender;
import gr.codehub.teamOne.security.AccessRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String first_name;
    private String last_name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    private String mobile_phone_number;
    private String phone_number;
    private String address;
    private AccessRole accountType;

    //Social Security number(amka).
    @Column(unique = true, nullable = false)
    private Integer amka;

    private Gender gender;
    private Date registration_date;
    private Date lastLogin;

    private boolean active;
}