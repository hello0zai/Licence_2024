package justartschool.backend.services;

import justartschool.backend.dtos.SubjectStudyPeriodCourseDetailsDto;
import justartschool.backend.dtos.SubjectStudyPeriodDto;
import justartschool.backend.dtos.TeacherDto;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodCourseDetailsId;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodId;
import justartschool.backend.models.compositePrimaryKeys.TeacherCourseConfigurationId;
import justartschool.backend.models.entities.*;
import justartschool.backend.repositories.*;
import justartschool.backend.utils.errors.BadRequestException;
import justartschool.backend.utils.errors.ExceptionProvider;
import justartschool.backend.utils.errors.NotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class SubjectStudyPeriodCourseDetailsService {
    private final ExceptionProvider exceptionProvider;
    private final ModelMapper modelMapper;
    private final ISubjectStudyPeriodCourseDetailsRepository subjectStudyPeriodCourseDetailsRepository;

    private final ISubjectStudyPeriodRepository subjectStudyPeriodRepository;

    private final ICoursesRepository coursesRepository;

    private final ITeachersRepository teachersRepository;

    private final ITeacherCourseConfigurationRepository teacherCourseConfigurationRepository;

    public List<SubjectStudyPeriodCourseDetailsDto> getAll() throws NotFoundException {
        List<SubjectStudyPeriodCourseDetails> list = subjectStudyPeriodCourseDetailsRepository.findAll();
        if (list.size() == 0) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("SubjectStudyPeriodCourseDetails not found.");
        }
        return list.stream().map(SubjectStudyPeriodCourseDetailsDto::new).toList();
    }

    public SubjectStudyPeriodCourseDetailsDto getById(SubjectStudyPeriodCourseDetailsId id) throws NotFoundException {
        SubjectStudyPeriodCourseDetails result = subjectStudyPeriodCourseDetailsRepository.findSubjectStudyPeriodCourseDetailsBySubjectStudyPeriodCourseDetailsId(id);
        if (result == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("SubjectStudyPeriodCourseDetails with this id not found.");
        }
        return new SubjectStudyPeriodCourseDetailsDto(result);
    }

    @Transactional
    public void add(SubjectStudyPeriodCourseDetailsDto subjectStudyPeriodCourseDetailsDto) throws NotFoundException, BadRequestException {
        UUID courseId = subjectStudyPeriodCourseDetailsDto.getCourseId();

        SubjectStudyPeriodId subjectStudyPeriodId = subjectStudyPeriodCourseDetailsDto.getSubjectStudyPeriodId();

        Integer studyYearId = subjectStudyPeriodCourseDetailsDto.getStudyYear();

        Course course = coursesRepository.findCourseByCourseId(courseId);


        if (course == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Course with this id doesn't exist.");
        }

        SubjectStudyPeriod subjectStudyPeriod = subjectStudyPeriodRepository.findBySubjectStudyPeriodId(subjectStudyPeriodId);

        if (subjectStudyPeriod == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("SubjectStudyPeriod with this id doesn't exist.");
        }

        if (studyYearId > subjectStudyPeriod.getDurationPeriod()) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("StudyYearId is incorrect for this subjectStudyPeriod.");
        }

        SubjectStudyPeriodCourseDetails subjectStudyPeriodCourseDetails = modelMapper.map(subjectStudyPeriodCourseDetailsDto, SubjectStudyPeriodCourseDetails.class);

        List<Teacher> teachers = new ArrayList<>();

        SubjectStudyPeriodCourseDetailsId id = SubjectStudyPeriodCourseDetailsId.builder()
                .courseId(course.getCourseId())
                .studyPeriodId(subjectStudyPeriod.getSubjectStudyPeriodId().getStudyPeriodId())
                .subjectId(subjectStudyPeriod.getSubjectStudyPeriodId().getSubjectId())
                .studyYearId(studyYearId)
                .build();

        subjectStudyPeriodCourseDetails.setSubjectStudyPeriodCourseDetailsId(id);
        subjectStudyPeriodCourseDetails.setCourse(course);
        subjectStudyPeriodCourseDetails.setSubjectStudyPeriod(subjectStudyPeriod);

        subjectStudyPeriodCourseDetailsRepository.save(subjectStudyPeriodCourseDetails);


        for (UUID teacherId : subjectStudyPeriodCourseDetailsDto.getTeacherIds()) {
            Teacher teacher = teachersRepository.findByUserUserId(teacherId);
            if (teacher == null) {
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                throw exceptionProvider.BAD_REQUEST_EXCEPTION("Teacher with this id doesn't exist.");
            }

            TeacherCourseConfigurationId teacherCourseConfigurationId = TeacherCourseConfigurationId.builder()
                    .courseId(subjectStudyPeriodCourseDetails.getSubjectStudyPeriodCourseDetailsId().getCourseId())
                    .subjectId(subjectStudyPeriodCourseDetails.getSubjectStudyPeriodCourseDetailsId().getSubjectId())
                    .studyPeriodId(subjectStudyPeriodCourseDetails.getSubjectStudyPeriodCourseDetailsId().getStudyPeriodId())
                    .studyYearId(studyYearId)
                    .teacherId(teacher.getUserId())
                    .build();

            TeacherCourseConfiguration teacherCourseConfiguration = TeacherCourseConfiguration.builder()
                    .teacherCourseConfigurationId(teacherCourseConfigurationId)
                    .teacher(teacher)
                    .subjectStudyPeriodCourseDetails(subjectStudyPeriodCourseDetails)
                    .build();

            teacherCourseConfigurationRepository.save(teacherCourseConfiguration);
        }
    }

    @Transactional
    public void edit(SubjectStudyPeriodCourseDetailsDto subjectStudyPeriodCourseDetailsDto) throws NotFoundException, BadRequestException {

        SubjectStudyPeriodCourseDetailsId id = subjectStudyPeriodCourseDetailsDto.getSubjectStudyPeriodCourseDetailsId();
        SubjectStudyPeriodCourseDetails entity = subjectStudyPeriodCourseDetailsRepository.findSubjectStudyPeriodCourseDetailsBySubjectStudyPeriodCourseDetailsId(id);

        if (entity == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("SubjectStudyPeriodCourseDetails with this id doesn't exist.");
        }

        add(subjectStudyPeriodCourseDetailsDto);
    }

    public void delete(SubjectStudyPeriodCourseDetailsId id) throws NotFoundException {

        SubjectStudyPeriodCourseDetails entity = subjectStudyPeriodCourseDetailsRepository.findSubjectStudyPeriodCourseDetailsBySubjectStudyPeriodCourseDetailsId(id);

        if (entity == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("SubjectStudyPeriodCourseDetails with this id doesn't exist.");
        }

        subjectStudyPeriodCourseDetailsRepository.delete(entity);
    }
}
