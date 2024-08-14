import React, {useEffect, useState} from 'react'
import {Field, Form, Formik} from "formik";
import {Button, Stack} from "@mui/material";
import useAuth from "../utils/hooks/useAuth";
import routes from "../routes/ArtSchoolRoutes";
import {useNavigate} from "react-router-dom";
import ArtSchoolApi from "../api/art_school_api";
import useToast from "../utils/hooks/useToast";

function SubjectByStudyPeriodForm(config) {
    const model = config.model;
    const validationSchema = config.validationSchema;
    const handleSubmit = config.handleSubmit;
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [studyPeriodList, setStudyPeriodList] = useState();
    const [durationPeriodOptionsList, setDurationPeriodOptionsList] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            (function getData() {
                ArtSchoolApi().studyPeriodApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (studyPeriodList) {
                        setStudyPeriodList(studyPeriodList);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const goToList = function () {
        navigate(routes.adminRoutes.SubjectListComponent.path, {replace: true});
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
                                <label className="form-label mt-4">
                                    Denumire disciplină
                                </label>
                                <Field
                                    type="text"
                                    className={errors.subjectDto?.subjectName && touched.subjectDto?.subjectName ? "form-control is-invalid" : "form-control"}
                                    id="subjectDto.subjectName"
                                    name="subjectDto.subjectName"
                                    placeholder="Denumire disciplină"
                                    value={values.subjectDto.subjectName}
                                    readOnly={config.deleteAction}/>
                                {errors.subjectDto?.subjectName && touched.subjectDto?.subjectName ? (
                                    <div className={"invalid-message"}>{errors.subjectDto.subjectName}</div>
                                ) : null}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label mt-4">Perioadă de studiu</label>
                                <Field
                                    as="select"
                                    className={errors.studyPeriodDto?.studyPeriodId && errors.studyPeriodDto?.studyPeriodId ? "form-control form-select is-invalid" : "form-control form-select"}
                                    id="studyPeriodDto.studyPeriodId"
                                    value={values.studyPeriodDto.studyPeriodId}
                                    disabled={config.deleteAction}
                                >
                                    <option value="">Selectați o perioadă de studiu</option>
                                    {studyPeriodList?.map(studyPeriod =>
                                        <option value={studyPeriod.studyPeriodId}
                                                key={studyPeriod.studyPeriodId}>{studyPeriod.studyPeriodName}</option>
                                    )}
                                </Field>
                                {errors.studyPeriodDto?.studyPeriodId && touched.studyPeriodDto?.studyPeriodId ? (
                                    <div className={"invalid-message"}>{errors.studyPeriodDto?.studyPeriodId}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <label className="form-label mt-4">
                                    Taxă anuală
                                </label>
                                <Field
                                    type="number"
                                    className={errors.yearlySubjectTax && touched.yearlySubjectTax ? "form-control is-invalid" : "form-control"}
                                    id="yearlySubjectTax"
                                    name="yearlySubjectTax"
                                    placeholder="Taxă anuală"
                                    value={values.yearlySubjectTax}
                                    readOnly={config.deleteAction}
                                    onBlur={(event) => {
                                        changeNumberValue(event, values, setFieldValue, "yearlySubjectTax", setTouched, touched)
                                    }
                                    }
                                />
                                {errors.yearlySubjectTax && touched.yearlySubjectTax ? (
                                    <div className={"invalid-message"}>{errors.yearlySubjectTax}</div>
                                ) : null}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label mt-4">Durată studiu (ani)</label>
                                <Field
                                    as="select"
                                    className={errors.durationPeriod && touched.durationPeriod ? "form-control is-invalid" : "form-control"}
                                    id="durationPeriod"
                                    value={values.durationPeriod}
                                    disabled={config.deleteAction}
                                >
                                    <option value="">Durată studiu</option>
                                    {durationPeriodOptionsList?.map(durationPeriod =>
                                        <option value={durationPeriod}
                                                key={durationPeriod}>{durationPeriod.toString()}</option>
                                    )}
                                </Field>
                                {errors.durationPeriod && touched.durationPeriod ? (
                                    <div className={"invalid-message"}>{errors.durationPeriod}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <label className="form-label mt-4">
                                    Număr locuri disponibile
                                </label>
                                <Field
                                    type="text"
                                    className={errors.availableSpots && touched.availableSpots ? "form-control is-invalid" : "form-control"}
                                    id="availableSpots"
                                    name="availableSpots"
                                    placeholder="Număr locuri disponibile"
                                    value={values.availableSpots}
                                    readOnly={config.deleteAction}/>
                                {errors.availableSpots && touched.availableSpots ? (
                                    <div className={"invalid-message"}>{errors.availableSpots}</div>
                                ) : null}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default SubjectByStudyPeriodForm
