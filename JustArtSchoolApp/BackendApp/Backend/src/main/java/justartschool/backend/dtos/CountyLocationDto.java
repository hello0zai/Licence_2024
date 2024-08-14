package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import justartschool.backend.dtos.CityLocationDto;
import justartschool.backend.dtos.CountryLocationDto;
import lombok.*;

import java.util.List;
import java.util.Set;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CountyLocationDto {
    @NonNull
    private String countyName;
    @Nullable
    private CountryLocationDto countryLocationDto;
    @NonNull
    private List<CityLocationDto> cityLocationDtoList;
}
