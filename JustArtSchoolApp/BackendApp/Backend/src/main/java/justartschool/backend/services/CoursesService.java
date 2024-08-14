package justartschool.backend.services;

import justartschool.backend.dtos.CourseDto;
import justartschool.backend.dtos.RegistrationDocumentDto;
import justartschool.backend.models.entities.Course;
import justartschool.backend.models.entities.RegistrationDocument;
import justartschool.backend.repositories.ICoursesRepository;
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
public class CoursesService {
    private final ExceptionProvider exceptionProvider;
    private final ModelMapper modelMapper;
    private final ICoursesRepository repository;

    public List<CourseDto> getAll() throws NotFoundException {
        List<Course> courses = repository.findAll();

        if (courses.size() == 0) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Courses not found");
        }
        return courses.stream().map(CourseDto::new).toList();
    }

    public CourseDto getById(UUID id) throws BadRequestException, NotFoundException {
        if (id == null)
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("Id is required.");

        Course course = repository.findCourseByCourseId(id);

        if (course == null)
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Course with this id not found.");

        return modelMapper.map(course, CourseDto.class);
    }

    public void add(CourseDto courseDto) throws BadRequestException {
        if (courseDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("CourseDto is required.");
        }

        Course course = modelMapper.map(courseDto, Course.class);
        repository.save(course);
    }

    public void edit(CourseDto courseDto) throws NotFoundException, BadRequestException {
        if (courseDto == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("CourseDto is required.");
        }

        UUID id = courseDto.getCourseId();

        Course course = repository.findCourseByCourseId(id);

        if (course == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Course with this id not found.");
        }

        course = modelMapper.map(courseDto, Course.class);
        repository.save(course);
    }

    public void delete(UUID id) throws NotFoundException, BadRequestException {
        if (id == null) {
            throw exceptionProvider.BAD_REQUEST_EXCEPTION("CourseId is required.");
        }

        Course course = repository.findCourseByCourseId(id);

        if (course == null) {
            throw exceptionProvider.NOT_FOUND_EXCEPTION("Course with this id not found.");
        }

        repository.delete(course);
    }
}
