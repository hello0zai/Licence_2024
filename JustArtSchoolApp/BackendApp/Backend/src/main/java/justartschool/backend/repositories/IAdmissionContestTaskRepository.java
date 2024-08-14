package justartschool.backend.repositories;

import justartschool.backend.models.compositePrimaryKeys.AdmissionContestTaskId;
import justartschool.backend.models.entities.AdmissionContestTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAdmissionContestTaskRepository extends JpaRepository<AdmissionContestTask, AdmissionContestTaskId> {
}