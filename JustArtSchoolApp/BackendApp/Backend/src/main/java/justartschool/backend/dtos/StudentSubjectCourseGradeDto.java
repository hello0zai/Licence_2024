package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.compositePrimaryKeys.StudentSubjectCourseGradeId;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodCourseDetailsId;
import justartschool.backend.models.entities.StudentSubjectCourseGrade;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StudentSubjectCourseGradeDto {
    @Nullable
    private StudentSubjectCourseGradeId studentSubjectCourseGradeId;
    @NonNull
    private Double grade;
    @NonNull
    private Boolean passed;
    @NonNull
    private Date examDate;
    @Nullable
    private StudentDto studentDto = new StudentDto();
    @NonNull
    private UUID teacherId;
    @Nullable
    private TeacherDto teacherDto = new TeacherDto();
    @NonNull
    private SubjectStudyPeriodCourseDetailsId subjectStudyPeriodCourseDetailsId;
    @Nullable
    private SubjectStudyPeriodCourseDetailsDto subjectStudyPeriodCourseDetailsDto = new SubjectStudyPeriodCourseDetailsDto();

    public StudentSubjectCourseGradeDto(StudentSubjectCourseGrade studentSubjectCourseGrade) {
        this.studentSubjectCourseGradeId = studentSubjectCourseGrade.getStudentSubjectCourseGradeId();
        this.grade = studentSubjectCourseGrade.getGrade();
        this.passed = studentSubjectCourseGrade.getPassed();
        this.examDate = studentSubjectCourseGrade.getExamDate();
        this.studentDto = new StudentDto(studentSubjectCourseGrade.getStudent());
        this.subjectStudyPeriodCourseDetailsId = studentSubjectCourseGrade.getSubjectStudyPeriodCourseDetails().getSubjectStudyPeriodCourseDetailsId();
        this.subjectStudyPeriodCourseDetailsDto = new SubjectStudyPeriodCourseDetailsDto(studentSubjectCourseGrade.getSubjectStudyPeriodCourseDetails());
    }
}