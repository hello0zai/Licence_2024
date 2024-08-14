import React from 'react'
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import {Field, Form, Formik} from 'formik';

import {AuthenticationFormSchemaValidations} from "../utils/validations/ValidationsLibrary";
import ArtSchoolApi from "../api/art_school_api";
import useAuth from "../utils/hooks/useAuth";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ArtSchoolModelsForms from "../models/ArtSchoolModelsForms";
import useToast from "../utils/hooks/useToast";

function AuthenticationForm() {
    const validationSchema = AuthenticationFormSchemaValidations.authenticationFormSchema;
    const {setUserAuthenticated} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin_home";
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    const userAuthenticateFormModel = ArtSchoolModelsForms().userAuthenticateFormModel;
    const handleSubmit = async function (userAuthenticate, { setSubmitting, setFieldError }) {
        ArtSchoolApi().artSchoolAuthorization.authenticateMethod(userAuthenticate)
            .then(function (data) {
                const userAuthenticated = userAuthenticate;
                userAuthenticated.roles = data?.roles;
                userAuthenticated.token = data?.token;
                userAuthenticated.email = data?.user?.email;
                setUserAuthenticated({userAuthenticated});

                showSuccessToast("Autentificare reușită", `Bună ziua, ${data?.user?.userName}`);
                if (userAuthenticated.roles.includes("SECRETARY_ROLE")) {
                    navigate("/secretary/profile", {replace: true});
                }

                if (userAuthenticated.roles.includes("TEACHER_ROLE")) {
                    navigate("/teacher/profile", {replace: true});
                }

                if (userAuthenticated.roles.includes("STUDENT_ROLE")) {
                    navigate("/student/profile", {replace: true});
                }

                if (userAuthenticated.roles.includes("ADMIN_ROLE")) {
                    navigate("/profile", {replace: true});
                }

                // if (userAuthenticated.roles.includes("ADMIN_ROLE")) {
                //     navigate("/admin_home", {replace: true});
                // }
            })
            .catch(function (err) {
                if (err.response?.status == 404) {
                    showErrorToast("Autentificare eșuată", "Email invalid sau parolă incorectă");
                    setFieldError("email", "Email invalid");
                    setFieldError("password", "Parolă incorectă");
                } else if(err?.code.indexOf("ERR_NETWORK")!==-1){
                    showErrorToast("Autentificare eșuată", "A apărut o eroare cu serverul. Vă rugăm să încercați din nou mai târziu.");
                }
                console.error(err);
            }).finally(() => {
            setSubmitting(false);
        })};

    return (<Formik initialValues={userAuthenticateFormModel}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
        {({values, errors, touched}) => (<Form>
            <div className="form-group row">
                <div className="form-group col-md-12 mt-2">
                    <label htmlFor="exampleInputEmail1" className="form-label col-md-12">
                        <div className={"d-flex"}>
                            <div className={"col-md-2"}>
                                <h3><MdIcons.MdEmail className={"d-flex align-items-start"}/>
                                </h3>
                            </div>
                            <div className={"col-md-10"}>
                                Adresa Email
                            </div>
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
                        <div className={"invalid-message"}>{errors.email}</div>) : null}
                </div>

                <div className="form-group col-md-12 mt-4">
                    <label className="form-label col-md-12">
                        <div className={"d-flex"}>
                            <div className={"col-md-2"}>
                                <h3><BsIcons.BsLockFill className={"d-flex align-items-start"}/>
                                </h3>
                            </div>
                            <div className={"col-md-10"}>
                                Parola
                            </div>
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
                        <div className={"invalid-message"}>{errors.password}</div>) : null}
                </div>

                <div className="form-group col-md-12 mt-5">
                    <div className={"text-center"}>
                        <b>
                            <Link className={"link"} to="/register">Înregistrează un cont de student</Link>
                        </b>
                    </div>
                </div>

                <div className="form-group col-md-12 mt-1">
                    <button type="submit" className="btn btn-primary col-md-12">Login</button>
                </div>
            </div>
        </Form>)}
    </Formik>)
}

export default AuthenticationForm
