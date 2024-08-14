package justartschool.backend.models.compositePrimaryKeys;

import jakarta.persistence.Embeddable;
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
public class AdmissionContestTaskId implements Serializable {
    @NonNull
    private UUID contestId;

    @NonNull
    private UUID stageId;

    @NonNull
    private UUID typeId;

    @NonNull
    private UUID studentId;

    @NonNull
    private UUID subjectId;

    @NonNull
    private UUID studyPeriodId;
}
