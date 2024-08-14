package justartschool.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "contest_type")
public class ContestType {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID contestTypeId;

    @Column
    private String contestTypeName;

    @JsonIgnore
    @OneToMany(mappedBy = "contestType", cascade = {CascadeType.ALL})
    private List<ContestTypeStage> contestTypeStageList = new ArrayList<>();
}
