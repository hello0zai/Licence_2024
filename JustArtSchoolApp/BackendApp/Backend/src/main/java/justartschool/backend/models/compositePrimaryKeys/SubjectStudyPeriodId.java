package justartschool.backend.models.compositePrimaryKeys;

import jakarta.annotation.Nullable;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
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
public class SubjectStudyPeriodId implements Serializable {
    @Nullable
    private UUID subjectId;
    @Nullable
    private UUID studyPeriodId;
}
