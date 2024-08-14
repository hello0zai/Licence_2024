package justartschool.backend.controllers;

import justartschool.backend.dtos.SubjectDto;
import justartschool.backend.services.SubjectsService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/subjects")
public class SubjectsController {
    private final SubjectsService service;

    @Autowired
    public SubjectsController(SubjectsService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<SubjectDto>>> getAll() {
        List<SubjectDto> result = service.getAll();
        return ResponseUtil.createSuccessResponse(result);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getById/id={id}")
    public ResponseEntity<ApiResponse<SubjectDto>> getById(@PathVariable("id") UUID subjectId) {
        try {
            SubjectDto result = service.getById(subjectId);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<String>> add(@RequestBody SubjectDto subjectDto) {
        try {
            service.add(subjectDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/edit")
    public ResponseEntity<ApiResponse<String>> edit(@RequestBody SubjectDto subjectDto) {
        try {
            service.edit(subjectDto);
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