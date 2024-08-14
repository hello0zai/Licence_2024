package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.entities.Stage;
import lombok.*;

import java.util.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StageDto {
    @Nullable
    private UUID stageId;
    @NonNull
    private String stageName;
    private List<ContestTypeStageDto> contestTypeStageDtoList = new ArrayList<>();

    public StageDto(Stage stage){
        this.stageId = stage.getStageId();
        this.stageName = stage.getStageName();
//        this.contestTypeStageDtoList = stage.getContestTypeStageList().stream().map(ContestTypeStageDto::new).toList();
    }
}
