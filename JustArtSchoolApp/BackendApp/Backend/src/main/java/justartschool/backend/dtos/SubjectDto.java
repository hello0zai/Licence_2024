package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.entities.Subject;
import lombok.*;

import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SubjectDto {
    @Nullable
    private UUID subjectId;
    @NonNull
    private String subjectName;

    public SubjectDto(Subject subject) {
        this.subjectId = subject.getSubjectId();
        this.subjectName = subject.getSubjectName();
    }
}
