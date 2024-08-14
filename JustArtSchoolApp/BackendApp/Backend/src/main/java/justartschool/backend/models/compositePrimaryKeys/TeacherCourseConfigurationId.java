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
public class TeacherCourseConfigurationId implements Serializable {
    @NonNull
    private UUID subjectId;
    @NonNull
    private UUID studyPeriodId;
    @NonNull
    private UUID courseId;
    @NonNull
    private UUID teacherId;
    @NonNull
    private Integer studyYearId;
}