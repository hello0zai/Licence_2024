package justartschool.backend.controllers;

import justartschool.backend.dtos.RoleDto;
import justartschool.backend.services.RolesService;
import justartschool.backend.utils.responses.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolesController {
    private final RolesService service;

    @Autowired
    public RolesController(RolesService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity<List<RoleDto>> getAll() {
        return ResponseEntity.ok(service.getAllRoles());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity add(
            @RequestBody RoleDto roleDto
    ) {
        try {
            service.addRole(roleDto);
            return ResponseEntity.ok().build();
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }
}
