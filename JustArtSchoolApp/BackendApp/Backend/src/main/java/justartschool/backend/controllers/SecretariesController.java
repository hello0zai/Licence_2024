package justartschool.backend.controllers;

import justartschool.backend.dtos.SecretaryDto;
import justartschool.backend.services.SecretariesService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/secretaries")
public class SecretariesController {
    private final SecretariesService service;

    @Autowired
    public SecretariesController(SecretariesService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<SecretaryDto>>> getAll() {
        List<SecretaryDto> secretaries = service.getAll();
        return ResponseUtil.createSuccessResponse(secretaries);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getById/id={id}")
    public ResponseEntity<ApiResponse<SecretaryDto>> getById(@PathVariable("id") UUID userId) {
        try {
            SecretaryDto result = service.getById(userId);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<String>> add(@RequestBody SecretaryDto secretaryDto) {
        try {
            service.add(secretaryDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/edit")
    public ResponseEntity<ApiResponse<String>> edit(@RequestBody SecretaryDto secretaryDto) {
        try {
            service.edit(secretaryDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/id={id}")
    public ResponseEntity<ApiResponse<String>> delete(@PathVariable("id") UUID userId) {
        try {
            service.delete(userId);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }
}
