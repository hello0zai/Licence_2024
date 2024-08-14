function ArtSchoolModelsForms() {
    const registerRequestModel = {
        userName: '',
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        enabled: true,
        roleNames: [],
        roles: []
    };

    const authenticationRequestModel = {
        token: '',
        userName: '',
        email: '',
        password: ''
    };

    const userAuthenticateFormModel = {
        email: '',
        password: ''
    };

    const adminCreateFormModel = {
        userName: '',
        email: '',
        enabled: '',
        roleIds: []
    };

    const teacherCreateFormModel = {
        userId: '',
        lastName: '',
        firstName: '',
        personalEmail: '',
        fullAddress: '',
        cnp: '',
        phoneNumber: '',
        cityId: '',
        countyId: '',
        userAccount: {
            userName: '',
            email: '',
            enabled: '',
            roleIds: []
        },
    };

    const secretaryCreateFormModel = {
        lastName: '',
        firstName: '',
        personalEmail: '',
        fullAddress: '',
        cnp: '',
        phoneNumber: '',
        cityId: '',
        countyId: '',
        userAccount: {
            userName: '',
            email: '',
            enabled: '',
            roleIds: []
        },
    };

    const profileFormModel = {
        profileImage: '',
        userName: '',
        email: '',
        enabled: '',
        password: ''
    };

    const subjectStudyPeriodFormModel = {
        subjectStudyPeriodId: {
            subjectId: '',
            studyPeriodId: '',
        },
        yearlySubjectTax: '',
        durationPeriod: '',
        availableSpots: '',
        subjectId: '',
        subjectDto: {
            subjectId: '',
            subjectName: '',
            subjectStudyPeriodDtoList: []
        },
        studyPeriodId: '',
        studyPeriodDto: {
            studyPeriodId: '',
            studyPeriodName: '',
            subjectStudyPeriodList: [],
        },
        studentSubjectStudyPeriodDetailsDtoList: [],
        subjectStudyPeriodCourseDetailDtoList: [],
    };

    const registrationDocumentFormModel = {
        registrationDocumentId: '',
        documentName: '',
        description: '',
        mandatory: true,
        studentRegistrationDocumentDtoList: [],
    };

    const courseFormModel = {
        subjectStudyPeriodCourseDetailsId: {
            subjectId: '',
            studyPeriodId: '',
            courseId: '',
            studyYearId: ''
        },
        examName: '',
        examType: '',
        classHoursDuration: '',
        weeklyFrequencyCourse: '',
        courseWeeksDuration: '',
        studyYear: '',
        subjectStudyPeriodId: {
            subjectId: '',
            studyPeriodId: '',
        },
        subjectStudyPeriodDto: subjectStudyPeriodFormModel,
        courseId: '',
        courseDto: {
            courseId: '',
            courseName: '',
            subjectStudyPeriodCourseDetailsDtoList: [],
        },
        teacherIds: [],
        teacherDtoList: [],
    };

    const studentModel = {
        userId: '',
        lastName: '',
        firstName: '',
        personalEmail: '',
        fullAddress: '',
        cnp: '',
        phoneNumber: '',
        cityId: '',
        countyId: '',
        occupation: '',
        studies: '',
        userAccount: {
            userId: '',
            userName: '',
            email: '',
            enabled: '',
            roleIds: []
        },
    };

    const studentSubjectStudyPeriodDetailsModel = {
        studentSubjectStudyPeriodDetailsId: {
            studentId: '',
            subjectId: '',
            studyPeriodId: '',
        },
        studyYear: '',
        registrationForm: '',
        currentYear: '',
        studentId: '',
        studentDto: studentModel,
        subjectStudyPeriodId: {
            subjectId: '',
            studyPeriodId: '',
        },
        subjectStudyPeriodDto: subjectStudyPeriodFormModel
    };

    const studentRegistrationDocumentModel = {
        studentRegistrationDocumentId: {
            studentId: '',
            registrationDocumentId: '',
        },
        studentId: '',
        studentDto: studentModel,
        registrationDocumentId: '',
        registrationDocumentDto: registrationDocumentFormModel,
        secretaryId: '',
        pdfDocument: '',
        secretaryDto: secretaryCreateFormModel
    };

    const studentSubjectCourseGradeModel = {
        studentSubjectCourseGradeId: {
            subjectId: '',
            studyPeriodId: '',
            courseId: '',
            studyYearId: '',
            studentId: '',
        },
        grade: '',
        passed: '',
        examDate: '',
        teacherId: '',
        teacherDto: teacherCreateFormModel,
        studentId: '',
        studentDto: studentModel,
        subjectStudyPeriodCourseDetailsId: {
            subjectId: '',
            studyPeriodId: '',
            courseId: '',
            studyYearId: ''
        },
        subjectStudyPeriodCourseDetails: courseFormModel,
        checked: ''
    };

    const contestModel = {
        contestId: '',
        contestName: null,
        startDate: null,
        endDate: null,
        contestTypeId: '',
        INCARCAREA_DOCUMENTELOR: {
            startDate: null,
            endDate: null,
            stageDto: {
                stageId: '',
                stageName: 'INCARCAREA_DOCUMENTELOR'
            },
            roleDto: {
                roleId: '',
                name: 'STUDENT'
            }
        },
        VALIDAREA_DOCUMENTELOR: {
            startDate: null,
            endDate: null,
            stageDto: {
                stageId: '',
                stageName: 'VALIDAREA_DOCUMENTELOR'
            },
            roleDto: {
                roleId: '',
                name: 'SECRETARY'
            }
        },
        EXAMEN_ADMITERE: {
            startDate: null,
            endDate: null,
            stageDto: {
                stageId: '',
                stageName: 'EXAMEN_ADMITERE'
            },
            roleDto: {
                roleId: '',
                name: 'SECRETARY'
            }
        },
        AFISAREA_REZULTATELOR: {
            startDate: null,
            endDate: null,
            stageDto: {
                stageId: '',
                stageName: 'AFISAREA_REZULTATELOR'
            },
            roleDto: {
                roleId: '',
                name: 'SECRETARY'
            }
        },
        contestTypeStageDtoList: []
    }

    return {
        registerRequestModel: registerRequestModel,
        authenticationRequestModel: authenticationRequestModel,
        userAuthenticateFormModel: userAuthenticateFormModel,
        profileFormModel: profileFormModel,
        adminCreateFormModel: adminCreateFormModel,
        secretaryCreateFormModel: secretaryCreateFormModel,
        teacherCreateFormModel: teacherCreateFormModel,
        subjectStudyPeriodFormModel: subjectStudyPeriodFormModel,
        registrationDocumentFormModel: registrationDocumentFormModel,
        courseFormModel: courseFormModel,
        studentModel: studentModel,
        studentSubjectStudyPeriodDetailsModel: studentSubjectStudyPeriodDetailsModel,
        studentRegistrationDocumentModel: studentRegistrationDocumentModel,
        studentSubjectCourseGradeModel: studentSubjectCourseGradeModel,
        contestModel: contestModel
    };
}

export default ArtSchoolModelsForms;