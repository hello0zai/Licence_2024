package justartschool.backend.repositories;

import justartschool.backend.models.entities.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ITeachersRepository extends JpaRepository<Teacher, UUID> {
    Teacher findByUserUserId(UUID userId);
}
