package justartschool.backend.models.entities;

import jakarta.persistence.*;
import justartschool.backend.models.compositePrimaryKeys.StudentSubjectCourseGradeId;
import lombok.*;
import java.util.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "student_subject_course_grade")
public class StudentSubjectCourseGrade {
    @EmbeddedId
    private StudentSubjectCourseGradeId studentSubjectCourseGradeId;

    @Column
    private Double grade;

    @Column
    private Boolean passed;

    @Column
    private Date examDate;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Student student;

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    private SubjectStudyPeriodCourseDetails subjectStudyPeriodCourseDetails;

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE, CascadeType.REMOVE})
    private Teacher teacher;
}