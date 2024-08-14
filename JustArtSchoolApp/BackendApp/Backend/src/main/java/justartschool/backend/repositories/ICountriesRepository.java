package justartschool.backend.repositories;

import justartschool.backend.models.entities.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ICountriesRepository extends JpaRepository<Country, UUID> {
}
