import React, {useEffect, useState} from 'react'
import useAuth from "../utils/hooks/useAuth";
import ArtSchoolApi from "../api/art_school_api";
import {Field, Form, Formik} from "formik";
import {Button, Stack} from "@mui/material";
import routes from "../routes/ArtSchoolRoutes";
import {useNavigate} from "react-router-dom";
import useToast from "../utils/hooks/useToast";

function TeacherForm(config) {
    const model = config.model;
    const validationSchema = config.validationSchema;
    const handleSubmit = config.handleSubmit;
    const navigate = useNavigate();

    const {auth} = useAuth();
    const [cities, setCities] = useState();
    const [counties, setCounties] = useState();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            (function getData() {
                ArtSchoolApi().countyApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (countyList) {
                        setCounties(countyList);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }());
            if (model.countyId) {
                ArtSchoolApi().cityApi.getAllByCountyId(auth?.userAuthenticated?.token, model.countyId)
                    .then(function (cityList) {
                        setCities(cityList);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });

            }
        }
    }, [auth, model]);

    const goToList = function () {
        navigate(routes.adminRoutes.UserListComponent.path, {replace: true});
    }

    const handleDropdownChange = function (event, values) {
        const currentCountySelected = event.currentTarget.value;
        values.countyId = currentCountySelected;
        if (!currentCountySelected) {
            setCities([]);
            return;
        }
        // try {
        ArtSchoolApi().cityApi.getAllByCountyId(auth?.userAuthenticated?.token, currentCountySelected)
            .then(function (cityList) {
                values.cityId = '';
                setCities(cityList);
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    return (
        <>
            <Formik
                initialValues={model}
                validationSchema={validationSchema}
                enableReinitialize={true}
                validateOnBlur
                onSubmit={(values) => handleSubmit(values)}
                className={"simple-form"}
            >
                {({values, errors, touched}) => (
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
                                    Nume
                                </label>
                                <Field
                                    type="text"
                                    className={errors.lastName && touched.lastName ? "form-control is-invalid" : "form-control"}
                                    id="lastName"
                                    name="lastName"
                                    aria-describedby="lastName"
                                    placeholder="Nume de familie"
                                    value={values.lastName}
                                    readOnly={config.deleteAction}
                                />
                                {errors.lastName && touched.lastName ? (
                                    <div className={"invalid-message"}>{errors.lastName}</div>) : null}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label mt-4">
                                    <div className={"d-flex"}>
                                        <div className={"col-md-10"}>
                                            Prenume
                                        </div>
                                    </div>
                                </label>
                                <Field
                                    type="text"
                                    className={errors.firstName && touched.firstName ? "form-control is-invalid" : "form-control"}
                                    id="firstName"
                                    name="firstName"
                                    aria-describedby="firstName"
                                    placeholder="Prenume"
                                    value={values.firstName}
                                    readOnly={config.deleteAction}
                                />
                                {errors.firstName && touched.firstName ? (
                                    <div className={"invalid-message"}>{errors.firstName}</div>) : null}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-3">
                                <label className="form-label mt-4">Județ</label>
                                <Field
                                    as="select"
                                    className={errors.countyId && touched.countyId ? "form-control form-select is-invalid" : "form-control form-select"}
                                    id={"countyId"}
                                    value={values.countyId}
                                    onChange={(ev) => {
                                        handleDropdownChange(ev, values);
                                    }}
                                    disabled={config.deleteAction}
                                >
                                    <option value="">Selectați un judet</option>
                                    {counties?.map(county => <option value={county.countyId}
                                                                     key={county.countyId}>{county.countyName}</option>)}
                                </Field>
                                {errors.countyId && touched.countyId ? (
                                    <div className={"invalid-message"}>{errors.countyId}</div>) : null}
                            </div>

                            <div className="col-md-3">
                                <label className="form-label mt-4">Localitate</label>
                                <Field
                                    as="select"
                                    className={errors.cityId && touched.cityId ? "form-control form-select is-invalid" : "form-control form-select"}
                                    id="cityId"
                                    value={values.cityId}
                                    disabled={config.deleteAction}
                                >
                                    <option value="">Selectați o localitate</option>
                                    {cities?.map(city => <option value={city.cityId}
                                                                 key={city.cityId}>{city.cityName}</option>)}
                                </Field>
                                {errors.cityId && touched.cityId ? (
                                    <div className={"invalid-message"}>{errors.cityId}</div>) : null}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label mt-4">
                                    <div className={"d-flex"}>
                                        <div>
                                            Adresa completa
                                        </div>
                                    </div>
                                </label>
                                <Field
                                    type="text"
                                    className={errors.fullAddress && touched.fullAddress ? "form-control is-invalid" : "form-control"}
                                    id="fullAddress"
                                    name="fullAddress"
                                    aria-describedby="fullAddress"
                                    placeholder="Str. nume, Nr. nr, bl. bloc,ap. apartament, et. etaj, sc. scara"
                                    value={values.fullAddress}
                                    readOnly={config.deleteAction}
                                />
                                {errors.fullAddress && touched.fullAddress ? (
                                    <div className={"invalid-message"}>{errors.fullAddress}</div>) : null}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <label className="form-label mt-4">
                                    Nume utilizator
                                </label>
                                <Field
                                    type="text"
                                    className={errors.userAccount?.userName && touched.userAccount?.userName ? "form-control is-invalid" : "form-control"}
                                    id="userAccount.userName"
                                    placeholder="Nume utilizator"
                                    value={values.userAccount?.userName}
                                    readOnly={config.deleteAction}
                                />
                                {errors.userAccount?.userName && touched.userAccount?.userName ? (
                                    <div className={"invalid-message"}>{errors.userAccount?.userName}</div>) : null}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label mt-4">
                                    <div className={"d-flex"}>
                                        <div className={"col-md-10"}>
                                            Email
                                        </div>
                                    </div>
                                </label>
                                <Field
                                    type="email"
                                    className={errors.personalEmail && touched.personalEmail ? "form-control is-invalid" : "form-control"}
                                    id="personalEmail"
                                    aria-describedby="email"
                                    placeholder="Email"
                                    value={values.personalEmail}
                                    readOnly={config.deleteAction}
                                />
                                {errors.personalEmail && touched.personalEmail ? (
                                    <div className={"invalid-message"}>{errors.personalEmail}</div>) : null}
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <label className="form-label mt-4">
                                    Cod numeric personal
                                </label>
                                <Field
                                    type="cnp"
                                    className={errors.cnp && touched.cnp ? "form-control is-invalid" : "form-control"}
                                    id="cnp"
                                    name="cnp"
                                    aria-describedby="cnp"
                                    placeholder=" Cod numeric personal"
                                    value={values.cnp}
                                    readOnly={config.deleteAction}
                                />
                                {errors.cnp && touched.cnp ? (
                                    <div className={"invalid-message"}>{errors.cnp}</div>) : null}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label mt-4">
                                    Număr de telefon
                                </label>
                                <Field
                                    className={errors.phoneNumber && touched.phoneNumber ? "form-control is-invalid" : "form-control"}
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    aria-describedby="phoneNumber"
                                    placeholder="Număr de telefon"
                                    value={values.phoneNumber}
                                    readOnly={config.deleteAction}
                                />
                                {errors.phoneNumber && touched.phoneNumber ? (
                                    <div className={"invalid-message"}>{errors.phoneNumber}</div>) : null}
                            </div>
                        </div>

                        {/*<div className={"mt-5 d-flex justify-content-center"}>*/}
                        {/*    <button type="submit" className={"col-md-3 btn btn-primary"}>*/}
                        {/*        {config.action}*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </Form>)}
            </Formik>
        </>)
}

export default TeacherForm
