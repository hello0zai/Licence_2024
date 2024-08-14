package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CityLocationDto {
    @NotNull
    private String cityName;
    @Nullable
    private CountyLocationDto countyLocationDto;
}