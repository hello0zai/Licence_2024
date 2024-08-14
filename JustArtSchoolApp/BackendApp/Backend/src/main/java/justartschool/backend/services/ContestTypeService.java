package justartschool.backend.services;

import justartschool.backend.dtos.ContestTypeDto;
import justartschool.backend.models.entities.ContestType;
import justartschool.backend.repositories.IContestTypeRepository;
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
public class ContestTypeService {
    private final IContestTypeRepository repository;
    private final ExceptionProvider exceptionProvider;
    private final ModelMapper modelMapper;

    public List<ContestTypeDto> getAll() throws NotFoundException {
        List<ContestType> contestTypes = repository.findAll();

        if (contestTypes.size() == 0) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Contest types not found");
        }
        return contestTypes.stream().map(ContestTypeDto::new).toList();
    }

    public ContestTypeDto getById(UUID id) throws BadRequestException, NotFoundException {
        if (id == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("Id is required.");

        ContestType contestType = repository.findContestTypeByContestTypeId(id);

        if (contestType == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("ContestType with this id not found.");

        return modelMapper.map(contestType, ContestTypeDto.class);
    }

    public ContestTypeDto getByTypeName(String typeName) throws NotFoundException, BadRequestException {
        if(typeName == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("Contest type name is required.");
        }

        ContestType contestType = repository.findContestTypeByContestTypeName(typeName);

        if(contestType == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Contest type by this name not found.");
        }

        return new ContestTypeDto(contestType);
    }

    public void add(ContestTypeDto contestTypeDto) throws BadRequestException {
        if (contestTypeDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("ContestTypeDto is required.");
        }

        ContestType contest = modelMapper.map(contestTypeDto, ContestType.class);
        repository.save(contest);
    }

    public void edit(ContestTypeDto contestTypeDto) throws NotFoundException, BadRequestException {
        if (contestTypeDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("ContestTypeDto is required.");
        }

        UUID id = contestTypeDto.getContestTypeId();

        ContestType contest = repository.findContestTypeByContestTypeId(id);

        if (contest == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("ContestType with this id not found.");
        }

        contest = modelMapper.map(contestTypeDto, ContestType.class);
        repository.save(contest);
    }

    public void delete(UUID id) throws NotFoundException, BadRequestException {
        if (id == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("ContestTypeId is required.");
        }

        ContestType contestType = repository.findContestTypeByContestTypeId(id);

        if (contestType == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("ContestType with this id not found.");
        }

        repository.delete(contestType);
    }
}
