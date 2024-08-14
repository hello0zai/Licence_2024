package justartschool.backend.services;

import justartschool.backend.dtos.ContestDto;
import justartschool.backend.dtos.ContestTypeStageDto;
import justartschool.backend.models.compositePrimaryKeys.ContestTypeStageId;
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

import java.util.*;

@Service
@AllArgsConstructor
public class ContestTypeStageService {
    private IContestTypeStageRepository contestTypeStageRepository;

    private IContestRepository contestRepository;

    private IContestTypeRepository contestTypeRepository;

    private IStageRepository stageRepository;

    private IRolesRepository roleRepository;

    private final ExceptionProvider exceptionProvider;

    private final ModelMapper modelMapper;

    public List<ContestTypeStageDto> getAll() throws NotFoundException {
        List<ContestTypeStage> resultList = contestTypeStageRepository.findAll();

        if (resultList.size() == 0) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("ContestTypeStages not found");
        }
        return resultList.stream().map(ContestTypeStageDto::new).toList();
    }

    public List<ContestTypeStageDto> getAllByContestId(UUID id) {
        List<ContestTypeStage> resultList = contestTypeStageRepository.findContestTypeStagesByContestContestId(id);
        return  resultList.stream().map(ContestTypeStageDto::new).toList();
    }

    public ContestTypeStageDto getById(ContestTypeStageId id) throws BadRequestException, NotFoundException {
        if (id == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("Id is required.");

        ContestTypeStage result = contestTypeStageRepository.findContestTypeStageByContestTypeStageId(id);

        if (result == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("ContestTypeStage with this id not found.");

        return modelMapper.map(result, ContestTypeStageDto.class);
    }

    @Transactional
    public void add(List<ContestTypeStageDto> contestTypeStageDtoList) throws Exception {
        try {
            for (ContestTypeStageDto cts : contestTypeStageDtoList) {
                add(cts);
            }
        } catch (Exception ex) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            throw ex;
        }
    }

    @Transactional
    public void add(ContestTypeStageDto contestTypeStageDto) throws Exception {
        if (contestTypeStageDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("ContestTypeStageDto is required.");
        }

        ContestDto contestDto = contestTypeStageDto.getContestDto();
        Contest contest =  modelMapper.map(contestDto, Contest.class);
        contest = contestRepository.save(contest);

        ContestTypeStage contestTypeStage = modelMapper.map(contestTypeStageDto, ContestTypeStage.class);

//        Contest contest = contestRepository.findContestByContestId(contestTypeStageDto.getStageId());
        ContestType contestType = contestTypeRepository.findContestTypeByContestTypeId(contestTypeStageDto.getStageId());
        Stage stage = stageRepository.findStageByStageId(contestTypeStageDto.getStageId());
        Role role = roleRepository.getRoleByRoleId(contestTypeStageDto.getRoleId());

        if (contestType == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("ContestType with this id not found.");
        }

        if (stage == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Stage with this id not found.");
        }

        ContestTypeStageId id = ContestTypeStageId.builder()
                .contestId(contest.getContestId())
                .stageId(stage.getStageId())
                .typeId(contestType.getContestTypeId())
                .build();

        contestTypeStage.setContestTypeStageId(id);
        contestTypeStage.setContest(contest);
        contestTypeStage.setContestType(contestType);
        contestTypeStage.setStage(stage);
        contestTypeStage.setRole(role);
        contestTypeStageRepository.save(contestTypeStage);
    }

    public void edit(ContestTypeStageDto contestTypeStageDto) throws NotFoundException, BadRequestException {
        if (contestTypeStageDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("ContestTypeStageDto is required.");
        }

        ContestTypeStageId id = contestTypeStageDto.getContestTypeStageId();

        ContestTypeStage contestTypeStage = contestTypeStageRepository.findContestTypeStageByContestTypeStageId(id);

        if (contestTypeStage == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("ContestTypeStage with this id not found.");
        }

        contestTypeStage = modelMapper.map(contestTypeStageDto, ContestTypeStage.class);

        Contest contest = contestRepository.findContestByContestId(contestTypeStageDto.getStageId());
        ContestType contestType = contestTypeRepository.findContestTypeByContestTypeId(contestTypeStageDto.getStageId());
        Stage stage = stageRepository.findStageByStageId(contestTypeStageDto.getStageId());
        Role role = roleRepository.getRoleByRoleId(contestTypeStageDto.getRoleId());

        if (contest == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Contest with this id not found.");
        }

        if (contestType == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("ContestType with this id not found.");
        }

        if (stage == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Stage with this id not found.");
        }

        id = ContestTypeStageId.builder()
                .contestId(contest.getContestId())
                .stageId(stage.getStageId())
                .typeId(contestType.getContestTypeId())
                .build();

        contestTypeStage.setContestTypeStageId(id);
        contestTypeStage.setContest(contest);
        contestTypeStage.setContestType(contestType);
        contestTypeStage.setStage(stage);
        contestTypeStage.setRole(role);

        contestTypeStageRepository.save(contestTypeStage);
    }

    public void delete(ContestTypeStageId id) throws NotFoundException, BadRequestException {
        if (id == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("ContestTypeStageId is required.");
        }

        ContestTypeStage result = contestTypeStageRepository.findContestTypeStageByContestTypeStageId(id);

        if (result == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("ContestTypeStage with this id not found.");
        }

        contestTypeStageRepository.delete(result);
    }
}