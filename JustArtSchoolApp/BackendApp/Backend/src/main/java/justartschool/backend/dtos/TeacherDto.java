package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.entities.Teacher;
import lombok.*;

import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TeacherDto {
    @Nullable
    private UUID userId;
    @NonNull
    private String lastName;
    @NonNull
    private String firstName;
    @NonNull
    private String fullName;
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


    public TeacherDto(Teacher teacher) {
        this.userId = teacher.getUserId();
        this.lastName = teacher.getLastName();
        this.firstName = teacher.getFirstName();
        this.fullName = this.firstName + ' ' + this.lastName;
        this.personalEmail = teacher.getPersonalEmail();
        this.fullAddress = teacher.getFullAddress();
        this.cnp = teacher.getCnp();
        this.phoneNumber = teacher.getPhoneNumber();
        this.cityId = teacher.getCity().getCityId();
        this.countyId = teacher.getCity().getCounty().getCountyId();
        this.cityDto = new CityDto(teacher.getCity());
        this.userAccount = new UserAccount(teacher.getUser());
    }
}