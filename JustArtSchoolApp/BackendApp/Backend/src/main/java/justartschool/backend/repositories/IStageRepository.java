package justartschool.backend.repositories;

import justartschool.backend.models.entities.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface IStageRepository extends JpaRepository<Stage, UUID> {
    Stage findStageByStageId(UUID id);
    Stage findStageByStageName(String stageName);
}
