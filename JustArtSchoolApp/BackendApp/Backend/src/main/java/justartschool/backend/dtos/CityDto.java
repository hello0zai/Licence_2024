package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.entities.City;
import lombok.*;

import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CityDto {
    @Nullable
    private UUID cityId;
    @NonNull
    private String cityName;
    @NonNull
    private UUID countyId;
    @Nullable
    private CountyDto countyDto = new CountyDto();

    public CityDto(City city) {
        this.cityId = city.getCityId();
        this.cityName = city.getCityName();
        this.countyId = city.getCounty().getCountyId();
        this.countyDto = new CountyDto(city.getCounty());
    }
}