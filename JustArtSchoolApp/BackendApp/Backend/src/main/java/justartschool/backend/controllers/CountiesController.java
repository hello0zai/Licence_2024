package justartschool.backend.controllers;

import justartschool.backend.dtos.CountyDto;
import justartschool.backend.services.AddressService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/counties")
public class CountiesController {

    private final ModelMapper modelMapper = new ModelMapper();
    private final AddressService service;

    @Autowired
    public CountiesController(AddressService service) {
        this.service = service;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_SECRETARY', 'ROLE_STUDENT')")
    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<CountyDto>>> getAll() {
        try {
            List<CountyDto> result = service.getCounties();
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }
}
