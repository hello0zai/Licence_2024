package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Null;
import justartschool.backend.models.entities.Course;
import justartschool.backend.models.entities.SubjectStudyPeriodCourseDetails;
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
public class CourseDto {
    @Nullable
    private UUID courseId;
    @NonNull
    private String courseName;
    @Nullable
    private List<SubjectStudyPeriodCourseDetailsDto> subjectStudyPeriodCourseDetailsDtoList = new ArrayList<>();

    public CourseDto(Course course) {
        this.courseId = course.getCourseId();
        this.courseName = course.getCourseName();
//        this.subjectStudyPeriodCourseDetailsDtoList = course.getSubjectStudyPeriodCourseDetailsList().stream().map(SubjectStudyPeriodCourseDetailsDto::new).toList();
    }
}
