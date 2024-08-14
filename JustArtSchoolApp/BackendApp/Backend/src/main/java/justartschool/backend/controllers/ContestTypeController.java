package justartschool.backend.controllers;

import justartschool.backend.dtos.ContestTypeDto;
import justartschool.backend.services.ContestTypeService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
@RequestMapping("/api/contestTypes")
public class ContestTypeController {
    private final ContestTypeService service;

    @Autowired
    public ContestTypeController(ContestTypeService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<ContestTypeDto>>> getAll() {
        List<ContestTypeDto> result;
        try {
            result = service.getAll();
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getById/id={id}")
    public ResponseEntity<ApiResponse<ContestTypeDto>> getById(@PathVariable("id") UUID contestTypeId) {
        try {
            ContestTypeDto result = service.getById(contestTypeId);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getByTypeName/typeName={typeName}")
    public ResponseEntity<ApiResponse<ContestTypeDto>> getByTypeName(@PathVariable("typeName") String typeName) {
        try {
            ContestTypeDto result = service.getByTypeName(typeName);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<String>> add(@RequestBody ContestTypeDto contestTypeDto) {
        try {
            service.add(contestTypeDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/edit")
    public ResponseEntity<ApiResponse<String>> edit(@RequestBody ContestTypeDto contestTypeDto) {
        try {
            service.edit(contestTypeDto);
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
