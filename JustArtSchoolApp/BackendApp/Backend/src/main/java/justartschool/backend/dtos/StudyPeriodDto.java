package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.entities.StudyPeriod;
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
public class StudyPeriodDto {
    @Nullable
    private UUID studyPeriodId;
    @NonNull
    private String studyPeriodName;
    @Nullable
    private List<SubjectStudyPeriodDto> subjectStudyPeriodList = new ArrayList<>();

    public StudyPeriodDto(StudyPeriod studyPeriod) {
        this.studyPeriodId = studyPeriod.getStudyPeriodId();
        this.studyPeriodName = studyPeriod.getStudyPeriodName();
//        this.subjectStudyPeriodList = studyPeriod.getSubjectStudyPeriodList().stream().map(SubjectStudyPeriodDto::new).toList();
    }
}