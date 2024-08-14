package justartschool.backend.repositories;

import justartschool.backend.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface IUsersRepository extends JpaRepository<User, UUID> {
    User findUserByUserId(UUID userId);

    Optional<User> findByUserName(String userName);

    Optional<User> findByEmail(String email);

}
