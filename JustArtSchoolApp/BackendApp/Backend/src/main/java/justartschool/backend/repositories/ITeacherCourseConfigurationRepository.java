package justartschool.backend.repositories;

import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodCourseDetailsId;
import justartschool.backend.models.compositePrimaryKeys.TeacherCourseConfigurationId;
import justartschool.backend.models.entities.Teacher;
import justartschool.backend.models.entities.TeacherCourseConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITeacherCourseConfigurationRepository extends JpaRepository<TeacherCourseConfiguration, TeacherCourseConfigurationId> {
    @Modifying
    @Query("SELECT t FROM TeacherCourseConfiguration tcc, Teacher t " +
            "WHERE tcc.subjectStudyPeriodCourseDetails.subjectStudyPeriodCourseDetailsId = :subjectStudyPeriodCourseDetailsId " +
            "AND t.userId = tcc.teacherCourseConfigurationId.teacherId")
    List<Teacher> getTeachersBySubjectStudyPeriodCourseDetailsId(@Param("subjectStudyPeriodCourseDetailsId") SubjectStudyPeriodCourseDetailsId subjectStudyPeriodCourseDetailsId);
}
