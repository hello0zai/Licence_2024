package justartschool.backend.models.compositePrimaryKeys;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Embeddable
public class ContestTypeStageId implements Serializable {
    @NonNull
    private UUID contestId;

    @NonNull
    private UUID stageId;

    @NonNull
    private UUID typeId;
}
