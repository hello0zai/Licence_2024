package justartschool.backend.models.compositePrimaryKeys;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Embeddable
public class StudentSubjectStudyPeriodDetailsId implements Serializable {
    @NonNull
    private UUID studentId;
    @NonNull
    private UUID subjectId;
    @NonNull
    private UUID studyPeriodId;
}
