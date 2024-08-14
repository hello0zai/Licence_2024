package justartschool.backend.repositories;

import justartschool.backend.models.entities.RegistrationDocument;
import justartschool.backend.models.entities.StudyPeriod;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface IRegistrationDocumentsRepository extends JpaRepository<RegistrationDocument, UUID> {
    @NotNull List<RegistrationDocument> findAll();
    RegistrationDocument findRegistrationDocumentByRegistrationDocumentId(UUID id);
}
