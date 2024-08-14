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
@Table(name = "stage")
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID stageId;

    @Column
    private String stageName;

    @JsonIgnore
    @OneToMany(mappedBy = "stage",cascade = {CascadeType.ALL})
    private List<ContestTypeStage> contestTypeStageList = new ArrayList<>();
}
