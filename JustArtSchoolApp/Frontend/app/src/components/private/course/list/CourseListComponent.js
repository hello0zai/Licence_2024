import React, {useEffect, useRef, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import routes from "../../../../routes/ArtSchoolRoutes";
import {FilterMatchMode} from "primereact/api";
import {BiSolidBookAdd, BiSolidEditAlt, BiSolidUserCircle} from "react-icons/bi";
import {AiFillEye, AiFillEyeInvisible, AiTwotoneDelete} from "react-icons/ai";
import {BsSearch} from "react-icons/bs";
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {OverlayPanel} from "primereact/overlaypanel";
import useToast from "../../../../utils/hooks/useToast";
import {Button} from "@mui/material";

function CourseListComponent() {
    const {auth} = useAuth();
    const [courseList, setCourseList] = useState([]);
    const [rowsPerPageOptions] = useState([3, 5, 10, 15, 20, 25]);
    const [rowsPerPageOptionSelected] = useState(3);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const navigate = useNavigate();
    const overlayPanelRef = useRef(null);
    const [teacherList, setTeacherList] = useState();

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            clearFilter();
            (function getSubjectStudyPeriodCourseDetailsList() {
                ArtSchoolApi().subjectStudyPeriodCourseDetailsApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (subjectStudyPeriodCourseDetailsList) {
                        setCourseList(subjectStudyPeriodCourseDetailsList);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const goToEdit = function (subjectStudyPeriodCourseDetailsId) {
        const id = `${subjectStudyPeriodCourseDetailsId.subjectId}&&${subjectStudyPeriodCourseDetailsId.studyPeriodId}&&${subjectStudyPeriodCourseDetailsId.courseId}&&${subjectStudyPeriodCourseDetailsId.studyYearId}`;
        navigate(routes.adminRoutes.CourseEditComponent.path.replace(":ids", id), {replace: true});
    }

    const goToDelete = function (subjectStudyPeriodCourseDetailsId) {
        const id = `${subjectStudyPeriodCourseDetailsId.subjectId}&&${subjectStudyPeriodCourseDetailsId.studyPeriodId}&&${subjectStudyPeriodCourseDetailsId.courseId}&&${subjectStudyPeriodCourseDetailsId.studyYearId}`;
        navigate(routes.adminRoutes.CourseDeleteComponent.path.replace(":ids", id), {replace: true});
    }

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

    const getTeacherListBySubjectStudyPeriodCourseDetailsId = function (id) {
        ArtSchoolApi().teacherCourseConfigurationApi.getTeachersBySubjectStudyPeriodCourseDetails(auth?.userAuthenticated?.token, id)
            .then(function (teacherList) {
                setTeacherList(teacherList);
            })
            .catch(function (err) {
                // showErrorToast("", "A aparut o eroare. Vă rugăm să contactați un administrator.");
                console.error(err);
            });
    }

    const showTeachers = (e, rowData) => {
        const id = rowData.subjectStudyPeriodCourseDetailsId;
        getTeacherListBySubjectStudyPeriodCourseDetailsId(id);
        rowData.view = !rowData.view;
        overlayPanelRef.current.toggle(e);
    };

    const teachersView = (rowData) => {
        return (
            <div>
                <div className="flex justify-content-center">
                    <a className="btn col-md-12" onClick={(e) => showTeachers(e, rowData)}>
                        <div className={"d-flex justify-content-center"}>
                            <AiFillEye/>
                        </div>
                    </a>
                    <OverlayPanel ref={overlayPanelRef} style={{
                        boxShadow: '10px 5px 15px 1px #031a21',
                        background: '#002b36',
                        border: 'solid 2px #fff',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        borderRadius: '10px 10px 10px 10px',
                        padding: '10px'
                    }}>

                        {teacherList?.length > 0 ? teacherList?.map(teacher => {
                                return <div className="d-flex align-items-center gap-2">
                                    {teacher.userAccount.profileImageData ?
                                        <img alt={"img"} src={teacher.userAccount.profileImageData} width="32"/>
                                        : <BiSolidUserCircle style={{
                                            width: "32px",
                                            height: "32px",
                                        }}/>}
                                    <div><i>{teacher.fullName}</i></div>
                                </div>
                            }) :
                            <div style={{color: "#e32636"}}>
                                <b><i>Nu este asociat nici un profesor acestui curs!</i></b>
                            </div>}
                    </OverlayPanel>
                </div>
            </div>
        );
    };

    const actionButtons = (rowData) => {
        return (
            <div className={"d-flex justify-content-center"}>
                <button className="btn edit-button mx-1"
                        onClick={() => goToEdit(rowData.subjectStudyPeriodCourseDetailsId)}>
                    <BiSolidEditAlt/>
                </button>
                <button className="btn delete-button"
                        onClick={() => goToDelete(rowData.subjectStudyPeriodCourseDetailsId)}>
                    <AiTwotoneDelete/>
                </button>
            </div>
        );
    };

    const clearFilter = () => {
        initFilters();
    };

    const renderHeader = () => {
        return (
            <div className={"d-flex justify-content-end form-group"}>
                <div className="form-group">
                    <div className="form-group">
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <span className="input-group-text"><BsSearch style={{color: "white"}}/></span>
                                <InputText as={"select"} className="form-control me-sm-2 ml-2" value={globalFilterValue}
                                           onChange={onGlobalFilterChange} placeholder="Caută"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const goToAdd = function () {
        navigate(routes.adminRoutes.CourseAddComponent.path, {replace: true});
    };

    return (
        <div className="pt-5">
            {/*<hr/>*/}
            <div className={"d-flex pb-3"}>
                <div className={"col-md-10 p-0"}>
                    <h5>Cursuri</h5>
                </div>
                <div className={"col-md-2 p-0 d-flex justify-content-end"}>
                    <Button variant="outlined"
                            startIcon={<BiSolidBookAdd/>}
                            onClick={goToAdd}>
                        Adaugă curs
                    </Button>
                </div>
            </div>
            <div className={"container"}>
                <DataTable value={courseList} paginator rows={rowsPerPageOptionSelected}
                           rowsPerPageOptions={rowsPerPageOptions} resizableColumns
                           showGridlines
                           filters={filters}
                           globalFilterFields={['teacherDtoList', 'courseDto.courseName', 'subjectStudyPeriodDto.studyPeriodDto.studyPeriodName',
                               'subjectStudyPeriodDto.subjectDto.subjectName',
                               'classHoursDuration', 'weeklyFrequencyCourse',
                               'courseWeeksDuration', 'studyYear']}
                           header={renderHeader}
                           scrollable
                           scrollHeight="380px"
                           emptyMessage="Nu sunt cursuri înregistrate în sistem.">

                    <Column header="Acțiuni" body={actionButtons}></Column>
                    <Column field="teacherDtoList" header="Profesori" sortable body={teachersView}>
                    </Column>
                    <Column field="courseDto.courseName"
                            sortable header="Denumire curs"></Column>
                    <Column
                        field="subjectStudyPeriodDto.studyPeriodDto.studyPeriodName"
                        sortable
                        header="Perioadă de studiu"></Column>
                    <Column field="subjectStudyPeriodDto.subjectDto.subjectName"
                            sortable header="Disciplină"></Column>
                    <Column field="classHoursDuration" sortable
                            header="Durata (h)"></Column>
                    <Column field="weeklyFrequencyCourse" sortable
                            header="Cursuri/săpt"></Column>
                    <Column field="courseWeeksDuration" sortable
                            header="Nr. săptămâni"></Column>
                    {/*<Column field="semester" sortable header="Semestru"></Column>*/}
                    <Column field="studyYear" sortable header="An studiu"></Column>

                </DataTable>
            </div>
        </div>
    );
}

export default CourseListComponent
