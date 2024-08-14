import React from 'react'
import * as Yup from 'yup';

class RegisterFormValidations {
    constructor() {
        this.registerFormSchema = Yup.object().shape({
            userName: Yup.string().required('Câmp obligatoriu'),
            lastName: Yup.string().required('Câmp obligatoriu'),
            firstName: Yup.string().required('Câmp obligatoriu'),
            email: Yup.string().required('Câmp obligatoriu').matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Invalid format"),
            password: Yup.string().required('Câmp obligatoriu'),
            roleNames: Yup.array().of(
                Yup.string().transform(value => value.toUpperCase()).required('Câmp obligatoriu').oneOf(["STUDENT", "SECRETAR", "PROFESOR", "ADMINISTRATOR"], "Rol inexistent")
            )
        });
    }

    getSchema() {
        return this.registerFormSchema;
    }
}

class AuthenticationFormValidations {
    constructor() {
        this.authenticationFormSchema = Yup.object().shape({
            email: Yup.string().required('Câmp obligatoriu').matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Invalid format"),
            password: Yup.string().required('Câmp obligatoriu')
        });
    }

    getSchema() {
        return this.authenticationFormSchema;
    }
}

class AdminCreateFormValidations {
    constructor() {
        this.adminCreateFormFormSchema = Yup.object().shape({
            userName: Yup.string().required('Câmp obligatoriu').matches(/^[a-zA-Z0-9_]{3,255}$/, "Numele de utilizator introdus nu este valid."),
            email: Yup.string().required('Câmp obligatoriu').matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Invalid format")
        });
    }

    getSchema() {
        return this.adminCreateFormFormSchema;
    }
}

class Secretary {
    constructor() {
        this.secretaryCreateFormFormSchema = Yup.object().shape({
            userAccount: Yup.object().shape({
                userName: Yup.string().required('Câmp obligatoriu').matches(/^[a-zA-Z0-9_]{3,255}$/, "Numele de utilizator invalid"),
            }),
            personalEmail: Yup.string().required('Câmp obligatoriu').matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Email invalid"),
            countyId: Yup.string().required('Câmp obligatoriu'),
            cityId: Yup.string().required('Câmp obligatoriu'),
            lastName: Yup.string().required('Câmp obligatoriu').matches(/^[A-ZĂÂÎȘȚ][A-Za-zăâîșțĂÂÎȘȚa-zăâîșțĂÂÎȘȚ]{2,254}$/, "Nume invalid"),
            firstName: Yup.string().required('Câmp obligatoriu').matches(/^[A-ZĂÂÎȘȚ][A-Za-zăâîșțĂÂÎȘȚa-zăâîșțĂÂÎȘȚ]{2,254}$/, "Prenume invalid"),
            cnp: Yup.string().required('Câmp obligatoriu'),
            phoneNumber: Yup.string().required('Câmp obligatoriu').matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, "Număr de telefon invalid"),
            fullAddress: Yup.string().required('Câmp obligatoriu'),
        });

        this.secretaryUpdateFormFormSchema = Yup.object().shape({
            user: Yup.object().shape({
                userName: Yup.string().required('Câmp obligatoriu').matches(/^[a-zA-Z0-9_]{3,255}$/, "Numele de utilizator invalid"),
            }),
            city: Yup.object().shape({
                cityName: Yup.string().required('Câmp obligatoriu'),
            }),
            personalEmail: Yup.string().required('Câmp obligatoriu').matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Email invalid"),
            countyId: Yup.string().required('Câmp obligatoriu'),
            lastName: Yup.string().required('Câmp obligatoriu').matches(/^[A-ZĂÂÎȘȚ][A-Za-zăâîșțĂÂÎȘȚa-zăâîșțĂÂÎȘȚ]{2,254}$/, "Nume invalid"),
            firstName: Yup.string().required('Câmp obligatoriu').matches(/^[A-ZĂÂÎȘȚ][A-Za-zăâîșțĂÂÎȘȚa-zăâîșțĂÂÎȘȚ]{2,254}$/, "Prenume invalid"),
            cnp: Yup.string().required('Câmp obligatoriu'),
            phoneNumber: Yup.string().required('Câmp obligatoriu').matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, "Număr de telefon invalid"),
            fullAddress: Yup.string().required('Câmp obligatoriu'),
        });
    }

    getSchema() {
        return this.secretaryCreateFormFormSchema;
    }
}

class TeacherCreateFormValidations {
    constructor() {
        this.teacherCreateFormFormSchema = Yup.object().shape({
            userAccount: Yup.object().shape({
                userName: Yup.string().required('Câmp obligatoriu').matches(/^[a-zA-Z0-9_]{3,255}$/, "Numele de utilizator invalid"),
            }),
            personalEmail: Yup.string().required('Câmp obligatoriu').matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Email invalid"),
            countyId: Yup.string().required('Câmp obligatoriu'),
            cityId: Yup.string().required('Câmp obligatoriu'),
            lastName: Yup.string().required('Câmp obligatoriu').matches(/^[A-ZĂÂÎȘȚ][A-Za-zăâîșțĂÂÎȘȚa-zăâîșțĂÂÎȘȚ]{2,254}$/, "Nume invalid"),
            firstName: Yup.string().required('Câmp obligatoriu').matches(/^[A-ZĂÂÎȘȚ][A-Za-zăâîșțĂÂÎȘȚa-zăâîșțĂÂÎȘȚ]{2,254}$/, "Prenume invalid"),
            cnp: Yup.string().required('Câmp obligatoriu'),
            phoneNumber: Yup.string().required('Câmp obligatoriu').matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, "Număr de telefon invalid"),
            fullAddress: Yup.string().required('Câmp obligatoriu'),
        });
    }

    getSchema() {
        return this.teacherCreateFormFormSchema;
    }
}

class SubjectFormValidations {
    constructor() {
        this.subjectFormSchema = Yup.object().shape({
            yearlySubjectTax: Yup.number().required('Câmp obligatoriu').positive('Valoarea nu poate fi negativa!').min(100, "Taxa nu poate fi mai mică de 100 de lei").max(100000, "Taxa nu poate fi mai mare de 1.000.000 de lei"),
            durationPeriod: Yup.string().required('Câmp obligatoriu'),
            availableSpots: Yup.number().required('Câmp obligatoriu'),
            subjectDto: Yup.object().shape({
                subjectName: Yup.string().required('Câmp obligatoriu'),
            }),
            studyPeriodDto: Yup.object().shape({
                studyPeriodId: Yup.string().required('Câmp obligatoriu'),
            }),
        });
    }

    getSchema() {
        return this.subjectFormSchema;
    }

}

class ProfileFormValidations {
    constructor() {
        this.profileFormSchema = Yup.object().shape({
            email: Yup.string().required('Câmp obligatoriu').matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Invalid format"),
            userName: Yup.string().required('Câmp obligatoriu').matches(/^[a-zA-Z0-9_]{3,255}$/, "Numele de utilizator invalid"),
        });
    }

    getSchema() {
        return this.profileFormSchema;
    }
}

class RegistrationDocumentFormValidations {
    constructor() {
        this.registrationDocumentFormSchema = Yup.object().shape({
            documentName: Yup.string().required('Câmp obligatoriu'),
            description: Yup.string().required('Câmp obligatoriu'),
            mandatory: Yup.boolean().required('Câmp obligatoriu'),
        });
    }

    getSchema() {
        return this.registrationDocumentFormSchema;
    }
}

class ContestFormValidations {
    constructor() {
        this.contestFormSchema = Yup.object().shape({
            contestTypeId: Yup.string().required('Câmp obligatoriu'),
            contestName: Yup.string().required('Câmp obligatoriu'),
            startDate: Yup.date().required('Câmp obligatoriu')
                .test('valid-date','Data de început a concursului trebuie să fie cel puțin egală cu data de azi', function(value){
                    const currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0);

                    return value && new Date(value).getTime() >= currentDate.getTime();
                }),
            endDate: Yup.date()
                .required('Câmp obligatoriu')
                .test('is-greater', 'Data de sfârșit trebuie să fie mai mare decât data de început', function (value) {
                    const {startDate} = this.parent;
                    return startDate && value && new Date(startDate).getTime() < new Date(value).getTime();
                }),
            INCARCAREA_DOCUMENTELOR: Yup.object().shape({
                startDate: Yup.date().required('Câmp obligatoriu'),
                endDate: Yup.date()
                    .required('Câmp obligatoriu')
                    .test('is-greater', 'Data de sfârșit trebuie să fie mai mare decât data de început', function (value) {
                        const {startDate} = this.parent;
                        return startDate && value && new Date(startDate).getTime() < new Date(value).getTime();
                    }),
            }).test('checkFirstStage', "EROARE", function () {
                const contestStartDate = this.parent?.startDate || '';
                const firstStageStartDate = this.parent?.INCARCAREA_DOCUMENTELOR?.startDate || '';


                if (new Date(firstStageStartDate).getTime() !== new Date(contestStartDate).getTime()) {
                    return this.createError({
                        path: 'INCARCAREA_DOCUMENTELOR.startDate',
                        message: 'Data de început a primei etape trebuie să fie egală cu data de început a concursului'
                    });
                }

                return true;
            }),
            VALIDAREA_DOCUMENTELOR: Yup.object().shape({
                startDate: Yup.date().required('Câmp obligatoriu'),
                endDate: Yup.date()
                    .required('Câmp obligatoriu')
                    .test('is-greater', 'Data de sfârșit trebuie să fie mai mare decât data de început', function (value) {
                        const {startDate} = this.parent;
                        return startDate && value && new Date(startDate).getTime() < new Date(value).getTime();
                    }),
            }).test('is-greater-or-equal', 'EROARE', function (VALIDAREA_DOCUMENTELOR) {
                const previousDate = this.parent.INCARCAREA_DOCUMENTELOR.endDate;
                const startDate = VALIDAREA_DOCUMENTELOR.startDate;

                const isValid = previousDate && startDate && new Date(previousDate) <= new Date(startDate);

                if (!isValid) {
                    return this.createError({
                        path: 'VALIDAREA_DOCUMENTELOR.startDate',
                        message: 'Data de început trebuie să fie mai mare decât data de sfârșit anterioară'
                    });
                }

                return true;
            }),
            EXAMEN_ADMITERE: Yup.object().shape({
                startDate: Yup.date().required('Câmp obligatoriu'),
                endDate: Yup.date()
                    .required('Câmp obligatoriu')
                    .test('is-greater', 'Data de sfârșit trebuie să fie mai mare decât data de început', function (value) {
                        const {startDate} = this.parent;
                        return startDate && value && new Date(startDate).getTime() < new Date(value).getTime();
                    }),
            }).test('is-greater-or-equal', 'EROARE', function (EXAMEN_ADMITERE) {
                const previousDate = this.parent.VALIDAREA_DOCUMENTELOR.endDate;
                const startDate = EXAMEN_ADMITERE.startDate;

                const isValid = previousDate && startDate && new Date(previousDate) <= new Date(startDate);

                if (!isValid) {
                    return this.createError({
                        path: 'EXAMEN_ADMITERE.startDate',
                        message: 'Data de început trebuie să fie mai mare decât data de sfârșit anterioară'
                    });
                }

                return true;
            }),
            AFISAREA_REZULTATELOR: Yup.object().shape({
                startDate: Yup.date().required('Câmp obligatoriu'),
                endDate: Yup.date()
                    .required('Câmp obligatoriu')
                    .test('is-greater', 'Data de sfârșit trebuie să fie mai mare decât data de început', function (value) {
                        const {startDate} = this.parent;
                        return startDate && value && new Date(startDate).getTime() < new Date(value).getTime();
                    }),
            }).test('is-greater-or-equal', 'EROARE', function (AFISAREA_REZULTATELOR) {
                const previousDate = this.parent.EXAMEN_ADMITERE.endDate;
                const startDate = AFISAREA_REZULTATELOR.startDate;

                const isValid = previousDate && startDate && new Date(previousDate) <= new Date(startDate);

                if (!isValid) {
                    return this.createError({
                        path: 'AFISAREA_REZULTATELOR.startDate',
                        message: 'Data de început trebuie să fie mai mare decât data de sfârșit anterioară'
                    });
                }

                return true;
            })
                .test('checkLastStage', "EROARE", function () {
                    const contestEndDate = this.parent?.endDate || '';
                    const lastStageEndDate = this.parent?.AFISAREA_REZULTATELOR?.endDate || '';
                    if (new Date(contestEndDate).getTime() !== new Date(lastStageEndDate).getTime()) {
                        return this.createError({
                            path: 'AFISAREA_REZULTATELOR.endDate',
                            message: 'Data de sfârșit a ultimei etape trebuie să fie egală cu data de sfârșit a concursului'
                        });
                    }
                    return true;
                }),
        })
    }
    getSchema() {
        return this.contestFormSchema;
    }
}

class CourseFormValidations {
    constructor() {
        this.courseFormSchema = Yup.object().shape({
            subjectStudyPeriodId: Yup.object().shape({
                subjectId: Yup.string().required('Câmp obligatoriu'),
                studyPeriodId: Yup.string().required('Câmp obligatoriu'),
            }),
            courseId: Yup.string().required('Câmp obligatoriu'),
            classHoursDuration: Yup.number().required('Câmp obligatoriu').integer('Numărul trebuie să fie întreg.'),
            weeklyFrequencyCourse: Yup.number().required('Câmp obligatoriu').integer('Numărul trebuie să fie întreg.'),
            courseWeeksDuration: Yup.number().required('Câmp obligatoriu').integer('Numărul trebuie să fie întreg.'),
            studyYear: Yup.number().required('Câmp obligatoriu'),
            teacherDtoList: Yup.array()
                .of(Yup.object().shape({}).required('Selectați cel puțin un profesor'))
                .min(1, 'Selectați cel puțin un profesor')
                .required('Câmp obligatoriu'),
        });
    }

    getSchema() {
        return this.courseFormSchema;
    }
}

class StudentFormValidations {
    constructor() {
        this.studentFormFormSchema = Yup.object().shape({
            userAccount: Yup.object().shape({
                userName: Yup.string().required('Câmp obligatoriu').matches(/^[a-zA-Z0-9_]{3,255}$/, "Numele de utilizator invalid"),
            }),
            personalEmail: Yup.string().required('Câmp obligatoriu').matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Email invalid"),
            countyId: Yup.string().required('Câmp obligatoriu'),
            cityId: Yup.string().required('Câmp obligatoriu'),
            lastName: Yup.string().required('Câmp obligatoriu').matches(/^[A-ZĂÂÎȘȚ][A-Za-zăâîșțĂÂÎȘȚa-zăâîșțĂÂÎȘȚ]{2,254}$/, "Nume invalid"),
            firstName: Yup.string().required('Câmp obligatoriu').matches(/^[A-ZĂÂÎȘȚ][A-Za-zăâîșțĂÂÎȘȚa-zăâîșțĂÂÎȘȚ]{2,254}$/, "Prenume invalid"),
            cnp: Yup.string().required('Câmp obligatoriu'),
            phoneNumber: Yup.string().required('Câmp obligatoriu').matches(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, "Număr de telefon invalid"),
            fullAddress: Yup.string().required('Câmp obligatoriu'),
            occupation: Yup.string().required('Câmp obligatoriu'),
            studies: Yup.string().required('Câmp obligatoriu'),
        });
    }

    getSchema() {
        return this.studentFormFormSchema;
    }
}


export const RegisterFormSchemaValidations = new RegisterFormValidations();
export const AuthenticationFormSchemaValidations = new AuthenticationFormValidations();
export const AdminCreateFormSchemaValidations = new AdminCreateFormValidations();
export const SecretaryFromSchemas = new Secretary();
export const TeacherCreateFormSchemaValidations = new TeacherCreateFormValidations();
export const StudentFormSchemaValidations = new StudentFormValidations();
export const SubjectFormSchemaValidations = new SubjectFormValidations();
export const ProfileFormSchemaValidations = new ProfileFormValidations();
export const RegistrationDocumentFormSchemaValidations = new RegistrationDocumentFormValidations();
export const CourseFormSchemaValidations = new CourseFormValidations();

export const ContestFormSchemaValidations = new ContestFormValidations();
