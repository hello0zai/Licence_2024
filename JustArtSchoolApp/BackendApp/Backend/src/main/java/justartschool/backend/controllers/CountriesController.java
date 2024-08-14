package justartschool.backend.controllers;

import justartschool.backend.dtos.*;
import justartschool.backend.services.AddressService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/countries")
public class CountriesController {
    private final AddressService service;

    @Autowired
    public CountriesController(AddressService service) {
        this.service = service;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_SECRETARY','ROLE_STUDENT')")
    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<CountryDto>>> getAll() {
        try {
            List<CountryDto> result = service.getCountries();
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @Transactional
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<String>> addCountryWithCountiesAndCities(
            @RequestBody CountryLocationDto countryLocationDto
    ) {
        try {
            service.addCountryWithCountiesAndCities(countryLocationDto);
            return ResponseUtil.createSuccessResponse("OK.");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }

    }
}
