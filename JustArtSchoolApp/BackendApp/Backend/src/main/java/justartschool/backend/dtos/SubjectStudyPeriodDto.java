package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodId;
import justartschool.backend.models.entities.SubjectStudyPeriod;
import lombok.*;
import java.util.*;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SubjectStudyPeriodDto {
    @Nullable
    private SubjectStudyPeriodId subjectStudyPeriodId;
    @NonNull
    private Double yearlySubjectTax;
    @NonNull
    private Integer durationPeriod;
    @NonNull
    private Integer availableSpots;
    @Nullable
    private UUID subjectId;
    @Nullable
    private SubjectDto subjectDto = new SubjectDto();
    @Nullable
    private UUID studyPeriodId;
    @Nullable
    private StudyPeriodDto studyPeriodDto = new StudyPeriodDto();
    @Nullable
    private List<StudentSubjectStudyPeriodDetailsDto> studentSubjectStudyPeriodDetailsDtoList = new ArrayList<>();
    @Nullable
    private List<SubjectStudyPeriodCourseDetailsDto> subjectStudyPeriodCourseDetailDtoList = new ArrayList<>();

    public SubjectStudyPeriodDto(SubjectStudyPeriod subjectStudyPeriod) {
        this.subjectStudyPeriodId = subjectStudyPeriod.getSubjectStudyPeriodId();
        this.yearlySubjectTax = subjectStudyPeriod.getYearlySubjectTax();
        this.durationPeriod = subjectStudyPeriod.getDurationPeriod();
        this.availableSpots = subjectStudyPeriod.getAvailableSpots();
        this.subjectId = subjectStudyPeriod.getSubjectStudyPeriodId().getSubjectId();
        this.subjectDto = new SubjectDto(subjectStudyPeriod.getSubject());
        this.studyPeriodId = subjectStudyPeriod.getStudyPeriod().getStudyPeriodId();
        this.studyPeriodDto = new StudyPeriodDto(subjectStudyPeriod.getStudyPeriod());
        this.studentSubjectStudyPeriodDetailsDtoList = subjectStudyPeriod.getStudentSubjectStudyPeriodDetailsList().stream().map(StudentSubjectStudyPeriodDetailsDto::new).toList();
//        this.subjectStudyPeriodCourseDetailDtoList = subjectStudyPeriod.getSubjectStudyPeriodCourseDetailList().stream().map(SubjectStudyPeriodCourseDetailsDto::new).toList();
    }
}