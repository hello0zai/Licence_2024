package justartschool.backend.controllers;

import justartschool.backend.dtos.RegistrationDocumentDto;
import justartschool.backend.services.RegistrationDocumentsService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/registrationDocument")
public class RegistrationDocumentsController {
    private final RegistrationDocumentsService service;

    @Autowired
    public RegistrationDocumentsController(RegistrationDocumentsService service) {
        this.service = service;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_STUDENT')")
    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<RegistrationDocumentDto>>> getAll() {
        List<RegistrationDocumentDto> result = null;
        try {
            result = service.getAll();
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getById/id={id}")
    public ResponseEntity<ApiResponse<RegistrationDocumentDto>> getById(@PathVariable("id") UUID id) {
        try {
            RegistrationDocumentDto result = service.getById(id);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<String>> add(@RequestBody RegistrationDocumentDto registrationDocumentDto) {
        try {
            service.add(registrationDocumentDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/edit")
    public ResponseEntity<ApiResponse<String>> edit(@RequestBody RegistrationDocumentDto registrationDocumentDto) {
        try {
            service.edit(registrationDocumentDto);
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
