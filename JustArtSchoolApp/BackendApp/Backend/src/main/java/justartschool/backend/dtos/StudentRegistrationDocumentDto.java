package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Null;
import justartschool.backend.models.compositePrimaryKeys.StudentRegistrationDocumentId;
import justartschool.backend.models.entities.StudentRegistrationDocument;
import lombok.*;

import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StudentRegistrationDocumentDto {
    @Nullable
    private StudentRegistrationDocumentId studentRegistrationDocumentId;
    private byte @NonNull [] documentPdf;
    @NonNull
    private UUID studentId;
    @Nullable
    private StudentDto studentDto = new StudentDto();
    @NonNull
    private UUID registrationDocumentId;
    @Nullable
    private RegistrationDocumentDto registrationDocumentDto = new RegistrationDocumentDto();
    @NonNull
    private UUID secretaryId;
    @Nullable
    private SecretaryDto secretaryDto = new SecretaryDto();

    public StudentRegistrationDocumentDto(StudentRegistrationDocument studentRegistrationDocument) {
        this.studentRegistrationDocumentId = studentRegistrationDocument.getStudentRegistrationDocumentId();
        this.documentPdf = studentRegistrationDocument.getDocumentPdf();
        this.studentId = studentRegistrationDocument.getStudent().getUserId();
        this.studentDto = new StudentDto(studentRegistrationDocument.getStudent());
        this.registrationDocumentId = studentRegistrationDocument.getRegistrationDocument().getRegistrationDocumentId();
        this.registrationDocumentDto = new RegistrationDocumentDto(studentRegistrationDocument.getRegistrationDocument());
        this.secretaryId = studentRegistrationDocument.getSecretary().getUserId();
        this.secretaryDto = new SecretaryDto(studentRegistrationDocument.getSecretary());
    }
}