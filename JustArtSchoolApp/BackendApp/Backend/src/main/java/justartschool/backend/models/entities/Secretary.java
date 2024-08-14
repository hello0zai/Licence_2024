package justartschool.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.*;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "secretary")
public class Secretary {
    @Id
    private UUID userId;
    @Column
    private String lastName;
    @Column
    private String firstName;
    @Column
    private String personalEmail;
    @Column
    private String fullAddress;
    @Column
    private String cnp;
    @Column
    private String phoneNumber;

    @ManyToOne()
    @JoinColumn(name = "cityId",  nullable = true)
    City city;

    @JsonIgnore
    @OneToMany(mappedBy = "secretary", cascade = {CascadeType.ALL})
    List<StudentRegistrationDocument> studentRegistrationDocumentList = new ArrayList<StudentRegistrationDocument>();

    @OneToOne
    @MapsId
    @JoinColumn(name = "userId")
    private User user;
}