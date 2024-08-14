package justartschool.backend.services;

import justartschool.backend.repositories.IStudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StudentService {
    private final IStudentRepository repository;
}
