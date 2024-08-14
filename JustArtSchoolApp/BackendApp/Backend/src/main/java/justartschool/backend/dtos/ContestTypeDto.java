package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.entities.ContestType;
import lombok.*;

import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContestTypeDto {
    @Nullable
    private UUID contestTypeId;

    @NonNull
    private String contestTypeName;

    public ContestTypeDto (ContestType contestType) {
        this.contestTypeId = contestType.getContestTypeId();
        this.contestTypeName = contestType.getContestTypeName();
    }
}
