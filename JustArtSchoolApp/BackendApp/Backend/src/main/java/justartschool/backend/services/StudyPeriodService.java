package justartschool.backend.services;

import justartschool.backend.dtos.StudyPeriodDto;
import justartschool.backend.models.entities.StudyPeriod;
import justartschool.backend.repositories.IStudyPeriodRepository;
import justartschool.backend.utils.errors.BadRequestException;
import justartschool.backend.utils.errors.ExceptionProvider;
import justartschool.backend.utils.errors.NotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class StudyPeriodService {
    private final ExceptionProvider exceptionProvider;
    private final ModelMapper modelMapper;
    private final IStudyPeriodRepository studyPeriodRepository;

    public List<StudyPeriodDto> getAll() {
        List<StudyPeriod> studyPeriods = studyPeriodRepository.findAll();
        return studyPeriods.stream().map(StudyPeriodDto::new).toList();
    }

    public StudyPeriodDto getById(UUID id) throws BadRequestException, NotFoundException {
        if (id == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("Id is required.");

        StudyPeriod studyPeriod = studyPeriodRepository.findByStudyPeriodId(id);

        if (studyPeriod == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Study period with this id doesn't exist.");

        return new StudyPeriodDto(studyPeriod);
    }

    public void add(StudyPeriodDto studyPeriodDto) {
        StudyPeriod studyPeriod = modelMapper.map(studyPeriodDto, StudyPeriod.class);
        studyPeriodRepository.save(studyPeriod);
    }

    public void edit(StudyPeriodDto studyPeriodDto) {
        StudyPeriod studyPeriod = modelMapper.map(studyPeriodDto, StudyPeriod.class);
        studyPeriodRepository.save(studyPeriod);
    }

    public void delete(UUID id) throws NotFoundException {
        StudyPeriod studyPeriod = studyPeriodRepository.findByStudyPeriodId(id);

        if (studyPeriod == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Study period with this id doesn't exist.");

        studyPeriodRepository.delete(studyPeriod);
    }
}
