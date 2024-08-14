package justartschool.backend.repositories;

import justartschool.backend.models.entities.Contest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;
@Repository
public interface IContestRepository extends JpaRepository<Contest, UUID> {
    Contest findContestByContestId(UUID id);
}
