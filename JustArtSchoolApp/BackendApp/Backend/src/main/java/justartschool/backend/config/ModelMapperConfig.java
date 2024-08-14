package justartschool.backend.config;

import justartschool.backend.dtos.ContestDto;
import justartschool.backend.dtos.SubjectStudyPeriodCourseDetailsDto;
import justartschool.backend.models.entities.Contest;
import justartschool.backend.models.entities.SubjectStudyPeriodCourseDetails;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.addMappings(new PropertyMap<SubjectStudyPeriodCourseDetailsDto, SubjectStudyPeriodCourseDetails>() {
            @Override
            protected void configure() {
                map().setExamName(source.getExamName());
                map().setExamType(source.getExamType());
                map().setSemester(source.getSemester());
                map().setClassHoursDuration(source.getClassHoursDuration());
                map().setWeeklyFrequencyCourse(source.getWeeklyFrequencyCourse());
                map().setCourseWeeksDuration(source.getCourseWeeksDuration());

                skip(destination.getSubjectStudyPeriodCourseDetailsId());
                skip(destination.getSubjectStudyPeriod());
                skip(destination.getCourse());
                skip(destination.getStudentSubjectCourseGradeList());
                skip(destination.getTeacherCourseConfigurationList());
            }
        });

        modelMapper.addMappings(new PropertyMap<ContestDto, Contest>() {
            @Override
            protected void configure() {
                map().setContestId(source.getContestId());
                map().setContestName(source.getContestName());
                map().setStartDate(source.getStartDate());
                map().setEndDate(source.getEndDate());

                skip(destination.getContestTypeStageList());
            }
        });

        return modelMapper;
    }
}

