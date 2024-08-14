package justartschool.backend.repositories;

import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodId;
import justartschool.backend.models.entities.Subject;
import justartschool.backend.models.entities.SubjectStudyPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ISubjectStudyPeriodRepository extends JpaRepository<SubjectStudyPeriod, SubjectStudyPeriodId> {
    SubjectStudyPeriod findBySubjectStudyPeriodId(SubjectStudyPeriodId id);

    @Query("SELECT subject FROM SubjectStudyPeriod ssp, Subject subject " +
            "WHERE ssp.subjectStudyPeriodId.studyPeriodId = :studyPeriodId " +
            "AND ssp.subjectStudyPeriodId.subjectId = subject.subjectId")
    List<Subject> findSubjectsByStudyPeriodId(@Param("studyPeriodId") UUID studyPeriodId);
}
