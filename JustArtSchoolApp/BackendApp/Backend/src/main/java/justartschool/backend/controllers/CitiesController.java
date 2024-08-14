package justartschool.backend.controllers;

import justartschool.backend.dtos.CityDto;
import justartschool.backend.services.AddressService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cities")
public class CitiesController {
    private final ModelMapper modelMapper;
    private final AddressService service;

    @Autowired
    public CitiesController(ModelMapper modelMapper, AddressService service) {
        this.modelMapper = modelMapper;
        this.service = service;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_SECRETARY', 'ROLE_STUDENT')")
    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<CityDto>>> getAll() {
        try {
            List<CityDto> result = service.getCities();
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_SECRETARY', 'ROLE_STUDENT')")
    @GetMapping("/getAllByCountyId/countyId={countyId}")
    public ResponseEntity<ApiResponse<List<CityDto>>> getCitiesByCountyId(@PathVariable("countyId") UUID countyId) {
        try {
            List<CityDto> result = service.getCitiesByCountyId(countyId);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }
}
