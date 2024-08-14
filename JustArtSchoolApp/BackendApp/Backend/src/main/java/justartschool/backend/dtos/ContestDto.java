package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.compositePrimaryKeys.ContestTypeStageId;
import justartschool.backend.models.entities.Contest;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContestDto {
    @Nullable
    private UUID contestId;
    @NonNull
    private String contestName;
    @NonNull
    private Date startDate;
    @NonNull
    private Date endDate;
    private List<ContestTypeStageId> contestTypeStageIds = new ArrayList<>();
    private List<ContestTypeStageDto> contestTypeStageDtoList = new ArrayList<>();

    public ContestDto(Contest contest) {
        this.contestId = contest.getContestId();
        this.contestName = contest.getContestName();
        this.startDate = contest.getStartDate();
        this.endDate = contest.getEndDate();
//        this.contestTypeStageDtoList = contest.getContestTypeStageList().stream().map(ContestTypeStageDto::new).toList();
    }
}
