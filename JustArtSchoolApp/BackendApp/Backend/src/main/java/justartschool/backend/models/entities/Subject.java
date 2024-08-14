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
@Table(name = "subject")
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID subjectId;

    @Column(unique = true, nullable = false)
    private String subjectName;

    @JsonIgnore
    @OneToMany(mappedBy = "subject",cascade = {CascadeType.ALL})
    private List<SubjectStudyPeriod> subjectStudyPeriodList = new ArrayList<SubjectStudyPeriod>();
}