package justartschool.backend.controllers;

import justartschool.backend.dtos.TeacherDto;
import justartschool.backend.services.TeachersService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/teachers")
public class TeachersController {
    private final TeachersService service;

    @Autowired
    public TeachersController(TeachersService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<TeacherDto>>> getAll() {
        List<TeacherDto> secretaries = service.getAll();
        return ResponseUtil.createSuccessResponse(secretaries);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getById/id={id}")
    public ResponseEntity<ApiResponse<TeacherDto>> getById(@PathVariable("id") UUID userId) {
        try {
            TeacherDto result = service.getById(userId);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<String>> add(@RequestBody TeacherDto secretaryDto) {
        try {
            service.add(secretaryDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/edit")
    public ResponseEntity<ApiResponse<String>> edit(@RequestBody TeacherDto secretaryDto) {
        try {
            service.edit(secretaryDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/id={id}")
    public ResponseEntity<ApiResponse<String>> deleteSecretary(@PathVariable("id") UUID userId) {
        try {
            service.delete(userId);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }
}
