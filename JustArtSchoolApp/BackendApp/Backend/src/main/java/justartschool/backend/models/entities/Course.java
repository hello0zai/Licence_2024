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
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID courseId;

    @Column
    private String courseName;

    @JsonIgnore
    @OneToMany(mappedBy = "course",cascade = {CascadeType.ALL})
    private List<SubjectStudyPeriodCourseDetails> subjectStudyPeriodCourseDetailsList = new ArrayList<SubjectStudyPeriodCourseDetails>();
}
