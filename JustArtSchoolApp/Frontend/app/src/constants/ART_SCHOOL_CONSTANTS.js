const BASE_URL = 'http://localhost:8080/api/';

const ART_SCHOOL_CONSTANTS = {
    BASE_URL: BASE_URL,
    // GET
    AUTHENTICATION_URL: BASE_URL + 'auth/authenticate',
    CHECK_TOKEN_URL: BASE_URL + 'auth/checkToken',
    REGISTER_URL: BASE_URL + 'auth/register',
    LOGOUT_URL: BASE_URL + 'auth/logout',
    GET_ROLES_URL: BASE_URL + 'roles/getAll',
    GET_SECRETARIES_URL: BASE_URL + 'secretaries/getAll',
    GET_COUNTRIES_URL: BASE_URL + 'countries/getAll',
    GET_COUNTIES_URL: BASE_URL + 'counties/getAll',
    GET_CITIES_URL: BASE_URL + 'cities/getAll',
    GET_TEACHERS_URL:  BASE_URL + 'teachers/getAll',
    GET_STUDY_PERIODS_URL:  BASE_URL + 'studyPeriods/getAll',
    GET_SUBJECT_STUDY_PERIOD_URL: BASE_URL + 'subjectStudyPeriods/getAll',
    GET_REGISTRATION_DOCUMENT_URL: BASE_URL + 'registrationDocument/getAll',
    GET_SUBJECT_STUDY_PERIOD_COURSE_DETAILS_URL: BASE_URL + 'subjectStudyPeriodCourseDetails/getAll',
    GET_COURSES_URL: BASE_URL + 'courses/getAll',
    GET_TEACHER_COURSE_CONFIGURATION_URL: BASE_URL + 'teacherCourseConfiguration/getAll',
    GET_STUDENTS_URL: BASE_URL + 'students/getAll',
    GET_CONTEST_TYPES_URL: BASE_URL + 'contestTypes/getAll',
    GET_CONTEST_URL: BASE_URL + 'contests/getAll',

    // GET BY EMAIL/ID
    GET_CITIES_BY_COUNTY_ID_URL: BASE_URL + 'cities/getAllByCountyId/',
    GET_USER_BY_EMAIL_URL: BASE_URL + 'user/getByEmail/',
    GET_SECRETARY_BY_EMAIL_URL: BASE_URL + 'secretaries/getByEmail/',
    GET_SECRETARY_BY_ID_URL:  BASE_URL + 'secretaries/getById/',
    GET_TEACHER_BY_ID_URL:  BASE_URL + 'teachers/getById/',
    GET_SUBJECT_STUDY_PERIOD_BY_ID_URL: BASE_URL + 'subjectStudyPeriods/getById',
    GET_SUBJECTS_BY_STUDY_PERIOD_ID_URL: BASE_URL + 'subjectStudyPeriods/getSubjectsByStudyPeriodId/',
    GET_SUBJECT_STUDY_PERIOD_BY_STUDY_PERIOD_ID_URL: BASE_URL + 'subjectStudyPeriods/getAllByStudyPeriodId/',
    GET_REGISTRATION_DOCUMENT_BY_ID_URL: BASE_URL + 'registrationDocument/getById/',
    GET_SUBJECT_STUDY_PERIOD_COURSE_DETAILS_BY_ID_URL: BASE_URL + 'subjectStudyPeriodCourseDetails/getById',
    GET_TEACHERS_BY_SUBJECT_STUDY_PERIOD_COURSE_DETAILS_ID_URL: BASE_URL + 'teacherCourseConfiguration/getTeachersBySubjectStudyPeriodCourseDetailsId',
    GET_STUDENTS_BY_COURSE_DETAILS_AND_TEACHER_URL: BASE_URL + 'subjectStudyPeriodCourseDetails/getStudentsByCourseDetailsAndTeacher',
    GET_STUDENTS_BY_COURSE_DETAILS_FOR_COURSE_CONFIGURATION_URL: BASE_URL + 'subjectStudyPeriodCourseDetails/getStudentsByCourseDetailsForCourseConfiguration',
    GET_STUDENT_BY_EMAIL_URL: BASE_URL + 'students/getByEmail',
    GET_STUDENTS_BY_COURSE_CONFIGURATIONS_URL: BASE_URL + 'studentSubjectCourseGrade/getStudentsByCourseConfigurations',
    GET_CONTEST_BY_ID_URL: BASE_URL + 'contests/getById/',
    GET_CONTEST_TYPE_STAGE_LIST_BY_CONTEST_ID_URL:  BASE_URL + 'contestStages/getAllByContestId/',
    GET_CONTEST_TYPE_BY_NAME: BASE_URL + 'contestTypes/getByTypeName/',

    // ADD
    ADD_SECRETARY_URL: BASE_URL + 'secretaries/add',
    ADD_TEACHER_URL: BASE_URL + 'teachers/add',
    ADD_SUBJECT_STUDY_PERIOD_URL: BASE_URL + 'subjectStudyPeriods/add',
    ADD_REGISTRATION_DOCUMENT_URL: BASE_URL + 'registrationDocument/add',
    ADD_SUBJECT_STUDY_PERIOD_COURSE_DETAILS_URL: BASE_URL + 'subjectStudyPeriodCourseDetails/add',
    UPLOAD_DOCUMENT_URL: BASE_URL + 'documents/addStudentDocument',
    ADD_STUDENT_URL: BASE_URL + 'students/add',
    ADD_STUDENT_REGISTRATION_DOCUMENT_URL: BASE_URL + 'studentRegistrationDocument/add',
    ADD_STUDENT_SUBJECT_STUDY_PERIOD_DETAILS_URL: BASE_URL + 'studentSubjectStudyPeriodDetails/add',
    ADD_STUDENT_COURSE_CONFIGURATION_URL: BASE_URL + 'studentSubjectCourseGrade/configureStudentCourseByTeacher',
    ADD_GRADES_URL: BASE_URL + 'studentSubjectCourseGrade/addGrades',
    ADD_CONTEST_URL: BASE_URL + 'contests/add',

    // EDIT
    EDIT_SECRETARY_URL: BASE_URL + 'secretaries/edit',
    EDIT_TEACHER_URL: BASE_URL + 'teachers/edit',
    EDIT_SUBJECT_STUDY_PERIOD_URL: BASE_URL + 'subjectStudyPeriods/edit',
    EDIT_USER_PROFILE_URL: BASE_URL + 'user/edit',
    EDIT_REGISTRATION_DOCUMENT_URL: BASE_URL + 'registrationDocument/edit',
    EDIT_SUBJECT_STUDY_PERIOD_COURSE_DETAILS_URL: BASE_URL + 'subjectStudyPeriodCourseDetails/edit',
    EDIT_CONTEST_URL: BASE_URL + 'contests/edit',

    // DELETE
    DELETE_SECRETARY_BY_ID_URL: BASE_URL + 'secretaries/delete/',
    DELETE_TEACHER_BY_ID_URL: BASE_URL + 'teachers/delete/',
    DELETE_SUBJECT_STUDY_PERIOD_URL: BASE_URL + 'subjectStudyPeriods/delete',
    DELETE_REGISTRATION_DOCUMENT_URL: BASE_URL + 'registrationDocument/delete/',
    DELETE_SUBJECT_STUDY_PERIOD_COURSE_DETAILS_URL: BASE_URL + 'subjectStudyPeriodCourseDetails/delete',
    DELETE_CONTEST_URL: BASE_URL + 'contests/delete/'
}

export default  ART_SCHOOL_CONSTANTS;