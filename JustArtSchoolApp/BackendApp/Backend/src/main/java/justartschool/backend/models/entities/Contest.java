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
@Table(name = "contest")
public class Contest {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID contestId;

    @Column
    private String contestName;

    @Column
    private Date startDate;

    @Column
    private Date endDate;

    @JsonIgnore
    @OneToMany(mappedBy = "contest",cascade = {CascadeType.ALL})
    private List<ContestTypeStage> contestTypeStageList = new ArrayList<>();
}
