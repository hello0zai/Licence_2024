package justartschool.backend.models.entities;

import jakarta.persistence.*;
import justartschool.backend.models.compositePrimaryKeys.TeacherCourseConfigurationId;
import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "teacherCourseConfiguration")
public class TeacherCourseConfiguration {
    @EmbeddedId
    private TeacherCourseConfigurationId teacherCourseConfigurationId;


    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Teacher teacher;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private SubjectStudyPeriodCourseDetails subjectStudyPeriodCourseDetails;
}