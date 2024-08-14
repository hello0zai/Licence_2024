package justartschool.backend.controllers;

import justartschool.backend.dtos.StudentDto;
import justartschool.backend.services.StudentService;
import justartschool.backend.utils.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/students")
public class StudentsController {

    private final StudentService service;

    @Autowired
    public StudentsController(StudentService service) {
        this.service = service;
    }

    @Transactional
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_SECRETARY')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<StudentDto>> addStudent(@RequestBody StudentDto studentDto) {
        return null;
    }
}
