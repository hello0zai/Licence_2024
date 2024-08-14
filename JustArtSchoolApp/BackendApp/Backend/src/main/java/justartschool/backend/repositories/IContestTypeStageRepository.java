package justartschool.backend.repositories;

import justartschool.backend.models.compositePrimaryKeys.ContestTypeStageId;
import justartschool.backend.models.entities.ContestTypeStage;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IContestTypeStageRepository extends JpaRepository<ContestTypeStage, ContestTypeStageId> {
    @Override
    @NotNull List<ContestTypeStage> findAll();

    ContestTypeStage findContestTypeStageByContestTypeStageId(ContestTypeStageId id);

    List<ContestTypeStage> findContestTypeStagesByContestContestId(UUID id);
}
