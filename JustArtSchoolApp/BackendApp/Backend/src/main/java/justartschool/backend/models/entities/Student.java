package justartschool.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.*;


@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "student")
public class Student {
    @Id
    private UUID userId;
    @Column
    private String lastName;
    @Column
    private String firstName;

    @Column
    private String phoneNumber;
    @Column
    private String personalEmail;
    @Column
    private String cnp;
    @Column
    private String fullAddress;
    @Column
    private String occupation;
    @Column
    private String studies;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "cityId", nullable = true)
    private City city;

    @OneToOne
    @MapsId
    @JoinColumn(name = "userId")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "student",cascade = {CascadeType.ALL})
    private List<StudentSubjectStudyPeriodDetails> studentSubjectStudyPeriodDetailsList = new ArrayList<StudentSubjectStudyPeriodDetails>();

    @JsonIgnore
    @OneToMany(mappedBy = "student", cascade = {CascadeType.ALL})
    List<StudentRegistrationDocument> studentRegistrationDocumentList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "student",cascade = {CascadeType.ALL})
    private List<StudentSubjectCourseGrade> studentSubjectCourseGradeList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "student",cascade = {CascadeType.ALL})
    private List<AdmissionContestTask> admissionContestTaskList = new ArrayList<>();
}
