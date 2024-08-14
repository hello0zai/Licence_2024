package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
import java.util.Set;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CountryLocationDto {
    @NonNull
    private String countryName;
    @NonNull
    private String phoneCode;
    @NonNull
    private String countrySymbol;
    @Nullable
    private List<CountyLocationDto> countyLocationDtoList;
}