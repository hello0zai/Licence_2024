package justartschool.backend.repositories;

import justartschool.backend.models.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IRolesRepository extends JpaRepository<Role, UUID> {
    Role getRoleByName(String roleName);

    Role getRoleByRoleId(UUID roleId);
}
