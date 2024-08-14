package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.entities.City;
import justartschool.backend.models.entities.County;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CountyDto {
    @Nullable
    private UUID countyId;
    @NonNull
    private String countyName;
    @NonNull
    private UUID countryId;
    @NonNull
    private CountryDto countryDto = new CountryDto();
    @NonNull
    private List<UUID> cityIds = new ArrayList<>();

    public CountyDto(County county) {
        this.countyId = county.getCountyId();
        this.countyName = county.getCountyName();
        this.countryId = county.getCountry().getCountryId();
        this.countryDto = new CountryDto(county.getCountry());
        for (City city : county.getCities()) {
            cityIds.add(city.getCityId());
        }
    }
}