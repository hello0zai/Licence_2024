import React from 'react'
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import {Field, Form, Formik} from 'formik';

import {
    RegisterFormSchemaValidations
} from "../utils/validations/ValidationsLibrary";
import ArtSchoolApi from "../api/art_school_api";
import useAuth from "../utils/hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import ArtSchoolModelsForms from "../models/ArtSchoolModelsForms";
import useToast from "../utils/hooks/useToast";
import {FaUser, FaUserLock} from "react-icons/fa";
import {PiStudentFill} from "react-icons/pi";

function RegisterForm() {
    const validationSchema = RegisterFormSchemaValidations.registerFormSchema;
    const {setUserAuthenticated} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin_home";
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    const userRegisterFormModel = ArtSchoolModelsForms().registerRequestModel;
    userRegisterFormModel.roleNames.push("Student");

    const handleSubmit = async function (userRegisterFormModel) {
        // userAuthenticate.email = userAuthenticate.email;
        ArtSchoolApi().artSchoolAuthorization.registerMethod(userRegisterFormModel)
            .then(function (data) {
                navigate("/login", {replace: true});
                showSuccessToast("", "Contul a fost inregistrat cu succes!");
            })
            .catch(function (err) {
                showSuccessToast("", "A aparut o eroare. Va rugam sa contactati un administrator.");
                console.error(err);
            });
    };

    return (
        <Formik initialValues={
            userRegisterFormModel
        }
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
            {({values, errors, touched}) => (
                <Form>
                    <div className="form-group">
                        <div className="d-flex row mt-3">
                            <div className={"col-md-6"}>
                                <label htmlFor="lastName" className="form-label col-md-12">
                                    <div className={"d-flex"}>

                                        <MdIcons.MdDriveFileRenameOutline className={"align-items-start"} size={24}/>
                                        <div> Nume de familie</div>
                                    </div>
                                </label>
                                <Field
                                    type="text"
                                    className={errors.lastName && touched.lastName ? "form-control is-invalid" : "form-control"}
                                    id="lastName"
                                    name="lastName"
                                    aria-describedby="lastName"
                                    placeholder="Nume de familie"
                                    value={values.lastName}/>
                                {errors.lastName && touched.lastName ? (
                                    <div className={"invalid-message"}>{errors.lastName}</div>
                                ) : null}
                            </div>

                            <div className={"col-md-6"}>
                                <label htmlFor="firstName" className="form-label col-md-12">
                                    <div className={"d-flex"}>
                                        <MdIcons.MdDriveFileRenameOutline className={"align-items-start"} size={24}/>
                                        Prenume
                                    </div>
                                </label>
                                <Field
                                    type="text"
                                    className={errors.firstName && touched.firstName ? "form-control is-invalid" : "form-control"}
                                    id="firstName"
                                    name="firstName"
                                    aria-describedby="firstName"
                                    placeholder="Prenume"
                                    value={values.firstName}/>
                                {errors.firstName && touched.firstName ? (
                                    <div className={"invalid-message"}>{errors.firstName}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="d-flex row mt-3">
                            <div className={"col-md-6"}>
                                <label htmlFor="userName" className="form-label col-md-12">
                                    <div className={"d-flex"}>
                                        <FaUser className={"align-items-start"} size={24}/>
                                        Nume utilizator
                                    </div>
                                </label>
                                <Field
                                    type="text"
                                    className={errors.userName && touched.userName ? "form-control is-invalid" : "form-control"}
                                    id="userName"
                                    name="userName"
                                    aria-describedby="userName"
                                    placeholder="Nume de familie"
                                    value={values.userName}/>
                                {errors.userName && touched.userName ? (
                                    <div className={"invalid-message"}>{errors.userName}</div>
                                ) : null}
                            </div>

                            <div className={"col-md-6"}>
                                <label htmlFor="email" className="form-label col-md-12">
                                    <div className={"d-flex"}>
                                        <MdIcons.MdEmail className={"align-items-start"} size={24}/>
                                        Email
                                    </div>
                                </label>
                                <Field
                                    type="text"
                                    className={errors.email && touched.email ? "form-control is-invalid" : "form-control"}
                                    id="email"
                                    name="email"
                                    aria-describedby="email"
                                    placeholder="Email"
                                    value={values.email}/>
                                {errors.email && touched.email ? (
                                    <div className={"invalid-message"}>{errors.email}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="d-flex row mt-3">
                            <div className="col-md-6">
                                <label className="form-label col-md-12">
                                    <div className={"d-flex"}>
                                        <FaUserLock className={"align-items-start"} size={24}/>
                                        Parola
                                    </div>
                                </label>
                                <Field type="password"
                                       className={errors.password && touched.password ? "form-control is-invalid" : "form-control"}
                                       id="password"
                                       placeholder="Password"
                                       name="password"
                                       aria-describedby="password"
                                       value={values.password}
                                />
                                {errors.password && touched.password ? (
                                    <div className={"invalid-message"}>{errors.password}</div>
                                ) : null}
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="role" className="form-label col-md-12">
                                    <div className={"d-flex"}>
                                        <PiStudentFill className={"align-items-start"} size={24}/>
                                        Rol
                                    </div>
                                </label>
                                <Field
                                    type="text"
                                    readOnly={true}
                                    className={errors.roleNames && touched.roleNames ? "form-control is-invalid" : "form-control"}
                                    id="role"
                                    name="role"
                                    aria-describedby="role"
                                    placeholder="Rol"
                                    value={values.roleNames[0]}/>
                                {errors.roleNames && touched.roleNames ? (
                                    <div className={"invalid-message"}>{errors.roleNames}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="form-group col-md-12 mt-5">
                            <button type="submit" className="btn btn-primary col-md-12">Register</button>
                        </div>
                    </div>
                </Form>)}
        </Formik>
    )
}

export default RegisterForm
