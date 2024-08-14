package justartschool.backend.services;

import justartschool.backend.repositories.IAdmissionContestTaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdmissionContestTaskService {
    private IAdmissionContestTaskRepository repository;
}
