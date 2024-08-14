package justartschool.backend.services;

import justartschool.backend.dtos.TeacherDto;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodCourseDetailsId;
import justartschool.backend.models.entities.Teacher;
import justartschool.backend.repositories.ITeacherCourseConfigurationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TeacherCourseConfigurationService {
    private final ITeacherCourseConfigurationRepository teacherCourseConfigurationRepository;


    public List<TeacherDto> getTeachersBySubjectStudyPeriodCourseDetailsId(SubjectStudyPeriodCourseDetailsId id) {
        List<Teacher> teachers  = teacherCourseConfigurationRepository.getTeachersBySubjectStudyPeriodCourseDetailsId(id);
        return teachers.stream().map(TeacherDto::new).toList();
    }
}
