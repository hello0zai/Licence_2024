package justartschool.backend.repositories;

import justartschool.backend.models.entities.ContestType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface IContestTypeRepository extends JpaRepository<ContestType, UUID> {
    ContestType findContestTypeByContestTypeId(UUID id);
    ContestType findContestTypeByContestTypeName(String contestTypeName);
}
