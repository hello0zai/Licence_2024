package justartschool.backend.models.entities;
import jakarta.persistence.*;
import justartschool.backend.models.compositePrimaryKeys.StudentRegistrationDocumentId;
import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "student_registration_document")
public class StudentRegistrationDocument {
    @EmbeddedId
    private StudentRegistrationDocumentId studentRegistrationDocumentId;

    @Lob
    @Column(length = 10000000)
    private byte[] documentPdf;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Student student;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private RegistrationDocument registrationDocument;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Secretary secretary;
}
