package justartschool.backend.services;

import justartschool.backend.dtos.StageDto;
import justartschool.backend.models.entities.Stage;
import justartschool.backend.repositories.IStageRepository;
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
public class StageService {
    private IStageRepository repository;
    private final ExceptionProvider exceptionProvider;
    private final ModelMapper modelMapper;

    public List<StageDto> getAll() throws NotFoundException {
        List<Stage> stages = repository.findAll();

        if (stages.size() == 0) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Stages not found");
        }
        return stages.stream().map(StageDto::new).toList();
    }

    public StageDto getById(UUID id) throws BadRequestException, NotFoundException {
        if (id == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("Id is required.");

        Stage stage = repository.findStageByStageId(id);

        if (stage == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Stage with this id not found.");

        return modelMapper.map(stage, StageDto.class);
    }

    public void add(StageDto stageDto) throws BadRequestException {
        if (stageDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("StageDto is required.");
        }

        Stage stage = modelMapper.map(stageDto, Stage.class);
        repository.save(stage);
    }

    public void edit(StageDto stageDto) throws NotFoundException, BadRequestException {
        if (stageDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("StageDto is required.");
        }

        UUID id = stageDto.getStageId();

        Stage stage = repository.findStageByStageId(id);

        if (stage == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Stage with this id not found.");
        }

        stage = modelMapper.map(stageDto, Stage.class);
        repository.save(stage);
    }

    public void delete(UUID id) throws NotFoundException, BadRequestException {
        if (id == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("StageId is required.");
        }

        Stage stage = repository.findStageByStageId(id);

        if (stage == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Stage with this id not found.");
        }

        repository.delete(stage);
    }

    public StageDto getByStageName(String stageName) throws BadRequestException, NotFoundException {
        if (stageName == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("StageName is required.");

        Stage stage = repository.findStageByStageName(stageName);

        if (stage == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Stage with this name not found.");

        return modelMapper.map(stage, StageDto.class);
    }
}