import React, {useEffect, useState} from 'react'
import {Field, Form, Formik} from "formik";
import useAuth from "../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {Button, Stack} from "@mui/material";
import useToast from "../utils/hooks/useToast";

function ProfileForm(config) {
    const model = config.model;
    const validationSchema = config.validationSchema;
    const handleSubmit = config.handleSubmit;
    const {auth} = useAuth();
    const navigate = useNavigate();

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
                        <div className="col-md-12">
                            <label className="form-label mt-4">
                                Nume utilizator
                            </label>
                            <Field
                                type="text"
                                className={errors.userName && touched.userName ? "form-control is-invalid" : "form-control"}
                                id="userName"
                                name="userName"
                                placeholder="Nume utilizator"
                                value={values.userName}
                            />
                            {errors.userName && touched.userName ? (
                                <div className={"invalid-message"}>{errors.userName}</div>
                            ) : null}
                        </div>

                        <div className="col-md-12">
                            <label className="form-label mt-4">
                                <div className={"d-flex"}>
                                    <div className={"col-md-10"}>
                                        Email
                                    </div>
                                </div>
                            </label>
                            <Field
                                type="email"
                                className={errors.email && touched.email ? "form-control is-invalid" : "form-control"}
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={values.email}
                                readOnly={true}
                            />
                            {errors.email && touched.email ? (
                                <div className={"invalid-message"}>{errors.email}</div>
                            ) : null}
                        </div>
                        <div className={"mt-5 d-flex justify-content-center"}>
                            <Button  variant="outlined"
                                     type="submit">
                                Actualizează profil
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default ProfileForm