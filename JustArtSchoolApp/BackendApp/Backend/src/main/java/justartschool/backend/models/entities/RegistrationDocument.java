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
@Table(name = "registration_document")
public class RegistrationDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID registrationDocumentId;

    @Column
    private String documentName;

    @Column
    private String description;

    @Column
    private Boolean mandatory;

    @JsonIgnore
    @OneToMany(mappedBy = "registrationDocument", cascade = {CascadeType.ALL})
    List<StudentRegistrationDocument> studentRegistrationDocumentList = new ArrayList<StudentRegistrationDocument>();
}
