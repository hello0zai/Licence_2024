package justartschool.backend.repositories;

import justartschool.backend.models.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ICoursesRepository extends JpaRepository<Course, UUID> {
    Course findCourseByCourseId(UUID id);
}
