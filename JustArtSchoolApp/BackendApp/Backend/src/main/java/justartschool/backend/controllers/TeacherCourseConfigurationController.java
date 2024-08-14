package justartschool.backend.controllers;

import justartschool.backend.dtos.SubjectStudyPeriodCourseDetailsDto;
import justartschool.backend.dtos.TeacherDto;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodCourseDetailsId;
import justartschool.backend.services.TeacherCourseConfigurationService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/teacherCourseConfiguration")
public class TeacherCourseConfigurationController {
    private final TeacherCourseConfigurationService service;

    @Autowired
    public TeacherCourseConfigurationController(TeacherCourseConfigurationService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getTeachersBySubjectStudyPeriodCourseDetailsId")
    public ResponseEntity<ApiResponse<List<TeacherDto>>> getAll(@RequestParam("subjectId") UUID subjectId,
                                                                @RequestParam("studyPeriodId") UUID studyPeriodId,
                                                                @RequestParam("courseId") UUID courseId,
                                                                @RequestParam("studyYearId") Integer studyYearId) {
        try {

            SubjectStudyPeriodCourseDetailsId id = SubjectStudyPeriodCourseDetailsId.builder()
                    .subjectId(subjectId)
                    .studyPeriodId(studyPeriodId)
                    .courseId(courseId)
                    .studyYearId(studyYearId)
                    .build();

            List<TeacherDto> result = service.getTeachersBySubjectStudyPeriodCourseDetailsId(id);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }
}
