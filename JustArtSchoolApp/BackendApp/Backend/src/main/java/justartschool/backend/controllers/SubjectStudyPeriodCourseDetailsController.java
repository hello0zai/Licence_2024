package justartschool.backend.controllers;

import justartschool.backend.dtos.StudyPeriodDto;
import justartschool.backend.dtos.SubjectDto;
import justartschool.backend.dtos.SubjectStudyPeriodCourseDetailsDto;
import justartschool.backend.dtos.SubjectStudyPeriodCourseDetailsDto;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodCourseDetailsId;
import justartschool.backend.models.compositePrimaryKeys.SubjectStudyPeriodId;
import justartschool.backend.services.SubjectStudyPeriodCourseDetailsService;
import justartschool.backend.utils.responses.ApiResponse;
import justartschool.backend.utils.responses.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/subjectStudyPeriodCourseDetails")
public class SubjectStudyPeriodCourseDetailsController {
    private final SubjectStudyPeriodCourseDetailsService service;

    @Autowired
    public SubjectStudyPeriodCourseDetailsController(SubjectStudyPeriodCourseDetailsService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getAll")
    public ResponseEntity<ApiResponse<List<SubjectStudyPeriodCourseDetailsDto>>> getAll() {
        try {
            List<SubjectStudyPeriodCourseDetailsDto> result = service.getAll();
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/getById")
    public ResponseEntity<ApiResponse<SubjectStudyPeriodCourseDetailsDto>> getById(
            @RequestParam("courseId") UUID courseId,
            @RequestParam("subjectId") UUID subjectId,
            @RequestParam("studyPeriodId") UUID studyPeriodId,
            @RequestParam("studyYearId") Integer studyYearId
    ) {
        try {
            SubjectStudyPeriodCourseDetailsId id = SubjectStudyPeriodCourseDetailsId.builder()
                    .courseId(courseId)
                    .subjectId(subjectId)
                    .studyPeriodId(studyPeriodId)
                    .studyYearId(studyYearId)
                    .build();

            SubjectStudyPeriodCourseDetailsDto result = service.getById(id);
            return ResponseUtil.createSuccessResponse(result);
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<String>> add(@RequestBody SubjectStudyPeriodCourseDetailsDto subjectStudyPeriodCourseDetailsDto) {
        try {
            service.add(subjectStudyPeriodCourseDetailsDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/edit")
    public ResponseEntity<ApiResponse<String>> edit(@RequestBody SubjectStudyPeriodCourseDetailsDto subjectStudyPeriodCourseDetailsDto) {
        try {
            service.edit(subjectStudyPeriodCourseDetailsDto);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse<String>> delete(@RequestParam("courseId") UUID courseId,
                                                      @RequestParam("subjectId") UUID subjectId,
                                                      @RequestParam("studyPeriodId") UUID studyPeriodId,
                                                      @RequestParam("studyYearId") Integer studyYearId) {
        try {
            SubjectStudyPeriodCourseDetailsId id = SubjectStudyPeriodCourseDetailsId.builder()
                    .courseId(courseId)
                    .subjectId(subjectId)
                    .studyPeriodId(studyPeriodId)
                    .studyYearId(studyYearId)
                    .build();
            service.delete(id);
            return ResponseUtil.createSuccessResponse("Ok");
        } catch (Exception ex) {
            return ResponseUtil.createErrorResponse(ex);
        }
    }
}
