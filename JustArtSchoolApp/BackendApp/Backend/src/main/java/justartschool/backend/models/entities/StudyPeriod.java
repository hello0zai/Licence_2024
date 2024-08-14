package justartschool.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "study_period")

public class StudyPeriod {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID studyPeriodId;

    @Column
    private String studyPeriodName;

    @JsonIgnore
    @OneToMany(mappedBy = "studyPeriod",cascade = {CascadeType.ALL})
    private List<SubjectStudyPeriod> subjectStudyPeriodList = new ArrayList<SubjectStudyPeriod>();
}
