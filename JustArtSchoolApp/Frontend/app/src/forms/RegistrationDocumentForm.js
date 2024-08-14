import React, {useState} from 'react'
import useAuth from "../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import routes from "../routes/ArtSchoolRoutes";
import {Field, Form, Formik} from "formik";
import {Button, Stack} from "@mui/material";

function RegistrationDocumentForm(config) {
    const model = config.model;
    const validationSchema = config.validationSchema;
    const handleSubmit = config.handleSubmit;
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const goToList = function () {
        navigate(routes.adminRoutes.RegistrationDocumentsListComponent.path, {replace: true});
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
                            <div className="col-md-9">
                                <label className="form-label mt-4">
                                    Denumire document
                                </label>
                                <Field
                                    type="text"
                                    className={errors.documentName && touched.documentName ? "form-control is-invalid" : "form-control"}
                                    id="documentName"
                                    name="documentName"
                                    placeholder="Denumire document"
                                    value={values.documentName}
                                    readOnly={config.deleteAction}/>
                                {errors.documentName && touched.documentName ? (
                                    <div className={"invalid-message"}>{errors.documentName}</div>
                                ) : null}
                            </div>

                            <div className="col-md-3">
                                <label className="form-label mt-4">Document obligatoriu</label>
                                <div className="">
                                    <Field
                                        type="checkbox"
                                        className={errors.mandatory && touched.mandatory ? "is-invalid form-check-input form-check-custom" : "form-check-input form-check-custom"}
                                        id="mandatory"
                                        name="mandatory"
                                        value={values.mandatory}
                                        checked={values.mandatory}
                                        disabled={config.deleteAction}/>
                                    {errors.mandatory && touched.mandatory ? (
                                        <div className={"invalid-message"}>{errors.mandatory}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-9">
                                <label className="form-label mt-4">
                                    Descriere
                                </label>
                                <Field
                                    component="textarea"
                                    className={errors.description && touched.description ? "form-control is-invalid big_input" : "form-control big_input"}
                                    id="description"
                                    name="description"
                                    placeholder="Descriere"
                                    value={values.description}
                                    readOnly={config.deleteAction}/>
                                {errors.description && touched.description ? (
                                    <div className={"invalid-message"}>{errors.description}</div>
                                ) : null}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default RegistrationDocumentForm