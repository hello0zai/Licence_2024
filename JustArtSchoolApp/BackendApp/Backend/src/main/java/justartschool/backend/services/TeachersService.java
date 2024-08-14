package justartschool.backend.services;

import justartschool.backend.dtos.TeacherDto;
import justartschool.backend.models.entities.City;
import justartschool.backend.models.entities.Teacher;
import justartschool.backend.models.entities.User;
import justartschool.backend.repositories.ITeachersRepository;
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
public class TeachersService {
    private final ExceptionProvider exceptionProvider;
    private final ITeachersRepository teacherRepository;
    private final IUsersRepository userRepository;
    private final AuthenticationService authenticationService;
    private final AddressService addressService;
    private final ArtSchoolUserDetailsService artSchoolUserDetailsService;
    private final ModelMapper modelMapper;

    public List<TeacherDto> getAll() {

        List<Teacher> teachers = teacherRepository.findAll();

        return teachers.stream().map(TeacherDto::new).toList();
    }

    public TeacherDto getById(UUID id) throws BadRequestException, NotFoundException {
        if (id == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("");

        Teacher teacher = teacherRepository.findByUserUserId(id);

        if (teacher == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Teacher with this id doesn't exist.");

        return new TeacherDto(teacher);
    }

    @Transactional
    public void add(TeacherDto teacherDto) throws Exception {
        AuthenticationResponse authenticationResponse = authenticationService.addUser(teacherDto.getUserAccount());

        User savedUser = authenticationResponse.getUser();
        if (savedUser == null)
            throw new Exception("An error occurred when adding user account.");

        City city = addressService.getCityById(teacherDto.getCityId());

        if (city == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("City with this id doesn't exist.");

        Teacher teacher = modelMapper.map(teacherDto, Teacher.class);
        teacher.setUser(savedUser);
        teacher.setCity(city);

        Teacher savedTeacher = teacherRepository.save(teacher);

        if (savedTeacher == null)
            throw new Exception("An error occurred when adding teacher.");
    }

    @Transactional
    public void edit(TeacherDto teacherDto) throws Exception {
        Teacher teacher = teacherRepository.findByUserUserId(teacherDto.getUserId());
        User user = teacher.getUser();
        if (user == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("User with this id doesn't exist.");

        City city = addressService.getCityById(teacherDto.getCityId());

        if (city == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("City with this id doesn't exist.");

        teacher = modelMapper.map(teacherDto, Teacher.class);
        teacher.setUser(user);
        teacher.setCity(city);

        Teacher savedTeacher = teacherRepository.save(teacher);

        if (savedTeacher == null)
            throw new Exception("An error occurred when editing teacher.");
    }

    @Transactional
    public void delete(UUID id) throws BadRequestException, NotFoundException {
        if (id == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("");

        User user = artSchoolUserDetailsService.getUserById(id);

        if (user == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("User with this id doesn't exist.");
        }

        Teacher teacher = teacherRepository.findByUserUserId(id);

        if (teacher == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Teacher with this id doesn't exist.");

        teacherRepository.delete(teacher);
        userRepository.delete(user);
    }
}