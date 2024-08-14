package justartschool.backend.services;

import justartschool.backend.dtos.SecretaryDto;
import justartschool.backend.models.entities.City;
import justartschool.backend.models.entities.Secretary;
import justartschool.backend.models.entities.User;
import justartschool.backend.repositories.ISecretariesRepository;
import justartschool.backend.repositories.IUsersRepository;
import justartschool.backend.utils.errors.BadRequestException;
import justartschool.backend.utils.errors.ExceptionProvider;
import justartschool.backend.utils.errors.NotFoundException;
import justartschool.backend.utils.responses.AuthenticationResponse;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class SecretariesService {
    private final ExceptionProvider exceptionProvider;
    private final ISecretariesRepository secretaryRepository;
    private final IUsersRepository userRepository;
    private final AuthenticationService authenticationService;
    private final AddressService addressService;
    private final ArtSchoolUserDetailsService artSchoolUserDetailsService;
    private final ModelMapper modelMapper;

    public List<SecretaryDto> getAll() {

        List<Secretary> secretaries = secretaryRepository.findAll();

        return secretaries.stream().map(SecretaryDto::new).toList();
    }

    public SecretaryDto getById(UUID id) throws BadRequestException, NotFoundException {
        if (id == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("");

        Secretary secretary = secretaryRepository.findByUserUserId(id);

        if (secretary == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Secretary not found.");

        return new SecretaryDto(secretary);
    }

    @Transactional
    public void add(SecretaryDto secretaryDto) throws Exception {
        AuthenticationResponse authenticationResponse = authenticationService.addUser(secretaryDto.getUserAccount());

        User savedUser = authenticationResponse.getUser();
        if (savedUser == null)
            throw new Exception("An error occurred when adding user account.");

        City city = addressService.getCityById(secretaryDto.getCityId());

        if (city == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("City with this id doesn't exist.");

        Secretary secretary = modelMapper.map(secretaryDto, Secretary.class);
        secretary.setUser(savedUser);
        secretary.setCity(city);

        Secretary savedSecretary = secretaryRepository.save(secretary);

        if (savedSecretary == null)
            throw new Exception("An error occurred when adding secretary.");
    }

    @Transactional
    public void edit(SecretaryDto secretaryDto) throws Exception {
        Secretary secretary = secretaryRepository.findByUserUserId(secretaryDto.getUserId());
        User user = secretary.getUser();
        if (user == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("User with this id doesn't exist.");

        City city = addressService.getCityById(secretaryDto.getCityId());

        if (city == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("City with this id doesn't exist.");

        secretary = modelMapper.map(secretaryDto, Secretary.class);
        secretary.setUser(user);
        secretary.setCity(city);

        Secretary savedSecretary = secretaryRepository.save(secretary);

        if (savedSecretary == null)
            throw new Exception("An error occurred when editing secretary.");
    }

    @Transactional
    public void delete(UUID id) throws BadRequestException, NotFoundException {
        if (id == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("");

        User user = artSchoolUserDetailsService.getUserById(id);

        if (user == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("User with this id doesn't exist.");
        }

        Secretary secretary = secretaryRepository.findByUserUserId(id);

        if (secretary == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Secretary with this id doesn't exist.");

        secretaryRepository.delete(secretary);
        userRepository.delete(user);
    }
}