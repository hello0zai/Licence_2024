package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.compositePrimaryKeys.ContestTypeStageId;
import justartschool.backend.models.entities.AdmissionContestTask;
import justartschool.backend.models.entities.ContestTypeStage;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContestTypeStageDto {
    @Nullable
    private ContestTypeStageId contestTypeStageId;
    @NonNull
    private Date startDate;
    @NonNull
    private Date endDate;
    @Nullable
    private UUID contestId;
    @Nullable
    private ContestDto contestDto = new ContestDto();
    @NonNull
    private UUID stageId;
    @Nullable
    private StageDto stageDto = new StageDto();
    @NonNull
    private UUID contestTypeId;
    @Nullable
    private ContestTypeDto contestTypeDto = new ContestTypeDto();
    @NonNull
    private UUID roleId;
    private RoleDto roleDto = new RoleDto();
    private List<AdmissionContestTask> admissionContestTaskList = new ArrayList<>();

    public ContestTypeStageDto(ContestTypeStage contestTypeStage) {
        this.contestTypeStageId = contestTypeStage.getContestTypeStageId();
        this.startDate = contestTypeStage.getStartDate();
        this.endDate = contestTypeStage.getEndDate();
        this.contestId = contestTypeStage.getContestTypeStageId().getContestId();
        this.contestDto = new ContestDto(contestTypeStage.getContest());
        this.stageId = contestTypeStage.getContestTypeStageId().getStageId();
        this.stageDto = new StageDto(contestTypeStage.getStage());
        this.contestTypeId = contestTypeStage.getContestType().getContestTypeId();
        this.contestTypeDto = new ContestTypeDto(contestTypeStage.getContestType());
        this.roleId = contestTypeStage.getRole().getRoleId();
        this.roleDto = new RoleDto(contestTypeStage.getRole());
    }
}
