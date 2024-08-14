package justartschool.backend.controllers;

import justartschool.backend.dtos.ContestDto;
import justartschool.backend.dtos.ContestTypeStageDto;
import justartschool.backend.models.compositePrimaryKeys.ContestTypeStageId;
import justartschool.backend.services.ContestTypeStageService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/contestStages")
public class ContestTypeStageController {
    private final ContestTypeStageService service;

    @Autowired
    public ContestTypeStageController(ContestTypeStageService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<ContestTypeStageDto>>> getAll() {
        List<ContestTypeStageDto> result;
        try {
            result = service.getAll();
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getAllByContestId/id={id}")
    public ResponseEntity<ApiResponse<List<ContestTypeStageDto>>> getAllByContestId(@PathVariable("id") UUID id) {
        List<ContestTypeStageDto> result;
        try {
            result = service.getAllByContestId(id);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getById")
    public ResponseEntity<ApiResponse<ContestTypeStageDto>> getById(@RequestParam("contestId") UUID contestId,
                                                                    @RequestParam("stageId") UUID stageId,
                                                                    @RequestParam("typeId") UUID typeId) {
        try {
            ContestTypeStageId id = ContestTypeStageId.builder()
                    .contestId(contestId)
                    .stageId(stageId)
                    .typeId(typeId)
                    .build();
            ContestTypeStageDto result = service.getById(id);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add/multiple")
    public ResponseEntity<ApiResponse<String>> add(@RequestBody List<ContestTypeStageDto> contestTypeDto) {
        try {
            service.add(contestTypeDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<String>> add(@RequestBody ContestTypeStageDto contestTypeDto) {
        try {
            service.add(contestTypeDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/edit")
    public ResponseEntity<ApiResponse<String>> edit(@RequestBody ContestTypeStageDto contestTypeDto) {
        try {
            service.edit(contestTypeDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse<String>> delete(@RequestParam("contestId") UUID contestId,
                                                      @RequestParam("stageId") UUID stageId,
                                                      @RequestParam("typeId") UUID typeId) {
        try {
            ContestTypeStageId id = ContestTypeStageId.builder()
                    .contestId(contestId)
                    .stageId(stageId)
                    .typeId(typeId)
                    .build();

            service.delete(id);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }
}