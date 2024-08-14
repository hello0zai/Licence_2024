package justartschool.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodCourseDetailsId;
import lombok.*;
import java.util.*;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "subject_study_period_course_details")
public class SubjectStudyPeriodCourseDetails {
    @EmbeddedId
    private SubjectStudyPeriodCourseDetailsId subjectStudyPeriodCourseDetailsId;
    @Column
    private String examName;
    @Column
    private String examType;
    @Column
    private Integer semester;
    @Column
    private String classHoursDuration;
    @Column
    private Integer weeklyFrequencyCourse;
    @Column
    private Integer courseWeeksDuration;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private SubjectStudyPeriod subjectStudyPeriod;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Course course;

    @JsonIgnore
    @OneToMany(mappedBy = "subjectStudyPeriodCourseDetails",cascade = {CascadeType.ALL})
    private List<StudentSubjectCourseGrade>  studentSubjectCourseGradeList = new ArrayList<StudentSubjectCourseGrade>();

    @JsonIgnore
    @OneToMany(mappedBy = "subjectStudyPeriodCourseDetails",cascade = {CascadeType.ALL})
    private List<TeacherCourseConfiguration> teacherCourseConfigurationList = new ArrayList<TeacherCourseConfiguration>();
}