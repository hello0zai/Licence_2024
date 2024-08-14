import React, {useEffect, useState} from 'react'
import useAuth from "../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import ArtSchoolApi from "../api/art_school_api";
import routes from "../routes/ArtSchoolRoutes";
import {Field, Form, Formik} from "formik";
import {Button, Stack} from "@mui/material";
import {MultiSelect} from "primereact/multiselect";
import useToast from "../utils/hooks/useToast";


function CourseDetailsForm(config) {
    const model = config.model;
    const validationSchema = config.validationSchema;
    const handleSubmit = config.handleSubmit;
    const {auth} = useAuth();
    const navigate = useNavigate();

    const [subjectList, setSubjectList] = useState();
    const [studyPeriodList, setStudyPeriodList] = useState();
    const [subjectStudyPeriodList, setSubjectStudyPeriodList] = useState();
    const [teacherList, setTeacherList] = useState();
    const [studyYearList, setStudyYearList] = useState([]);
    const [courseList, setCourseList] = useState();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    useEffect(iterable => {
        if (auth?.userAuthenticated?.token) {
            (function getStudyPeriods() {
                ArtSchoolApi().studyPeriodApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (studyPeriodList) {
                        setStudyPeriodList(studyPeriodList);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }());

            (function getTeachers() {
                ArtSchoolApi().teacherApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (teacherList) {
                        setTeacherList(teacherList);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }());

            (function getCourses() {
                ArtSchoolApi().courseApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (courseList) {
                        setCourseList(courseList);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }());

            if (model.subjectStudyPeriodDto.studyPeriodId !== '') {
                ArtSchoolApi().subjectStudyPeriodsApi.getSubjectsByStudyPeriodId(auth?.userAuthenticated?.token, model.subjectStudyPeriodDto.studyPeriodId)
                    .then(function (subjectList) {
                        setSubjectList(subjectList);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }

            if(model.subjectStudyPeriodDto !== '') {
                const durationPeriod = model.subjectStudyPeriodDto.durationPeriod;
                setStudyYearList(Array.from({length: durationPeriod}, (_, index) => index + 1));
            }
        }
    }, [auth, model]);

    const handleStudyPeriodDropdown = function (event, values) {
        const currentStudyPeriodSelected = event.currentTarget.value;
        values.subjectStudyPeriodId.studyPeriodId = currentStudyPeriodSelected;
        if (!currentStudyPeriodSelected) {
            setSubjectList([]);
            values.subjectStudyPeriodId.subjectId = '';
            values.studyYear = '';
            setStudyYearList([]);
            return;
        }
        ArtSchoolApi().subjectStudyPeriodsApi.getSubjectsByStudyPeriodId(auth?.userAuthenticated?.token, currentStudyPeriodSelected)
            .then(function (subjectList) {
                setSubjectList(subjectList);
                values.subjectStudyPeriodId.subjectId = '';
                values.studyYear = '';
                setStudyYearList([]);
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    const handleSubjectDropdown = function (event, values) {
        values.subjectStudyPeriodId.subjectId = event.currentTarget.value;
        // values.subjectStudyPeriodId.studyPeriodId = values.subjectStudyPeriodDto.studyPeriodId;
        values.studyYear = '';
        setStudyYearList([]);
        ArtSchoolApi().subjectStudyPeriodsApi.getById(auth?.userAuthenticated?.token, values.subjectStudyPeriodId)
            .then(function (subjectStudyPeriod) {
                values.studyYear = '';
                values.subjectStudyPeriodDto = subjectStudyPeriod;
                setStudyYearList(Array.from({length: subjectStudyPeriod.durationPeriod}, (_, index) => index + 1));
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    const goToList = function () {
        navigate(routes.adminRoutes.CourseListComponent.path, {replace: true});
    }

    const changeNumberValue = function (event, values, setFieldValue, fieldName, setTouched, touched) {
        const value = event.target.value;
        setFieldValue(fieldName, '');
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            const newValue = parseFloat(values[fieldName]).toFixed(2);
            setFieldValue(fieldName, newValue);
        }
        setTouched({...touched, [fieldName]: true});
    }

    return (
        <>
            <Formik
                initialValues={model}
                validationSchema={validationSchema}
                enableReinitialize={true}
                validateOnBlur
                onSubmit={(values) => handleSubmit(values)}
                className={"simple-form"}>
                {({values, errors, touched, setFieldValue, setTouched}) => (
                    <Form>
                        <div className="row">
                            <div className="col-md-6">
                                <h4>{config.action}</h4>
                            </div>
                            <div className="col-md-6 d-flex justify-content-end">
                                <Stack direction="row" spacing={1}>
                                    <Button variant="outlined"
                                            startIcon={config.buttonsConfig.actionButton.buttonIcon} type="submit">
                                        {config.buttonsConfig.actionButton.title}
                                    </Button>
                                    <Button variant="outlined" startIcon={config.buttonsConfig.backButton.buttonIcon}
                                            onClick={goToList}>
                                        {config.buttonsConfig.backButton.title}
                                    </Button>
                                </Stack>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <label className="form-label mt-4">Denumire curs</label>
                                <Field
                                    as="select"
                                    className={errors.courseId && touched.courseId ? "form-control form-select is-invalid" : "form-control form-select"}
                                    id="courseId"
                                    value={values.courseId}
                                    disabled={config.deleteAction || config.editAction}
                                >
                                    <option value="">Selectați un curs</option>
                                    {courseList?.map(course =>
                                        <option value={course.courseId}
                                                key={course.courseId}>{course.courseName}</option>
                                    )}
                                </Field>
                                {errors.courseId && touched.courseId ? (
                                    <div
                                        className={"invalid-message"}>{errors.courseId}</div>
                                ) : null}
                            </div>


                            <div className="col-md-6">
                                <label className="form-label mt-4">
                                    Durată curs
                                </label>
                                <Field
                                    type="number"
                                    className={errors.classHoursDuration && touched.classHoursDuration ? "form-control is-invalid" : "form-control"}
                                    id="classHoursDuration"
                                    name="classHoursDuration"
                                    placeholder="Durată curs"
                                    value={values.classHoursDuration}
                                    readOnly={config.deleteAction}
                                />
                                {errors.classHoursDuration && touched.classHoursDuration ? (
                                    <div className={"invalid-message"}>{errors.classHoursDuration}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-3">
                                <label className="form-label mt-4">Perioadă de studiu</label>
                                <Field
                                    as="select"
                                    className={errors.subjectStudyPeriodId?.studyPeriodId && touched.subjectStudyPeriodId?.studyPeriodId ? "form-control form-select is-invalid" : "form-control form-select"}
                                    id="subjectStudyPeriodId.studyPeriodId"
                                    value={values.subjectStudyPeriodId?.studyPeriodId}
                                    onChange={(ev) => {
                                        handleStudyPeriodDropdown(ev, values);
                                    }}
                                    disabled={config.deleteAction || config.editAction}
                                >
                                    <option value="">Selectați o perioadă de studiu</option>
                                    {studyPeriodList?.map(studyPeriod =>
                                        <option value={studyPeriod.studyPeriodId}
                                                key={studyPeriod.studyPeriodId}>{studyPeriod.studyPeriodName}</option>
                                    )}
                                </Field>
                                {errors.subjectStudyPeriodId?.studyPeriodId && touched.subjectStudyPeriodId?.studyPeriodId ? (
                                    <div
                                        className={"invalid-message"}>{errors.subjectStudyPeriodId.studyPeriodId}</div>
                                ) : null}
                            </div>

                            <div className="col-md-3">
                                <label className="form-label mt-4">Disciplină</label>
                                <Field
                                    as="select"
                                    className={errors.subjectStudyPeriodId?.subjectId && touched.subjectStudyPeriodId?.subjectId ? "form-control form-select is-invalid" : "form-control form-select"}
                                    id="subjectStudyPeriodId.subjectId"
                                    value={values.subjectStudyPeriodId.subjectId}
                                    disabled={config.deleteAction || config.editAction}
                                    onChange={(ev) => {
                                        handleSubjectDropdown(ev, values);
                                    }}
                                >
                                    <option value="">Selectați o disciplină</option>
                                    {subjectList?.map(subject =>
                                        <option value={subject.subjectId}
                                                key={subject.subjectId}>{subject.subjectName}</option>
                                    )}
                                </Field>
                                {errors.subjectStudyPeriodId?.subjectId && touched.subjectStudyPeriodId?.subjectId ? (
                                    <div className={"invalid-message"}>{errors.subjectStudyPeriodId.subjectId}</div>
                                ) : null}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label mt-4">Profesori</label>
                                <MultiSelect
                                    value={values.teacherDtoList}
                                    onChange={(e) => {
                                        setFieldValue('teacherDtoList', e.value);
                                    }}
                                    options={teacherList}
                                    optionLabel="lastName"
                                    placeholder="Selectați profesori"
                                    maxSelectedLabels={3}
                                    className={`form-select w-full md:w-20rem ${errors.teacherDtoList && touched.teacherDtoList ? 'is-invalid' : ''}`}
                                    panelClassName="custom-multiselect-panel"
                                    showHeader={false}
                                    disabled={config.deleteAction}
                                />
                                {errors.teacherDtoList && touched.teacherDtoList ? (
                                    <div className={"invalid-message"}>{errors.teacherDtoList}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <label className="form-label mt-4">An de studiu</label>
                                <Field
                                    as="select"
                                    className={errors.studyYear && touched.studyYear ? "form-control form-select is-invalid" : "form-control form-select"}
                                    id="studyYear"
                                    value={values.studyYear}
                                    disabled={config.deleteAction || config.editAction}
                                >
                                    <option value="">Selectați un an de studiu</option>
                                    {studyYearList?.map(studyYear =>
                                        <option value={studyYear}
                                                key={studyYear}>{studyYear}</option>
                                    )}
                                </Field>
                                {errors.studyYear && touched.studyYear ? (
                                    <div className={"invalid-message"}>{errors.studyYear}</div>
                                ) : null}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label mt-4">
                                    Număr cursuri pe săptămână
                                </label>
                                <Field
                                    type="number"
                                    className={errors.weeklyFrequencyCourse && touched.weeklyFrequencyCourse ? "form-control is-invalid" : "form-control"}
                                    id="weeklyFrequencyCourse"
                                    name="weeklyFrequencyCourse"
                                    placeholder="Număr cursuri pe săptămână"
                                    value={values.weeklyFrequencyCourse}
                                    readOnly={config.deleteAction}
                                />
                                {errors.weeklyFrequencyCourse && touched.weeklyFrequencyCourse ? (
                                    <div className={"invalid-message"}>{errors.weeklyFrequencyCourse}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <label className="form-label mt-4">
                                    Număr săptămâni
                                </label>
                                <Field
                                    type="number"
                                    className={errors.courseWeeksDuration && touched.courseWeeksDuration ? "form-control is-invalid" : "form-control"}
                                    id="courseWeeksDuration"
                                    name="courseWeeksDuration"
                                    placeholder="Număr săptămâni"
                                    value={values.courseWeeksDuration}
                                    readOnly={config.deleteAction}
                                />
                                {errors.courseWeeksDuration && touched.courseWeeksDuration ? (
                                    <div className={"invalid-message"}>{errors.courseWeeksDuration}</div>
                                ) : null}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default CourseDetailsForm
