package justartschool.backend.repositories;

import justartschool.backend.models.entities.City;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface ICitiesRepository extends JpaRepository<City, UUID> {
    @NotNull List<City> findCityByCountyCountyId(UUID id);
    @NotNull City getCityByCityId(UUID id);
}
