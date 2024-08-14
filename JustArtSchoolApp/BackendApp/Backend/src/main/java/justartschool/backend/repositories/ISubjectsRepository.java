package justartschool.backend.repositories;

import justartschool.backend.models.entities.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ISubjectsRepository extends JpaRepository<Subject, UUID> {
    Subject findSubjectBySubjectId(UUID id);

    Subject findSubjectBySubjectName(String subject);
}
