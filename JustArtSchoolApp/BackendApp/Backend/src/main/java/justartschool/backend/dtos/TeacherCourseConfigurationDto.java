package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.compositePrimaryKeys.TeacherCourseConfigurationId;
import justartschool.backend.models.entities.TeacherCourseConfiguration;
import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TeacherCourseConfigurationDto {
    @Nullable
    private TeacherCourseConfigurationId teacherCourseConfigurationId;
    @Nullable
    private SubjectStudyPeriodCourseDetailsDto subjectStudyPeriodCourseDetailsDto = new SubjectStudyPeriodCourseDetailsDto();
    @Nullable
    private TeacherDto teacherDto = new TeacherDto();

    public TeacherCourseConfigurationDto(TeacherCourseConfiguration teacherCourseConfiguration) {
        this.teacherCourseConfigurationId = teacherCourseConfiguration.getTeacherCourseConfigurationId();
        this.subjectStudyPeriodCourseDetailsDto = new SubjectStudyPeriodCourseDetailsDto(teacherCourseConfiguration.getSubjectStudyPeriodCourseDetails());
        this.teacherDto = new TeacherDto(teacherCourseConfiguration.getTeacher());
    }
}