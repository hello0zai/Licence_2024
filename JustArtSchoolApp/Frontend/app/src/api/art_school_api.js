import React from 'react'
import ART_SCHOOL_CONSTANTS from "../constants/ART_SCHOOL_CONSTANTS";
import axios from "axios";

function ArtSchoolApi() {
    const artSchoolAuthorization = {
        /**
         * @function - authenticate function.
         * @param {{String,String}} userWithEmailAndPassword - email with password.
         * @returns {Promise<{Token,RoleList}>} - promise with object response (token,roleList).
         */
        authenticateMethod: async (userWithEmailAndPassword) => {
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.AUTHENTICATION_URL, JSON.stringify(userWithEmailAndPassword), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        checkToken: async (userDetails) => {
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.CHECK_TOKEN_URL, JSON.stringify(userDetails), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        registerMethod: async (registerRequest) => {
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.REGISTER_URL, JSON.stringify(registerRequest), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        logout: async () => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.LOGOUT_URL, {});
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    };

    const roleApi = {
        /**
         * @function - get all roles from the backend server.
         * @param {String} token - access token for header request.
         * @returns {Promise<Array<Country>|Error>} - promise with role list.
         */
        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_ROLES_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {

                throw error;
            }
        }
    };

    const userApi = {
        /**
         * @function - get all users from the backend server.
         * @param {String} token - access token for header request.
         * @returns {Promise<Array<Country>|Error>} - promise with user list.
         */
        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_ROLES_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {

                throw error;
            }
        },

        /**
         * @function - get user by email from the backend server.
         * @param {String} token - access token for header request.
         * @param {String} email - user email.
         * @returns {Promise<User|Error>} - promise with UserObject.
         */
        getUserByEmail: async (token, email,) => {
            const url = (ART_SCHOOL_CONSTANTS.GET_USER_BY_EMAIL_URL).concat(`email=${email}`)
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
        edit: async (token, userAccount) => {
            try {
                const response = await axios.put(ART_SCHOOL_CONSTANTS.EDIT_USER_PROFILE_URL, JSON.stringify(userAccount), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    };

    const countryApi = {
        /**
         * @function - get all countries from the backend server.
         * @param {String} token - access token for header request.
         * @returns {Promise<Array<Country>|Error>} - promise with country list.
         */
        getAllCountries: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_COUNTRIES_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        }
    };

    const countyApi = {
        /**
         * @function - get all counties from the backend server.
         * @param {String} token - access token for header request.
         * @returns {Promise<Array<Country>|Error>} - promise with county list.
         */
        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_COUNTIES_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        }
    };

    const cityApi = {
        /**
         * @function - get all cities from the backend server.
         * @param {String} token - access token for header request.
         * @returns {Promise<Array<Country>|Error>} - promise with city list.
         */
        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_CITIES_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        /**
         * @function - get all cities by county id from the backend server.
         * @param {String} token - access token for header request.
         * @param countyId - countyId
         * @returns {Promise<Array<Country>|Error>} - promise with city list by county id.
         */
        getAllByCountyId: async (token, countyId) => {
            const url = (ART_SCHOOL_CONSTANTS.GET_CITIES_BY_COUNTY_ID_URL).concat(`countyId=${countyId}`)
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        }
    };

    const secretaryApi = {
        add: async (token, secretary) => {
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.ADD_SECRETARY_URL, JSON.stringify(secretary), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        getByEmail: async (email, token) => {
            const url = (ART_SCHOOL_CONSTANTS.GET_SECRETARY_BY_EMAIL_URL).concat(`email=${email}`)
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_SECRETARIES_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        getById: async (token, userId) => {
            const url = (ART_SCHOOL_CONSTANTS.GET_SECRETARY_BY_ID_URL).concat(`id=${userId}`)
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        edit: async (token, secretary) => {
            try {
                const response = await axios.put(ART_SCHOOL_CONSTANTS.EDIT_SECRETARY_URL, JSON.stringify(secretary), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        delete: async (token, userId) => {
            const url = (ART_SCHOOL_CONSTANTS.DELETE_SECRETARY_BY_ID_URL).concat(`id=${userId}`)
            try {
                const response = await axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
    };

    const teacherApi = {
        add: async (token, teacher) => {
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.ADD_TEACHER_URL, JSON.stringify(teacher), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_TEACHERS_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        getById: async (token, userId) => {
            const url = (ART_SCHOOL_CONSTANTS.GET_TEACHER_BY_ID_URL).concat(`id=${userId}`)
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        edit: async (token, secretary) => {
            try {
                const response = await axios.put(ART_SCHOOL_CONSTANTS.EDIT_TEACHER_URL, JSON.stringify(secretary), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        delete: async (token, userId) => {
            const url = (ART_SCHOOL_CONSTANTS.DELETE_TEACHER_BY_ID_URL).concat(`id=${userId}`)
            try {
                const response = await axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
    };

    const studyPeriodApi = {
        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_STUDY_PERIODS_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
    };

    const subjectStudyPeriodsApi = {
        getAllByStudyPeriodId: async (token, studyPeriodId) => {
            const url = (ART_SCHOOL_CONSTANTS.GET_SUBJECT_STUDY_PERIOD_BY_STUDY_PERIOD_ID_URL).concat(`id=${studyPeriodId}`)
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        getSubjectsByStudyPeriodId: async (token, studyPeriodId) => {
            const url = (ART_SCHOOL_CONSTANTS.GET_SUBJECTS_BY_STUDY_PERIOD_ID_URL).concat(`id=${studyPeriodId}`)
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_SUBJECT_STUDY_PERIOD_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        getById: async (token, compositeId) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_SUBJECT_STUDY_PERIOD_BY_ID_URL, {
                    params: {
                        subjectId: compositeId.subjectId,
                        studyPeriodId: compositeId.studyPeriodId
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        // 'Content-Type': 'application/json'
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        add: async (token, subjectWithStudyPeriod) => {
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.ADD_SUBJECT_STUDY_PERIOD_URL, JSON.stringify(subjectWithStudyPeriod), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        edit: async (token, subjectStudyPeriod) => {
            try {
                const response = await axios.put(ART_SCHOOL_CONSTANTS.EDIT_SUBJECT_STUDY_PERIOD_URL, JSON.stringify(subjectStudyPeriod), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        delete: async (token, compositeId) => {
            try {
                const response = await axios.delete(ART_SCHOOL_CONSTANTS.DELETE_SUBJECT_STUDY_PERIOD_URL, {
                    params: {
                        subjectId: compositeId.subjectId,
                        studyPeriodId: compositeId.studyPeriodId
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
    };

    const registrationDocumentApi = {
        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_REGISTRATION_DOCUMENT_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        getById: async (token, registrationDocumentId) => {
            const url = (ART_SCHOOL_CONSTANTS.GET_REGISTRATION_DOCUMENT_BY_ID_URL).concat(`id=${registrationDocumentId}`)
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        add: async (token, registrationDocument) => {
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.ADD_REGISTRATION_DOCUMENT_URL, JSON.stringify(registrationDocument), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        edit: async (token, registrationDocument) => {
            try {
                const response = await axios.put(ART_SCHOOL_CONSTANTS.EDIT_REGISTRATION_DOCUMENT_URL, JSON.stringify(registrationDocument), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        delete: async (token, registrationDocumentId) => {
            const url = (ART_SCHOOL_CONSTANTS.DELETE_REGISTRATION_DOCUMENT_URL).concat(`id=${registrationDocumentId}`)
            try {
                const response = await axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
    };

    const courseApi = {
        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_COURSES_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
    };

    const subjectStudyPeriodCourseDetailsApi = {
        getStudentsByCourseDetailsAndTeacher: async (token, compositeId) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_STUDENTS_BY_COURSE_DETAILS_AND_TEACHER_URL, {
                    params: {
                        subjectId: compositeId.subjectId,
                        studyPeriodId: compositeId.studyPeriodId,
                        courseId: compositeId.courseId,
                        studyYearId: compositeId.studyYearId,
                        teacherId: compositeId.teacherId,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        getStudentsByCourseDetailsForCourseConfiguration: async (token, compositeId) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_STUDENTS_BY_COURSE_DETAILS_FOR_COURSE_CONFIGURATION_URL, {
                    params: {
                        subjectId: compositeId.subjectId,
                        studyPeriodId: compositeId.studyPeriodId,
                        courseId: compositeId.courseId,
                        studyYearId: compositeId.studyYearId
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_SUBJECT_STUDY_PERIOD_COURSE_DETAILS_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        getById: async (token, compositeId) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_SUBJECT_STUDY_PERIOD_COURSE_DETAILS_BY_ID_URL, {
                    params: {
                        subjectId: compositeId.subjectId,
                        studyPeriodId: compositeId.studyPeriodId,
                        courseId: compositeId.courseId,
                        studyYearId: compositeId.studyYearId,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        add: async (token, subjectStudyPeriodCourseDetails) => {
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.ADD_SUBJECT_STUDY_PERIOD_COURSE_DETAILS_URL, JSON.stringify(subjectStudyPeriodCourseDetails), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        edit: async (token, subjectStudyPeriodCourseDetails) => {
            try {
                const response = await axios.put(ART_SCHOOL_CONSTANTS.EDIT_SUBJECT_STUDY_PERIOD_COURSE_DETAILS_URL, JSON.stringify(subjectStudyPeriodCourseDetails), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        delete: async (token, compositeId) => {
            try {
                const response = await axios.delete(ART_SCHOOL_CONSTANTS.DELETE_SUBJECT_STUDY_PERIOD_COURSE_DETAILS_URL, {
                    params: {
                        subjectId: compositeId.subjectId,
                        studyPeriodId: compositeId.studyPeriodId,
                        courseId: compositeId.courseId,
                        studyYearId: compositeId.studyYearId,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
    };

    const teacherCourseConfigurationApi = {
        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_TEACHER_COURSE_CONFIGURATION_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {

                throw error;
            }
        },

        getTeachersBySubjectStudyPeriodCourseDetails: async (token, compositeId) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_TEACHERS_BY_SUBJECT_STUDY_PERIOD_COURSE_DETAILS_ID_URL, {
                    params: {
                        subjectId: compositeId.subjectId,
                        studyPeriodId: compositeId.studyPeriodId,
                        courseId: compositeId.courseId,
                        studyYearId: compositeId.studyYearId
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
    };

    const studentApi = {
        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_STUDENTS_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {

                throw error;
            }
        },

        getByEmail: async (token, email) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_STUDENT_BY_EMAIL_URL, {
                    params: {
                        email: email.toString(),
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        add: async (token, student) => {
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.ADD_STUDENT_URL, JSON.stringify(student), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
    };

    const studentRegistrationDocumentApi = {
        add: async (token, studentRegistrationDocument) => {
            const formData = new FormData();
            formData.append('document', studentRegistrationDocument.pdfDocument);
            formData.append('studentId', studentRegistrationDocument.studentRegistrationDocumentId.studentId);
            formData.append('documentId', studentRegistrationDocument.studentRegistrationDocumentId.registrationDocumentId);
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.ADD_STUDENT_REGISTRATION_DOCUMENT_URL, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
    };

    const studentSubjectStudyPeriodDetailsApi = {
        add: async (token, data) => {
            const formData = new FormData();
            formData.append('document', data.registrationForm);
            formData.append('studentId', data.studentSubjectStudyPeriodDetailsId.studentId);
            formData.append('subjectId', data.studentSubjectStudyPeriodDetailsId.subjectId);
            formData.append('studyPeriodId', data.studentSubjectStudyPeriodDetailsId.studyPeriodId);
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.ADD_STUDENT_SUBJECT_STUDY_PERIOD_DETAILS_URL, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
    };

    const studentSubjectCourseGradeApi = {
        add: async (token, studentSubjectCourseGradeList) => {
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.ADD_STUDENT_COURSE_CONFIGURATION_URL, JSON.stringify(studentSubjectCourseGradeList), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        getStudentsByCourseConfigurations: async (token, compositeId) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_STUDENTS_BY_COURSE_CONFIGURATIONS_URL, {
                    params: {
                        subjectId: compositeId.subjectId,
                        studyPeriodId: compositeId.studyPeriodId,
                        courseId: compositeId.courseId,
                        studyYearId: compositeId.studyYearId,
                        teacherId: compositeId.teacherId
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        addGrade: async (token, studentSubjectCourseGradeList) => {
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.ADD_GRADES_URL, JSON.stringify(studentSubjectCourseGradeList), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
    }

    const contestTypeApi = {
        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_CONTEST_TYPES_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
        getByTypeName: async (token, typeName) => {
            const url = (ART_SCHOOL_CONSTANTS.GET_CONTEST_TYPE_BY_NAME).concat(`typeName=${typeName}`)
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },


    }

    const contestApi = {
        getAll: async (token) => {
            try {
                const response = await axios.get(ART_SCHOOL_CONSTANTS.GET_CONTEST_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
        getById: async (token, id) => {
            const url = (ART_SCHOOL_CONSTANTS.GET_CONTEST_BY_ID_URL).concat(`id=${id}`)
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
        add: async (token, contest) => {
            try {
                const response = await axios.post(ART_SCHOOL_CONSTANTS.ADD_CONTEST_URL, JSON.stringify(contest), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

        edit: async (token, contest) => {
            try {
                const response = await axios.put(ART_SCHOOL_CONSTANTS.EDIT_CONTEST_URL, JSON.stringify(contest), {
                    headers: {
                        Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
        delete: async (token, id) => {
            const url = (ART_SCHOOL_CONSTANTS.DELETE_CONTEST_URL).concat(`id=${id}`)
            try {
                const response = await axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },

    };

    const contestTypeStageApi = {
        getAllByContestId: async (token, id) => {
            const url = (ART_SCHOOL_CONSTANTS.GET_CONTEST_TYPE_STAGE_LIST_BY_CONTEST_ID_URL).concat(`id=${id}`)
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            } catch (error) {
                throw error;
            }
        },
    };

    // TODO : define here all requests
    return {
        artSchoolAuthorization: artSchoolAuthorization,
        roleApi: roleApi,
        userApi: userApi,
        countryApi: countryApi,
        countyApi: countyApi,
        cityApi: cityApi,
        secretaryApi: secretaryApi,
        teacherApi: teacherApi,
        studyPeriodApi: studyPeriodApi,
        subjectStudyPeriodsApi: subjectStudyPeriodsApi,
        registrationDocumentApi: registrationDocumentApi,
        courseApi: courseApi,
        subjectStudyPeriodCourseDetailsApi: subjectStudyPeriodCourseDetailsApi,
        teacherCourseConfigurationApi: teacherCourseConfigurationApi,
        studentApi: studentApi,
        studentRegistrationDocumentApi: studentRegistrationDocumentApi,
        studentSubjectStudyPeriodDetailsApi: studentSubjectStudyPeriodDetailsApi,
        studentSubjectCourseGradeApi: studentSubjectCourseGradeApi,
        contestTypeApi: contestTypeApi,
        contestApi: contestApi,
        contestTypeStageApi: contestTypeStageApi
    }
}

export default ArtSchoolApi