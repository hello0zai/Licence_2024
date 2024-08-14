import React, {useEffect, useState} from 'react'
import useAuth from "../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import routes from "../routes/ArtSchoolRoutes";
import {Field, Form, Formik} from "formik";
import {Button, Stack} from "@mui/material";
import DatePicker from "react-datepicker";
import ArtSchoolApi from "../api/art_school_api";


function ContestForm(config) {
    const model = config.model;
    const validationSchema = config.validationSchema;
    const handleSubmit = config.handleSubmit;
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [contestTypes, setContestTypes] = useState([]);

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            (async function getData() {
                ArtSchoolApi().contestTypeApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (data) {
                        setContestTypes(data);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }());
        }
    }, [auth, model]);

    const goToList = function () {
        navigate(routes.adminRoutes.ContestListComponent.path, {replace: true});
    }

    return (<>
        <Formik
            initialValues={model}
            validationSchema={validationSchema}
            enableReinitialize={true}
            validateOnBlur
            onSubmit={(values) => handleSubmit(values)}
            className={"simple-form"}>
            {({values, errors, touched, setFieldValue, setTouched, setFieldTouched}) => (<Form>
                <div className="row">
                    <div className="col-md-6">
                        <h4>{config.action}</h4>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <Stack direction="row" spacing={1}>
                            {
                                config.buttonsConfig.actionButton ?
                                    <Button variant="outlined"
                                            startIcon={config.buttonsConfig.actionButton.buttonIcon} type="submit">
                                        {config.buttonsConfig.actionButton.title}
                                    </Button> : null
                            }
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
                            Denumire concurs
                        </label>
                        <Field
                            type="text"
                            className={errors.contestName && touched.contestName ? "form-control is-invalid" : "form-control"}
                            id="contestName"
                            name="contestName"
                            placeholder="Denumire concurs"
                            value={values.contestName}
                            readOnly={config.deleteAction || config.allReadOnly}/>

                        {errors.contestName && touched.contestName ? (
                            <div className={"invalid-message"}>{errors.contestName}</div>) : null}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label mt-4">
                            Tip concurs
                        </label>
                        <Field
                            as="select"
                            className={errors.contestTypeId && touched.contestTypeId ? "form-control is-invalid" : "form-control"}
                            id="contestTypeId"
                            name="contestTypeId"
                            placeholder="Tip concurs"
                            value={values.contestTypeId}
                            disabled={true}>
                            <option value="">Selectați tipul concursului</option>
                            {contestTypes.map(contestType => <option value={contestType?.contestTypeId}
                                                                     key={contestType?.contestTypeId}>
                                {contestType?.contestTypeName}
                            </option>)}
                        </Field>
                        {errors.contestTypeId && touched.contestTypeId ? (
                            <div className={"invalid-message"}>{errors.contestTypeId}</div>) : null}
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-md-6">
                        <label className="form-label mt-4">
                            Dată început
                        </label>
                        <DatePicker
                            selected={values.startDate}
                            dateFormat="dd/MM/yyyy"
                            className={errors.startDate && touched.startDate ? "form-control is-invalid" : "form-control"}
                            placeholderText={"Data de început a concursului"}
                            onChange={date => setFieldValue('startDate', date)}
                            onBlur={() => setFieldTouched("startDate", true, true)}
                            id="startDate"
                            name="startDate"
                            disabled={config.deleteAction || config.allReadOnly}
                            isClearable/>
                        {errors.startDate && touched.startDate ? (
                            <div className={"invalid-message"}>{errors.startDate}</div>) : null}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label mt-4">
                            Dată sfârșit
                        </label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            className={errors.endDate && touched.endDate ? "form-control is-invalid" : "form-control"}
                            selected={values.endDate}
                            onChange={(date) => {
                                setFieldValue("endDate", date);
                            }}
                            onBlur={() => setFieldTouched("endDate", true, true)}
                            id="endDate"
                            name="endDate"
                            placeholderText={"Data de finalizare a concursului"}
                            disabled={config.deleteAction || config.allReadOnly}
                            isClearable/>
                        {errors.endDate && touched.endDate ? (
                            <div className={"invalid-message"}>{errors.endDate}</div>) : null}
                    </div>
                </div>


                <div className="row form-group pt-2 pt-5">
                    <h4><b>Calendarul concursului</b></h4>
                    <hr/>
                </div>

                <div className={"row col-md-12"}>
                    <h5>
                        1. Încărcarea documentelor
                    </h5>
                </div>

                <div className={"row form-group"}>
                    <div className="col-md-6">
                        <label className="form-label mt-4">
                            Dată început
                        </label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            className={errors.INCARCAREA_DOCUMENTELOR?.startDate && touched.INCARCAREA_DOCUMENTELOR?.startDate ? "form-control is-invalid" : "form-control"}
                            selected={values.INCARCAREA_DOCUMENTELOR?.startDate}
                            onChange={(date) => setFieldValue("INCARCAREA_DOCUMENTELOR.startDate", date)}
                            onBlur={() => setFieldTouched("INCARCAREA_DOCUMENTELOR.startDate", true, true)}
                            id="INCARCAREA_DOCUMENTELOR.startDate"
                            name="INCARCAREA_DOCUMENTELOR.startDate"
                            placeholderText={"Data de începere a etapei"}
                            disabled={config.deleteAction || config.allReadOnly}
                            isClearable/>
                        {errors.INCARCAREA_DOCUMENTELOR?.startDate && touched.INCARCAREA_DOCUMENTELOR?.startDate ? (
                            <div
                                className={"invalid-message"}>{errors.INCARCAREA_DOCUMENTELOR?.startDate}</div>) : null}
                    </div>

                    <div className="col-md-6 p-0">
                        <label className="form-label mt-4">
                            Dată sfârșit
                        </label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            className={errors.INCARCAREA_DOCUMENTELOR?.endDate && touched.INCARCAREA_DOCUMENTELOR?.endDate ? "form-control is-invalid" : "form-control"}
                            selected={values.INCARCAREA_DOCUMENTELOR?.endDate}
                            onChange={(date) => setFieldValue("INCARCAREA_DOCUMENTELOR.endDate", date)}
                            onBlur={() => setFieldTouched("INCARCAREA_DOCUMENTELOR.endDate", true, true)}
                            id="INCARCAREA_DOCUMENTELOR.endDate"
                            name="INCARCAREA_DOCUMENTELOR.endDate"
                            placeholderText={"Data de finalizare a etapei"}
                            disabled={config.deleteAction || config.allReadOnly}
                            isClearable/>
                        {errors.INCARCAREA_DOCUMENTELOR?.endDate && touched.INCARCAREA_DOCUMENTELOR?.endDate ? (
                            <div className={"invalid-message"}>{errors.INCARCAREA_DOCUMENTELOR?.endDate}</div>) : null}
                    </div>
                </div>

                <div className={"row col-md-12 pt-5"}>
                    <h5>
                        2. Validarea documentelor
                    </h5>
                </div>

                <div className={"row form-group"}>
                    <div className="col-md-6">
                        <label className="form-label mt-4">
                            Dată început
                        </label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            className={errors.VALIDAREA_DOCUMENTELOR?.startDate && touched.VALIDAREA_DOCUMENTELOR?.startDate ? "form-control is-invalid" : "form-control"}
                            selected={values.VALIDAREA_DOCUMENTELOR?.startDate}
                            onChange={(date) => setFieldValue("VALIDAREA_DOCUMENTELOR.startDate", date)}
                            onBlur={() => setFieldTouched("VALIDAREA_DOCUMENTELOR.startDate", true, true)}
                            id="VALIDAREA_DOCUMENTELOR.startDate"
                            name="VALIDAREA_DOCUMENTELOR.startDate"
                            placeholderText={"Data de începere a etapei"}
                            disabled={config.deleteAction || config.allReadOnly}
                            isClearable/>
                        {errors.VALIDAREA_DOCUMENTELOR?.startDate && touched.VALIDAREA_DOCUMENTELOR?.startDate ? (
                            <div className={"invalid-message"}>{errors.VALIDAREA_DOCUMENTELOR?.startDate}</div>) : null}
                    </div>

                    <div className="col-md-6 p-0">
                        <label className="form-label mt-4">
                            Dată sfârșit
                        </label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            className={errors.VALIDAREA_DOCUMENTELOR?.endDate && touched.VALIDAREA_DOCUMENTELOR?.endDate ? "form-control is-invalid" : "form-control"}
                            selected={values.VALIDAREA_DOCUMENTELOR?.endDate}
                            onChange={(date) => setFieldValue("VALIDAREA_DOCUMENTELOR.endDate", date)}
                            onBlur={() => setFieldTouched("VALIDAREA_DOCUMENTELOR.endDate", true, true)}
                            id="VALIDAREA_DOCUMENTELOR.endDate"
                            name="VALIDAREA_DOCUMENTELOR.endDate"
                            placeholderText={"Data de finalizare a etapei"}
                            disabled={config.deleteAction || config.allReadOnly}
                            isClearable/>
                        {errors.VALIDAREA_DOCUMENTELOR?.endDate && touched.VALIDAREA_DOCUMENTELOR?.endDate ? (
                            <div className={"invalid-message"}>{errors.VALIDAREA_DOCUMENTELOR?.endDate}</div>) : null}
                    </div>
                </div>

                <div className={"row col-md-12 pt-5"}>
                    <h5>
                        3. Examen de admitere
                    </h5>
                </div>

                <div className={"row form-group"}>
                    <div className="col-md-6">
                        <label className="form-label mt-4">
                            Dată început
                        </label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            className={errors.EXAMEN_ADMITERE?.startDate && touched.EXAMEN_ADMITERE?.startDate ? "form-control is-invalid" : "form-control"}
                            selected={values.EXAMEN_ADMITERE?.startDate}
                            onChange={(date) => setFieldValue("EXAMEN_ADMITERE.startDate", date)}
                            onBlur={() => setFieldTouched("EXAMEN_ADMITERE.startDate", true, true)}
                            id="EXAMEN_ADMITERE.startDate"
                            name="EXAMEN_ADMITERE.startDate"
                            placeholderText={"Data de începere a etapei"}
                            disabled={config.deleteAction || config.allReadOnly}
                            isClearable/>
                        {errors.EXAMEN_ADMITERE?.startDate && touched.EXAMEN_ADMITERE?.startDate ? (
                            <div className={"invalid-message"}>{errors.EXAMEN_ADMITERE?.startDate}</div>) : null}
                    </div>

                    <div className="col-md-6 p-0">
                        <label className="form-label mt-4">
                            Dată sfârșit
                        </label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            className={errors.EXAMEN_ADMITERE?.endDate && touched.EXAMEN_ADMITERE?.endDate ? "form-control is-invalid" : "form-control"}
                            selected={values.EXAMEN_ADMITERE?.endDate}
                            onChange={(date) => setFieldValue("EXAMEN_ADMITERE.endDate", date)}
                            onBlur={() => setFieldTouched("EXAMEN_ADMITERE.endDate", true, true)}
                            id="EXAMEN_ADMITERE.endDate"
                            name="EXAMEN_ADMITERE.endDate"
                            placeholderText={"Data de finalizare a etapei"}
                            disabled={config.deleteAction || config.allReadOnly}
                            isClearable/>
                        {errors.EXAMEN_ADMITERE?.endDate && touched.EXAMEN_ADMITERE?.endDate ? (
                            <div className={"invalid-message"}>{errors.EXAMEN_ADMITERE?.endDate}</div>) : null}
                    </div>
                </div>

                <div className={"row col-md-12 pt-5"}>
                    <h5>
                        4. Afișarea rezultatelor
                    </h5>
                </div>

                <div className={"row form-group"}>
                    <div className="col-md-6">
                        <label className="form-label mt-4">
                            Dată început
                        </label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            className={errors.AFISAREA_REZULTATELOR?.startDate && touched.AFISAREA_REZULTATELOR?.startDate ? "form-control is-invalid" : "form-control"}
                            selected={values.AFISAREA_REZULTATELOR?.startDate}
                            onChange={(date) => setFieldValue("AFISAREA_REZULTATELOR.startDate", date)}
                            onBlur={() => setFieldTouched("AFISAREA_REZULTATELOR.startDate", true, true)}
                            id="AFISAREA_REZULTATELOR.startDate"
                            name="AFISAREA_REZULTATELOR.startDate"
                            placeholderText={"Data de începere a etapei"}
                            disabled={config.deleteAction || config.allReadOnly}
                            isClearable/>
                        {errors.AFISAREA_REZULTATELOR?.startDate && touched.AFISAREA_REZULTATELOR?.startDate ? (
                            <div className={"invalid-message"}>{errors.AFISAREA_REZULTATELOR?.startDate}</div>) : null}
                    </div>

                    <div className="col-md-6 p-0">
                        <label className="form-label mt-4">
                            Dată sfârșit
                        </label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            className={errors.AFISAREA_REZULTATELOR?.endDate && touched.AFISAREA_REZULTATELOR?.endDate ? "form-control is-invalid" : "form-control"}
                            selected={values.AFISAREA_REZULTATELOR?.endDate}
                            onChange={(date) => setFieldValue("AFISAREA_REZULTATELOR.endDate", date)}
                            onBlur={() => setFieldTouched("AFISAREA_REZULTATELOR.endDate", true, true)}
                            id="AFISAREA_REZULTATELOR.endDate"
                            name="AFISAREA_REZULTATELOR.endDate"
                            placeholderText={"Data de finalizare a etapei"}
                            disabled={config.deleteAction || config.allReadOnly}
                            isClearable/>
                        {errors.AFISAREA_REZULTATELOR?.endDate && touched.AFISAREA_REZULTATELOR?.endDate ? (
                            <div className={"invalid-message"}>{errors.AFISAREA_REZULTATELOR?.endDate}</div>) : null}
                    </div>
                </div>
            </Form>)}
        </Formik>
    </>)
}

export default ContestForm