package justartschool.backend.repositories;

import justartschool.backend.models.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface IStudentRepository extends JpaRepository<Student, UUID> {
}
