package justartschool.backend.models.entities;

import jakarta.persistence.*;
import justartschool.backend.models.compositePrimaryKeys.AdmissionContestTaskId;
import lombok.*;
import java.util.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "admission_contest_details")
public class AdmissionContestTask {
    @EmbeddedId
    private AdmissionContestTaskId admissionContestTaskId;

    @Column
    private Integer registrationStudyYear;

    @Lob
    @Column(length = 10000000)
    private byte[] registrationForm;

    @Column
    private Boolean passed;

    @Column
    private Date startDate;

    @Column
    private Date endDate;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private SubjectStudyPeriod subjectStudyPeriod;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private ContestTypeStage contestTypeStage;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Student student;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private User user;
}
