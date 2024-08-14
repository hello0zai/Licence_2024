package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodCourseDetailsId;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodId;
import justartschool.backend.models.entities.SubjectStudyPeriodCourseDetails;
import justartschool.backend.models.entities.TeacherCourseConfiguration;
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
public class SubjectStudyPeriodCourseDetailsDto {
    @Nullable
    private SubjectStudyPeriodCourseDetailsId subjectStudyPeriodCourseDetailsId;
    @Nullable
    private Integer studyYear;
    @Nullable
    private String examName;
    @Nullable
    private String examType;
    @Nullable
    private Integer semester;
    @Nullable
    private String classHoursDuration;
    @Nullable
    private Integer weeklyFrequencyCourse;
    @Nullable
    private Integer courseWeeksDuration;
    @Nullable
    private SubjectStudyPeriodId subjectStudyPeriodId;
    @Nullable
    private SubjectStudyPeriodDto subjectStudyPeriodDto = new SubjectStudyPeriodDto();
    @NonNull
    private UUID courseId;
    @Nullable
    private CourseDto courseDto = new CourseDto();
    @Nullable
    private List<UUID> teacherIds = new ArrayList<>();
    @Nullable
    private List<TeacherDto> teacherDtoList = new ArrayList<>();

    public SubjectStudyPeriodCourseDetailsDto(SubjectStudyPeriodCourseDetails subjectStudyPeriodCourseDetails) {
        this.subjectStudyPeriodCourseDetailsId = subjectStudyPeriodCourseDetails.getSubjectStudyPeriodCourseDetailsId();
        this.examName = subjectStudyPeriodCourseDetails.getExamName();
        this.examType = subjectStudyPeriodCourseDetails.getExamType();
        this.classHoursDuration = subjectStudyPeriodCourseDetails.getClassHoursDuration();
        this.weeklyFrequencyCourse = subjectStudyPeriodCourseDetails.getWeeklyFrequencyCourse();
        this.courseWeeksDuration = subjectStudyPeriodCourseDetails.getCourseWeeksDuration();
        this.semester = subjectStudyPeriodCourseDetails.getSemester();
        this.studyYear = subjectStudyPeriodCourseDetails.getSubjectStudyPeriodCourseDetailsId().getStudyYearId();
        this.subjectStudyPeriodId = subjectStudyPeriodCourseDetails.getSubjectStudyPeriod().getSubjectStudyPeriodId();
        this.subjectStudyPeriodDto = new SubjectStudyPeriodDto(subjectStudyPeriodCourseDetails.getSubjectStudyPeriod());
        this.courseId = subjectStudyPeriodCourseDetails.getCourse().getCourseId();
        this.courseDto = new CourseDto(subjectStudyPeriodCourseDetails.getCourse());

        for (TeacherCourseConfiguration tcc : subjectStudyPeriodCourseDetails.getTeacherCourseConfigurationList()) {
            this.teacherDtoList.add(new TeacherDto(tcc.getTeacher()));
        }
    }
}
