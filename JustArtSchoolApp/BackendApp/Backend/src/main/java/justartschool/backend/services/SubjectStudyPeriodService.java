package justartschool.backend.services;

import justartschool.backend.dtos.SubjectDto;
import justartschool.backend.dtos.SubjectStudyPeriodDto;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodId;
import justartschool.backend.models.entities.StudyPeriod;
import justartschool.backend.models.entities.Subject;
import justartschool.backend.models.entities.SubjectStudyPeriod;
import justartschool.backend.repositories.IStudyPeriodRepository;
import justartschool.backend.repositories.ISubjectStudyPeriodRepository;
import justartschool.backend.repositories.ISubjectsRepository;
import justartschool.backend.utils.errors.BadRequestException;
import justartschool.backend.utils.errors.ExceptionProvider;
import justartschool.backend.utils.errors.NotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class SubjectStudyPeriodService {
    private final ExceptionProvider exceptionProvider;
    private final ModelMapper modelMapper;
    private final ISubjectStudyPeriodRepository subjectStudyPeriodRepository;
    private final ISubjectsRepository subjectsRepository;
    private final IStudyPeriodRepository studyPeriodRepository;

    public List<SubjectStudyPeriodDto> getAll() {
        List<SubjectStudyPeriod> subjectStudyPeriodList = subjectStudyPeriodRepository.findAll();
        return subjectStudyPeriodList.stream().map(SubjectStudyPeriodDto::new).toList();
    }

    public SubjectStudyPeriodDto getById(SubjectStudyPeriodId id) throws BadRequestException, NotFoundException {
        if (id == null || id.getStudyPeriodId() == null || id.getSubjectId() == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("SubjectStudyPeriodId is required.");

        SubjectStudyPeriod subjectStudyPeriod = subjectStudyPeriodRepository.findBySubjectStudyPeriodId(id);

        if (subjectStudyPeriod == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("SubjectStudyPeriod with this id doesn't exist.");

        return new SubjectStudyPeriodDto(subjectStudyPeriod);
    }

    @Transactional
    public void add(SubjectStudyPeriodDto subjectStudyPeriodDto) throws NotFoundException, BadRequestException {
        if (subjectStudyPeriodDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("SubjectStudyPeriodDto is required.");
        }

        SubjectStudyPeriod subjectStudyPeriod = modelMapper.map(subjectStudyPeriodDto, SubjectStudyPeriod.class);

        StudyPeriod studyPeriod = studyPeriodRepository.findByStudyPeriodId(subjectStudyPeriod.getSubjectStudyPeriodId().getStudyPeriodId());

        if (studyPeriod == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Study period with this id not found.");
        }

        Subject subject = subjectStudyPeriod.getSubject();
        subjectsRepository.save(subject);

        SubjectStudyPeriodId id = new SubjectStudyPeriodId();
        id.setStudyPeriodId(subjectStudyPeriod.getSubjectStudyPeriodId().getStudyPeriodId());
        id.setSubjectId(subject.getSubjectId());

        subjectStudyPeriod.setStudyPeriod(studyPeriod);
        subjectStudyPeriod.setSubject(subject);
        subjectStudyPeriod.setSubjectStudyPeriodId(id);
        subjectStudyPeriodRepository.save(subjectStudyPeriod);
    }

    @Transactional
    public void edit(SubjectStudyPeriodDto subjectStudyPeriodDto) throws NotFoundException, BadRequestException {
        if (subjectStudyPeriodDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("SubjectStudyPeriodDto is required.");
        }

        SubjectStudyPeriod subjectStudyPeriod = modelMapper.map(subjectStudyPeriodDto, SubjectStudyPeriod.class);

        StudyPeriod studyPeriod = studyPeriodRepository.findByStudyPeriodId(subjectStudyPeriod.getSubjectStudyPeriodId().getStudyPeriodId());

        if (studyPeriod == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Study period with this id not found.");
        }

        Subject subject = subjectsRepository.findSubjectBySubjectId(subjectStudyPeriod.getSubject().getSubjectId());

        if (subject == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Subject with this id not found.");
        }

        SubjectStudyPeriodId id = new SubjectStudyPeriodId();
        id.setStudyPeriodId(subjectStudyPeriod.getSubjectStudyPeriodId().getStudyPeriodId());
        id.setSubjectId(subject.getSubjectId());

        subjectStudyPeriod.setStudyPeriod(studyPeriod);
        subjectStudyPeriod.setSubject(subject);
        subjectStudyPeriod.setSubjectStudyPeriodId(id);
        subjectStudyPeriodRepository.save(subjectStudyPeriod);
    }

    public void delete(SubjectStudyPeriodId id) throws NotFoundException, BadRequestException {
        if (id == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("SubjectStudyPeriodId is required.");
        }
        SubjectStudyPeriod subjectStudyPeriod = subjectStudyPeriodRepository.findBySubjectStudyPeriodId(id);

        if (subjectStudyPeriod == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("SubjectStudyPeriod with this id not found.");
        }

        subjectStudyPeriodRepository.delete(subjectStudyPeriod);
        subjectsRepository.delete(subjectStudyPeriod.getSubject());
    }

    public List<SubjectDto> getSubjectsByStudyPeriodId(UUID studyPeriodId) {
        List<Subject> subjects = subjectStudyPeriodRepository.findSubjectsByStudyPeriodId(studyPeriodId);

        return subjects.stream().map(SubjectDto::new).toList();
    }
}
