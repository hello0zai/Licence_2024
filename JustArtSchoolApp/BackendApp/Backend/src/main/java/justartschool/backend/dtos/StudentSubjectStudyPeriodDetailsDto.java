package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.compositePrimaryKeys.StudentSubjectStudyPeriodDetailsId;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodId;
import justartschool.backend.models.entities.StudentSubjectStudyPeriodDetails;
import lombok.*;

import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StudentSubjectStudyPeriodDetailsDto {
    @Nullable
    private StudentSubjectStudyPeriodDetailsId studentSubjectStudyPeriodDetailsId;
    @NonNull
    private Integer studyYear;
    private byte @NonNull [] registrationForm;
    @NonNull
    private Integer currentYear;
    @NonNull
    private UUID studentId;
    @Nullable
    private StudentDto studentDto = new StudentDto();
    @NonNull
    private SubjectStudyPeriodId subjectStudyPeriodId;
    @Nullable
    private SubjectStudyPeriodDto subjectStudyPeriodDto = new SubjectStudyPeriodDto();

    public StudentSubjectStudyPeriodDetailsDto(StudentSubjectStudyPeriodDetails studentSubjectStudyPeriodDetails) {
        this.studentSubjectStudyPeriodDetailsId = studentSubjectStudyPeriodDetails.getStudentSubjectStudyPeriodDetailsId();
        this.studyYear = studentSubjectStudyPeriodDetails.getStudyYear();
        this.registrationForm = studentSubjectStudyPeriodDetails.getRegistrationForm();
        this.currentYear = studentSubjectStudyPeriodDetails.getCurrentYear();
        this.studentId = studentSubjectStudyPeriodDetails.getStudent().getUserId();
        this.studentDto = new StudentDto(studentSubjectStudyPeriodDetails.getStudent());
        this.subjectStudyPeriodId = studentSubjectStudyPeriodDetails.getSubjectStudyPeriod().getSubjectStudyPeriodId();
        this.subjectStudyPeriodDto = new SubjectStudyPeriodDto(studentSubjectStudyPeriodDetails.getSubjectStudyPeriod());
    }
}