package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.entities.Country;
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
public class CountryDto {
    @Nullable
    private UUID countryId;
    @NonNull
    private String countryName;
    @NonNull
    private String phoneCode;
    @NonNull
    private String countrySymbol;
    @Nullable
    private List<UUID> countyIds = new ArrayList<>();

    public CountryDto(Country country) {
        this.countryId = country.getCountryId();
        this.countryName = country.getCountryName();
        this.phoneCode = country.getPhoneCode();
        this.countrySymbol = country.getCountrySymbol();

        for (County county : country.getCounties()) {
            countyIds.add(county.getCountyId());
        }
    }
}
