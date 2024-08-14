package justartschool.backend.controllers;

import justartschool.backend.dtos.SubjectDto;
import justartschool.backend.dtos.SubjectStudyPeriodDto;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodId;
import justartschool.backend.services.SubjectStudyPeriodService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/subjectStudyPeriods")
public class SubjectStudyPeriodController {
    private final SubjectStudyPeriodService service;

    @Autowired
    public SubjectStudyPeriodController(SubjectStudyPeriodService service) {
        this.service = service;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_SECRETARY', 'ROLE_STUDENT')")
    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<SubjectStudyPeriodDto>>> getAll() {
        List<SubjectStudyPeriodDto> result = service.getAll();
        return ResponseUtil.createSuccessResponse(result);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getById")
    public ResponseEntity<ApiResponse<SubjectStudyPeriodDto>> getById(@RequestParam("subjectId") UUID subjectId,
                                                                      @RequestParam("studyPeriodId") UUID studyPeriodId) {
        try {
            SubjectStudyPeriodId id = new SubjectStudyPeriodId(subjectId, studyPeriodId);
            SubjectStudyPeriodDto result = service.getById(id);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getSubjectsByStudyPeriodId/id={id}")
    public ResponseEntity<ApiResponse<List<SubjectDto>>> getSubjectsByStudyPeriodId(@PathVariable("id") UUID studyPeriodId) {
        try {
            List<SubjectDto> result = service.getSubjectsByStudyPeriodId(studyPeriodId);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<String>> add(@RequestBody SubjectStudyPeriodDto subjectStudyPeriodDto) {
        try {
            service.add(subjectStudyPeriodDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/edit")
    public ResponseEntity<ApiResponse<String>> edit(@RequestBody SubjectStudyPeriodDto subjectStudyPeriodDto) {
        try {
            service.edit(subjectStudyPeriodDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse<String>> delete(@RequestParam("subjectId") UUID subjectId,
                                                      @RequestParam("studyPeriodId") UUID studyPeriodId) {
        try {
            SubjectStudyPeriodId id = SubjectStudyPeriodId.builder()
                    .studyPeriodId(studyPeriodId)
                    .subjectId(subjectId)
                    .build();
            service.delete(id);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }
}
