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
@Table(name = "teacher")
public class Teacher {
    @Id
    private UUID userId;
    @Column
    private String lastName;
    @Column
    private String firstName;
    @Column
    private String personalEmail;
    @Column
    private String fullAddress;
    @Column
    private String cnp;
    @Column
    private String phoneNumber;

    @ManyToOne()
    @JoinColumn(name = "cityId",  nullable = true)
    City city;

    @OneToOne
    @MapsId
    @JoinColumn(name = "userId")
    private User user;

    @JsonIgnore
    @OneToMany(mappedBy = "teacher",cascade = {CascadeType.ALL})
    private List<TeacherCourseConfiguration> teacherCourseConfigurationList = new ArrayList<TeacherCourseConfiguration>();

    @JsonIgnore
    @OneToMany(mappedBy = "teacher",cascade = {CascadeType.ALL})
    private List<StudentSubjectCourseGrade> studentSubjectCourseGradeList = new ArrayList<StudentSubjectCourseGrade>();
}
