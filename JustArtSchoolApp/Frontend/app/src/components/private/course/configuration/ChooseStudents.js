import React, {useEffect, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {useNavigate, useParams} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import {FilterMatchMode} from "primereact/api";
import {BsSearch} from "react-icons/bs";
import {InputText} from "primereact/inputtext";
import {BiSolidUserCircle} from "react-icons/bi";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import ArtSchoolModelsForms from "../../../../models/ArtSchoolModelsForms";
import {Button} from "@mui/material";
import {HiMiniUserGroup} from "react-icons/hi2";
import {AiTwotoneSetting} from "react-icons/ai";
import routes from "../../../../routes/ArtSchoolRoutes";
import useToast from "../../../../utils/hooks/useToast";

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

function ChooseStudents() {
    const {auth} = useAuth();
    const {ids} = useParams();
    const navigate = useNavigate();
    const idList = ids.split("&&");
    const {showSuccessToast, showErrorToast} = useToast();
    const [studentList, setStudentList] = useState();
    const [studentSubjectCourseGradeObject, setStudentSubjectCourseGradeObject] = useState();

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
            (function getStudentsByCourseDetailsForCourseConfiguration() {
                ArtSchoolApi().subjectStudyPeriodCourseDetailsApi.getStudentsByCourseDetailsForCourseConfiguration(auth?.userAuthenticated?.token, teacherConfigurationId)
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
                            studentSubjectCourseGradeModel.checked = false;

                            studentSubjectCourseGradeList.push(studentSubjectCourseGradeModel);
                        }

                        const studentSubjectCourseGradeObject = studentSubjectCourseGradeList.cluster(function (studentSubjectCourseGrade) {
                            return  studentSubjectCourseGrade.studentSubjectCourseGradeId.studentId;
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

    const goToList = function () {
        navigate(routes.secretaryRoutes.CourseConfiguration.path, {replace: true});
    }

    const saveConfiguration = async function () {
        const studentSubjectCourseGradeList = Object.keys(studentSubjectCourseGradeObject).map((key) => {
            if (studentSubjectCourseGradeObject[key][0].checked) {
                return studentSubjectCourseGradeObject[key][0];
            }
            return null;
        }).filter((item) => item !== null);

        try {
            const response = await ArtSchoolApi().studentSubjectCourseGradeApi.add(auth?.userAuthenticated?.token, studentSubjectCourseGradeList);
            showSuccessToast("", "Studenții au fost adăugați cu succes la acest curs.");
            navigate(routes.secretaryRoutes.CourseConfiguration.path, {replace: true});

        } catch (err) {
            console.error(err);
            showErrorToast("", "A apărut o eroare la adăugarea studenților la acest curs. Vă rugăm contactați administratorul.");
        }
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
                <div className="d-flex justify-content-end">
                    <div className={"d-flex form-group"}>
                        <Button variant="outlined" className="edit-button mb-3" startIcon={<HiMiniUserGroup/>} type="submit" onClick={saveConfiguration}>
                            Salvează configurația
                        </Button>

                        <Button variant="outlined" className="edit-button mb-3 mx-2" startIcon={<AiTwotoneSetting/>} onClick={goToList}>
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

    const chooseStudent = function (event, rowData) {
        const studentId = rowData.userId;
        studentSubjectCourseGradeObject[studentId][0].checked = event.target.checked;
    }

    const chooseStudentTemplate = function (rowData) {
        return (
            <div className="d-flex justify-content-center form-check">
                <input className="form-check-input" type="checkbox" onChange={(event) => chooseStudent(event, rowData)}>
                </input>
            </div>
        );
    };

    return (
        <>
            <div className="pt-5 mt-1">
                <hr/>
                <div className={"container"}>
                    <DataTable value={studentList} paginator rows={rowsPerPageOptionSelected}
                               rowsPerPageOptions={rowsPerPageOptions} resizableColumns
                               showGridlines
                               filters={filters}
                               globalFilterFields={['lastName', 'firstName', 'personalEmail', 'cityDto.cityName', 'cityDto.countyDto.countyName', 'cnp']}
                               header={renderHeader}
                               scrollable
                               scrollHeight="380px"
                               emptyMessage="Nu sunt studenți înregistrați la acest curs în acest an cu acest profesor.">
                        <Column header="Student" body={profileImageTemplate}></Column>
                        <Column field="lastName" sortable header="Nume"></Column>
                        <Column field="firstName" sortable header="Prenume"></Column>
                        <Column field="personalEmail" sortable header="Email"></Column>
                        <Column field="phoneNumber" sortable header="Telefon"></Column>
                        <Column field="cnp" sortable header="CNP"></Column>
                        <Column header="Adaugă" body={chooseStudentTemplate}>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </>
    )
}

export default ChooseStudents