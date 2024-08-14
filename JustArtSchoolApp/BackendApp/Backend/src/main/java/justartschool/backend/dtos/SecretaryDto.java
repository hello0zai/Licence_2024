package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.entities.Secretary;
import lombok.*;
import net.bytebuddy.implementation.bind.annotation.Empty;

import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SecretaryDto {
    @Nullable
    private UUID userId;
    @NonNull
    private String lastName;
    @NonNull
    private String firstName;
    @NonNull
    private String personalEmail;
    @NonNull
    private String fullAddress;
    @NonNull
    private String cnp;
    @NonNull
    private String phoneNumber;
    @NonNull
    private UUID cityId;
    @NonNull
    private UUID countyId;
    @Nullable
    private CityDto cityDto = new CityDto();
    @Nullable
    private UserAccount userAccount = new UserAccount();

    public SecretaryDto(Secretary secretary) {
        this.userId = secretary.getUserId();
        this.lastName = secretary.getLastName();
        this.firstName = secretary.getFirstName();
        this.personalEmail = secretary.getPersonalEmail();
        this.fullAddress = secretary.getFullAddress();
        this.cnp = secretary.getCnp();
        this.phoneNumber = secretary.getPhoneNumber();
        this.cityId = secretary.getCity().getCityId();
        this.countyId = secretary.getCity().getCounty().getCountyId();
        this.cityDto = new CityDto(secretary.getCity());
        this.userAccount = new UserAccount(secretary.getUser());
    }
}