package justartschool.backend.services;

import justartschool.backend.dtos.*;
import justartschool.backend.models.compositePrimaryKeys.ContestTypeStageId;
import justartschool.backend.models.entities.*;
import justartschool.backend.repositories.*;
import justartschool.backend.utils.errors.*;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ContestService {
    private final IContestRepository contestRepository;
    private final IContestTypeRepository contestTypeRepository;
    private final IStageRepository stageRepository;
    private final IRolesRepository roleRepository;
    private final IContestTypeStageRepository contestTypeStageRepository;
    private final ExceptionProvider exceptionProvider;
    private final ModelMapper modelMapper;

    public List<ContestDto> getAll() throws NotFoundException {
        List<Contest> contests = contestRepository.findAll();

        if (contests.size() == 0) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Contests not found");
        }
        return contests.stream().map(ContestDto::new).toList();
    }

    public ContestDto getById(UUID id) throws BadRequestException, NotFoundException {
        if (id == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("Id is required.");

        Contest contest = contestRepository.findContestByContestId(id);

        if (contest == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Contest with this id not found.");

        return new ContestDto(contest);
    }

    @Transactional
    public void add(ContestDto contestDto) throws BadRequestException, NotFoundException {
        if (contestDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("ContestDto is required.");
        }

        Contest contest = modelMapper.map(contestDto, Contest.class);
        contest = contestRepository.save(contest);

        for (ContestTypeStageDto ctsDto : contestDto.getContestTypeStageDtoList()) {
            ContestType contestType = contestTypeRepository.findContestTypeByContestTypeId(ctsDto.getContestTypeId());

            if (contestType == null) {
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                throw exceptionProvider.NOT_FOUND_EXCEPTION("ContestType with this id doesn't exist.");
            }

            Stage stage = stageRepository.findStageByStageName(ctsDto.getStageDto().getStageName());

            if (stage == null) {
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                throw exceptionProvider.NOT_FOUND_EXCEPTION("Stage with this id doesn't exist.");
            }

            Role role = roleRepository.getRoleByName(ctsDto.getRoleDto().getName());

            if (role == null) {
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                throw exceptionProvider.NOT_FOUND_EXCEPTION("Role with this id doesn't exist.");
            }

            ContestTypeStage contestTypeStage = modelMapper.map(ctsDto, ContestTypeStage.class);

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
    }

    @Transactional
    public void edit(ContestDto contestDto) throws NotFoundException, BadRequestException {
        if (contestDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("ContestDto is required.");
        }

        Contest contest = contestRepository.findContestByContestId(contestDto.getContestId());

        if (contest == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Contest with this id doesn't exist.");
        }

        contest = modelMapper.map(contestDto, Contest.class);
        contestRepository.save(contest);

        for (ContestTypeStageDto ctsDto : contestDto.getContestTypeStageDtoList()) {
            ContestTypeStageId contestTypeStageId = ctsDto.getContestTypeStageId();
            ContestTypeStage cts = contestTypeStageRepository.findContestTypeStageByContestTypeStageId(contestTypeStageId);

            if(cts == null) {
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                throw exceptionProvider.NOT_FOUND_EXCEPTION("Contest Type Stage with this id doesn't exist.");
            }

            ContestTypeStage contestTypeStage =  modelMapper.map(ctsDto, ContestTypeStage.class);

            Role role = roleRepository.getRoleByRoleId(ctsDto.getRoleId());

            if (role == null) {
                TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
                throw exceptionProvider.NOT_FOUND_EXCEPTION("Role with this id doesn't exist.");
            }

            contestTypeStage.setContestTypeStageId(cts.getContestTypeStageId());
            contestTypeStage.setContest(cts.getContest());
            contestTypeStage.setContestType(cts.getContestType());
            contestTypeStage.setStage(cts.getStage());
            contestTypeStage.setRole(role);

            contestTypeStageRepository.save(contestTypeStage);
        }
    }

    @Transactional
    public void delete(UUID id) throws NotFoundException, BadRequestException {
        if (id == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("Id is required.");
        }

        Contest contest = contestRepository.findContestByContestId(id);

        if (contest == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Contest with this id doesn't exist.");
        }

        contestTypeStageRepository.deleteAll(contest.getContestTypeStageList());
        contestRepository.delete(contest);
    }
}
