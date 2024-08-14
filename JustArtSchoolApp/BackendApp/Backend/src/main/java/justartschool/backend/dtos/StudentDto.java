package justartschool.backend.dtos;

import jakarta.annotation.Nullable;
import justartschool.backend.models.entities.Student;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDto {
    @Nullable
    private UUID userId;
    @NonNull
    private String lastName;
    @NonNull
    private String firstName;
    @NonNull
    private String personalEmail;
    @NonNull
    private String phoneNumber;
    @NonNull
    private String cnp;
    @NonNull
    private String fullAddress;
    @NonNull
    private String occupation;
    @NonNull
    private String studies;
    @NonNull
    private UUID cityId;
    @NonNull
    private UUID countyId;
    @Nullable
    private CityDto cityDto = new CityDto();
    @Nullable
    private UserAccount userAccount = new UserAccount();

    private List<StudentRegistrationDocumentDto> studentRegistrationDocumentList = new ArrayList<>();

    private List<StudentSubjectStudyPeriodDetailsDto> studentSubjectStudyPeriodDetailsDtoList = new ArrayList<>();

    private List<StudentSubjectCourseGradeDto> studentSubjectCourseGradeDtoList = new ArrayList<>();

    public StudentDto(Student student) {
        this.userId = student.getUserId();
        this.lastName = student.getLastName();
        this.firstName = student.getFirstName();
        this.cnp = student.getCnp();
        this.fullAddress = student.getFullAddress();
        this.occupation = student.getOccupation();
        this.studies = student.getStudies();
        this.personalEmail = student.getPersonalEmail();
        this.phoneNumber = student.getPhoneNumber();
        this.cityId = student.getCity().getCityId();
        this.countyId = student.getCity().getCounty().getCountyId();
        this.cityDto = new CityDto(student.getCity());
        this.userAccount = new UserAccount(student.getUser());
        this.studentRegistrationDocumentList = student.getStudentRegistrationDocumentList().stream().map(StudentRegistrationDocumentDto::new).toList();
        this.studentSubjectStudyPeriodDetailsDtoList = student.getStudentSubjectStudyPeriodDetailsList().stream().map(StudentSubjectStudyPeriodDetailsDto::new).toList();
        this.studentSubjectCourseGradeDtoList = student.getStudentSubjectCourseGradeList().stream().map(StudentSubjectCourseGradeDto::new).toList();
    }
}