package justartschool.backend.repositories;

import jakarta.validation.constraints.Null;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodCourseDetailsId;
import justartschool.backend.models.entities.SubjectStudyPeriodCourseDetails;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISubjectStudyPeriodCourseDetailsRepository extends JpaRepository<SubjectStudyPeriodCourseDetails, SubjectStudyPeriodCourseDetailsId> {
    @NotNull List<SubjectStudyPeriodCourseDetails> findAll();
    @Nullable SubjectStudyPeriodCourseDetails findSubjectStudyPeriodCourseDetailsBySubjectStudyPeriodCourseDetailsId(SubjectStudyPeriodCourseDetailsId id);
}