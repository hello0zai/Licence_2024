package justartschool.backend.services;

import justartschool.backend.dtos.RegistrationDocumentDto;
import justartschool.backend.dtos.StudyPeriodDto;
import justartschool.backend.models.entities.RegistrationDocument;
import justartschool.backend.models.entities.StudyPeriod;
import justartschool.backend.repositories.IRegistrationDocumentsRepository;
import justartschool.backend.utils.errors.BadRequestException;
import justartschool.backend.utils.errors.ExceptionProvider;
import justartschool.backend.utils.errors.NotFoundException;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RegistrationDocumentsService {
    private final ExceptionProvider exceptionProvider;
    private final ModelMapper modelMapper;
    private final IRegistrationDocumentsRepository repository;

    public List<RegistrationDocumentDto> getAll() throws NotFoundException {
        List<RegistrationDocument> registrationDocuments = repository.findAll();

        if(registrationDocuments.size() == 0)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Registration documents not found");
        return registrationDocuments.stream().map(RegistrationDocumentDto::new).toList();
    }

    public RegistrationDocumentDto getById(UUID id) throws BadRequestException, NotFoundException {
        if (id == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("Id is required.");

        RegistrationDocument registrationDocument = repository.findRegistrationDocumentByRegistrationDocumentId(id);

        if (registrationDocument == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("RegistrationDocument with this id not found.");

        return modelMapper.map(registrationDocument, RegistrationDocumentDto.class);
    }

    public void add(RegistrationDocumentDto registrationDocumentDto) throws BadRequestException {
        if (registrationDocumentDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("RegistrationDocumentDto is required.");
        }

        RegistrationDocument registrationDocument = modelMapper.map(registrationDocumentDto, RegistrationDocument.class);
        repository.save(registrationDocument);
    }

    public void edit(RegistrationDocumentDto registrationDocumentDto) throws NotFoundException, BadRequestException {
        if (registrationDocumentDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("RegistrationDocumentDto is required.");
        }

        UUID id = registrationDocumentDto.getRegistrationDocumentId();

        RegistrationDocument registrationDocument = repository.findRegistrationDocumentByRegistrationDocumentId(id);

        if (registrationDocument == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("RegistrationDocument with this id not found.");
        }

        registrationDocument = modelMapper.map(registrationDocumentDto, RegistrationDocument.class);
        repository.save(registrationDocument);
    }

    public void delete(UUID id) throws NotFoundException, BadRequestException {
        if (id == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("RegistrationDocumentId is required.");
        }

        RegistrationDocument registrationDocument = repository.findRegistrationDocumentByRegistrationDocumentId(id);

        if (registrationDocument == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("RegistrationDocument with this id not found.");
        }

        repository.delete(registrationDocument);
    }
}
