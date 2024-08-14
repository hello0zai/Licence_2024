package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.entities.RegistrationDocument;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegistrationDocumentDto {
    @Nullable
    private UUID registrationDocumentId;
    @NonNull
    private String documentName;
    @NonNull
    private String description;
    @Nullable
    private Boolean mandatory;

    private List<StudentRegistrationDocumentDto> studentRegistrationDocumentDtoList = new ArrayList<>();

    public RegistrationDocumentDto(RegistrationDocument registrationDocument) {
        this.registrationDocumentId = registrationDocument.getRegistrationDocumentId();
        this.documentName = registrationDocument.getDocumentName();
        this.description = registrationDocument.getDescription();
        this.mandatory = registrationDocument.getMandatory();
        this.studentRegistrationDocumentDtoList = registrationDocument.getStudentRegistrationDocumentList().stream().map(StudentRegistrationDocumentDto::new).toList();
    }
}
