import React, {useEffect, useState} from 'react';
import ArtSchoolApi from "../../../../../api/art_school_api";
import useAuth from "../../../../../utils/hooks/useAuth";
import {useNavigate, useParams} from "react-router-dom";
import {FilterMatchMode} from "primereact/api";
import {BsSearch} from "react-icons/bs";
import {InputText} from "primereact/inputtext";
import {BiSolidUserCircle} from "react-icons/bi";
import {PiStudentFill} from "react-icons/pi";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "@mui/material";
import {HiMiniUserGroup} from "react-icons/hi2";
import {AiTwotoneSetting} from "react-icons/ai";
import routes from "../../../../../routes/ArtSchoolRoutes";
import ArtSchoolModelsForms from "../../../../../models/ArtSchoolModelsForms";
import useToast from "../../../../../utils/hooks/useToast";
import {Calendar} from "primereact/calendar";

Array.prototype.cluster = function (keyGetter) {
    const obj = {};

    this.forEach(function (element) {
        const key = keyGetter(element);
        if (!obj[key]) {
            obj[key] = [];
        }
        obj[key].push(element);
    });
    return obj;
}

function GradeAddComponent() {
    const {auth} = useAuth();
    const {ids} = useParams();
    const idList = ids.split("&&");
    const navigate = useNavigate();
    const [studentList, setStudentList] = useState();
    const [studentSubjectCourseGradeObject, setStudentSubjectCourseGradeObject] = useState(null);
    const [date, setDate] = useState(null);
    const {showErrorToast, showSuccessToast} = useToast();

    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([3, 5, 10, 15, 20, 25]);
    const [rowsPerPageOptionSelected, setRowsPerPageOptionSelected] = useState(3);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            clearFilter();
            const teacherConfigurationId = {
                subjectId: idList[0],
                studyPeriodId: idList[1],
                courseId: idList[2],
                studyYearId: idList[3],
                teacherId: idList[4]
            };
            (function getStudentsByCourseDetailsAndTeacher() {
                ArtSchoolApi().studentSubjectCourseGradeApi.getStudentsByCourseConfigurations(auth?.userAuthenticated?.token, teacherConfigurationId)
                    .then(function (students) {
                        setStudentList(students);

                        let studentSubjectCourseGradeList = [];
                        for (let index = 0; index < students.length; index++) {
                            const studentSubjectCourseGradeModel = ArtSchoolModelsForms().studentSubjectCourseGradeModel;
                            studentSubjectCourseGradeModel.studentSubjectCourseGradeId.subjectId = teacherConfigurationId.subjectId;
                            studentSubjectCourseGradeModel.studentSubjectCourseGradeId.studyPeriodId = teacherConfigurationId.studyPeriodId;
                            studentSubjectCourseGradeModel.studentSubjectCourseGradeId.courseId = teacherConfigurationId.courseId;
                            studentSubjectCourseGradeModel.studentSubjectCourseGradeId.studentId = students[index].userId;
                            studentSubjectCourseGradeModel.studentSubjectCourseGradeId.studyYearId = teacherConfigurationId.studyYearId;
                            studentSubjectCourseGradeModel.teacherId = teacherConfigurationId.teacherId;
                            studentSubjectCourseGradeModel.grade = 0;
                            studentSubjectCourseGradeModel.passed = false;
                            studentSubjectCourseGradeModel.examDate = null;

                            studentSubjectCourseGradeList.push(studentSubjectCourseGradeModel);
                        }

                        const studentSubjectCourseGradeObject = studentSubjectCourseGradeList.cluster(function (studentSubjectCourseGrade) {
                            return studentSubjectCourseGrade.studentSubjectCourseGradeId.studentId;
                        });

                        setStudentSubjectCourseGradeObject(studentSubjectCourseGradeObject);

                    })
                    .catch(function (err) {
                    });
            }());
        }
    }, [auth]);

    const initFilters = () => {
        setFilters({
            global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        });
        setGlobalFilterValue('');
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = {...filters};

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const clearFilter = () => {
        initFilters();
    };

    const addGrades = async function () {
        let errorMessage = "";
        const studentSubjectCourseGradeList = Object.keys(studentSubjectCourseGradeObject).map((key) => {
            if (studentSubjectCourseGradeObject[key][0].grade > 0) {
                studentSubjectCourseGradeObject[key][0].examDate = date;
                return studentSubjectCourseGradeObject[key][0];
            }
            errorMessage = "Adăugați pentru fiecare student nota obținută în urma examenului la acest curs.";
            return null;
        }).filter((item) => item !== null);

        if (errorMessage) {
            showErrorToast("", errorMessage);
            return;
        }

        try {
            const response = await ArtSchoolApi().studentSubjectCourseGradeApi.addGrade(auth?.userAuthenticated?.token, studentSubjectCourseGradeList);
            console.log(response);
            showSuccessToast("", "Notele studenților au fost adăugate cu succes.");
            navigate(routes.secretaryRoutes.GradeChooseCourseComponent.path, {replace: true});

        } catch (error) {
            showErrorToast("", "A apărut o eroare la adăugarea notelor studenților.");
        }

    }

    const goToList = function () {
        navigate(routes.secretaryRoutes.GradeChooseCourseComponent.path, {replace: true});
    }

    const renderHeader = () => {
        return (
            <div className="d-flex justify-content-between">
                <div className={"d-flex justify-content-start"}>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <span className="input-group-text"><BsSearch style={{color: "white"}}/></span>
                            <InputText as={"select"} className="form-control me-sm-2 ml-2" value={globalFilterValue}
                                       onChange={onGlobalFilterChange} placeholder="Caută"/>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div className="form-group">
                        <Calendar value={date}
                                  onChange={(e) => setDate(e.value)}
                                  dateFormat="dd/mm/yy"
                                  placeholder={"Selectează dată examen (dd/mm/yyyy)"}
                                  style={{width: "300px"}}/>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <div className={"d-flex form-group"}>
                        <Button variant="outlined" className="edit-button mb-3" startIcon={<HiMiniUserGroup/>}
                                type="submit" onClick={addGrades}>
                            Adaugă note
                        </Button>

                        <Button variant="outlined" className="edit-button mb-3 mx-2" startIcon={<AiTwotoneSetting/>}
                                onClick={goToList}>
                            Înapoi
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    const profileImageTemplate = (rowData) => {
        const profileImageData = rowData.userAccount.profileImageData;

        return (
            <div className="align-items-center gap-2">
                {
                    profileImageData ?
                        <img alt={"img"} src={rowData.userAccount.profileImageData} width="32"/>
                        : <BiSolidUserCircle width="32"/>
                }
            </div>
        );
    };

    const grade = function (event, rowData) {
        const gradeValue = event.currentTarget.value;
        if (!isNaN(parseFloat(gradeValue)) && isFinite(gradeValue) && parseFloat(gradeValue).toFixed(2) >= 1 && parseFloat(gradeValue).toFixed(2) <= 10) {
            event.currentTarget.value = parseFloat(gradeValue).toFixed(2);
        } else {
            event.currentTarget.value = 0;
        }

        studentSubjectCourseGradeObject[rowData.userId][0].grade = event.currentTarget.value;
        studentSubjectCourseGradeObject[rowData.userId][0].passed = event.currentTarget.value >= 5;
    }

    const gradeContent = function (rowData) {
        return (
            <div className="d-flex justify-content-center">
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-text"><PiStudentFill style={{color: "white"}}/></span>
                        {/*className={errors.subjectDto?.subjectName && touched.subjectDto?.subjectName ? "form-control is-invalid" : "form-control"}*/}
                        <InputText type="number"
                                   className="form-control me-sm-2 ml-2"
                                   placeholder="Notă"
                                   value = {studentSubjectCourseGradeObject[rowData.userId][0].grade}
                                   onBlur={(event) => grade(event, rowData)}
                                   readOnly={false}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="pt-5">
                <hr/>
                <div className={"container"}>
                    <DataTable value={studentList} paginator rows={rowsPerPageOptionSelected}
                               rowsPerPageOptions={rowsPerPageOptions} resizableColumns
                               showGridlines
                               filters={filters}
                               globalFilterFields={['lastName', 'firstName', 'personalEmail', 'cityDto.cityName', 'cityDto.countyDto.countyName', 'cnp']}
                               header={renderHeader}
                               emptyMessage="Nu sunt studenți înregistrați la acest curs în acest an cu acest profesor.">
                        <Column header="Student" body={profileImageTemplate}></Column>
                        <Column field="lastName" sortable header="Nume"></Column>
                        <Column field="firstName" sortable header="Prenume"></Column>
                        <Column field="personalEmail" sortable header="Email"></Column>
                        <Column field="phoneNumber" sortable header="Telefon"></Column>
                        <Column field="cnp" sortable header="CNP"></Column>
                        <Column header="Notă" body={gradeContent}>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default GradeAddComponent
