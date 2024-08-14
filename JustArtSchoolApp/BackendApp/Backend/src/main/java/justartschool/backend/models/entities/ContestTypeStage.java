package justartschool.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

import justartschool.backend.models.compositePrimaryKeys.ContestTypeStageId;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "contest_type_stage")
public class ContestTypeStage {
    @EmbeddedId
    private ContestTypeStageId contestTypeStageId;

    @Column
    private Date startDate;

    @Column
    private Date endDate;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private Contest contest;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Stage stage;


    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private ContestType contestType;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Role role;

    @JsonIgnore
    @OneToMany(mappedBy = "contestTypeStage",cascade = {CascadeType.ALL})
    private List<AdmissionContestTask> admissionContestTaskList = new ArrayList<>();
}