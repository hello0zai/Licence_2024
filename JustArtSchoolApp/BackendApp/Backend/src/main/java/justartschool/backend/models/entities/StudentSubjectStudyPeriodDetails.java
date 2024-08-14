package justartschool.backend.models.entities;

import jakarta.persistence.*;
import justartschool.backend.models.compositePrimaryKeys.StudentSubjectStudyPeriodDetailsId;
import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "student_subject_study_period_details")
public class StudentSubjectStudyPeriodDetails {
    @EmbeddedId
    private StudentSubjectStudyPeriodDetailsId studentSubjectStudyPeriodDetailsId;

    @Column
    private Integer studyYear;

    @Lob
    @Column(length = 10000000)
    private byte[] registrationForm;

    @Column
    private Integer currentYear;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Student student;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private SubjectStudyPeriod subjectStudyPeriod;
}