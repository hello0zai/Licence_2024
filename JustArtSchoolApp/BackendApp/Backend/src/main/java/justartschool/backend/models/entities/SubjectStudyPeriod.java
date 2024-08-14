package justartschool.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodId;
import lombok.*;
import java.util.*;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "subject_study_period")
public class SubjectStudyPeriod {
    @EmbeddedId
    private SubjectStudyPeriodId subjectStudyPeriodId;

    @Column
    private Double yearlySubjectTax;

    @Column
    private Integer durationPeriod;

    @Column
    private Integer availableSpots;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Subject subject;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private StudyPeriod studyPeriod;

    @JsonIgnore
    @OneToMany(mappedBy = "subjectStudyPeriod", cascade = {CascadeType.ALL})
    private List<StudentSubjectStudyPeriodDetails> studentSubjectStudyPeriodDetailsList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "subjectStudyPeriod", cascade = {CascadeType.ALL})
    private List<SubjectStudyPeriodCourseDetails> subjectStudyPeriodCourseDetailList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "subjectStudyPeriod", cascade = {CascadeType.ALL})
    private List<AdmissionContestTask> admissionContestTaskList = new ArrayList<>();
}