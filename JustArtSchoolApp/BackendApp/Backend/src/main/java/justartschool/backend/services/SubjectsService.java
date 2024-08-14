package justartschool.backend.services;

import justartschool.backend.dtos.SubjectDto;
import justartschool.backend.models.entities.Subject;
import justartschool.backend.repositories.ISubjectsRepository;
import justartschool.backend.utils.errors.ExceptionProvider;
import justartschool.backend.utils.errors.NotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class SubjectsService {
    private final ExceptionProvider exceptionProvider;
    private final ModelMapper modelMapper;
    private final ISubjectsRepository ISubjectsRepository;

    public List<SubjectDto> getAll() {
        List<Subject> subjects = ISubjectsRepository.findAll();
        return subjects.stream().map(SubjectDto::new).toList();
    }

    public SubjectDto getById(UUID subjectId) throws NotFoundException {
        Subject subject = ISubjectsRepository.findSubjectBySubjectId(subjectId);

        if (subject == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Subject with this id doesn't exist.");
        }

        return new SubjectDto(subject);
    }

    public void add(SubjectDto subjectDto) {
        Subject subject = modelMapper.map(subjectDto, Subject.class);
        ISubjectsRepository.save(subject);
    }

    public void edit(SubjectDto subjectDto) {
        Subject subject = modelMapper.map(subjectDto, Subject.class);
        ISubjectsRepository.save(subject);
    }

    public void delete(UUID subjectId) throws NotFoundException {
        Subject subject = ISubjectsRepository.findSubjectBySubjectId(subjectId);

        if (subject == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Subject with this id doesn't exist.");

        ISubjectsRepository.delete(subject);
    }
}
