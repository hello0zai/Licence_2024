package justartschool.backend.repositories;

import justartschool.backend.models.entities.StudyPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IStudyPeriodRepository extends JpaRepository<StudyPeriod, UUID> {
    StudyPeriod findByStudyPeriodId(UUID id);
}
