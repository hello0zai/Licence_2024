package justartschool.backend.repositories;

import justartschool.backend.models.entities.Secretary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ISecretariesRepository extends JpaRepository<Secretary, UUID> {
    Secretary findByUserUserId(UUID userId);
}
