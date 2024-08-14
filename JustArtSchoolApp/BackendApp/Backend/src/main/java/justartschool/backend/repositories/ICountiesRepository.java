package justartschool.backend.repositories;

import justartschool.backend.models.entities.County;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ICountiesRepository extends JpaRepository<County, UUID> {
}
