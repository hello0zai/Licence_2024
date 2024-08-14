package justartschool.backend.controllers;

import justartschool.backend.dtos.StudyPeriodDto;
import justartschool.backend.services.StudyPeriodService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/studyPeriods")
public class StudyPeriodController {
    private final StudyPeriodService service;

    @Autowired
    public StudyPeriodController(StudyPeriodService service) {
        this.service = service;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_SECRETARY')")
    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<StudyPeriodDto>>> getAll() {
        List<StudyPeriodDto> result = service.getAll();
        return ResponseUtil.createSuccessResponse(result);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getById/id={id}")
    public ResponseEntity<ApiResponse<StudyPeriodDto>> getById(@PathVariable("id") UUID id) {
        try {
            StudyPeriodDto result = service.getById(id);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<String>> add(@RequestBody StudyPeriodDto studyPeriodDto) {
        try {
            service.add(studyPeriodDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/edit")
    public ResponseEntity<ApiResponse<String>> edit(@RequestBody StudyPeriodDto studyPeriodDto) {
        try {
            service.edit(studyPeriodDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/id={id}")
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable("id") UUID id) {
        try {
            service.delete(id);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }
}
