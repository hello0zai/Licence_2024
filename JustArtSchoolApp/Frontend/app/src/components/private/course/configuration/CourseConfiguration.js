import React, {useEffect, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import {FilterMatchMode} from "primereact/api";
import {BsSearch} from "react-icons/bs";
import {InputText} from "primereact/inputtext";
import {BiSolidUserCircle} from "react-icons/bi";
import routes from "../../../../routes/ArtSchoolRoutes";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {MdGroupAdd} from "react-icons/md";
import useToast from "../../../../utils/hooks/useToast";

function CourseConfiguration() {
    const {auth} = useAuth();
    const [courseList, setCourseList] = useState([]);
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([3, 5, 10, 15, 20, 25]);
    const [rowsPerPageOptionSelected, setRowsPerPageOptionSelected] = useState(3);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const navigate = useNavigate();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            clearFilter();
            (function getSubjectStudyPeriodCourseDetailsList() {
                ArtSchoolApi().teacherCourseConfigurationApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (subjectStudyPeriodCourseDetailsList) {
                        setCourseList(subjectStudyPeriodCourseDetailsList);
                    })
                    .catch(function (err) {
                        console.error(err);
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

    const renderHeader = () => {
        return (
            <div className={"d-flex justify-content-end form-group"}>
                <div className="form-group">
                    <div className="form-group">
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <span className="input-group-text"><BsSearch style={{color: "white"}}/></span>
                                <InputText as={"select"} className="form-control me-sm-2 ml-2"
                                           value={globalFilterValue}
                                           onChange={onGlobalFilterChange} placeholder="Caută"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const profileImageTemplate = (rowData) => {
        const profileImageData = rowData.teacherDto.userAccount.profileImageData;

        return (
            <div className="align-items-center gap-2">
                {
                    profileImageData ?
                        <img alt={"img"} src={rowData.teacherDto.userAccount.profileImageData} width="32"/>
                        : <BiSolidUserCircle width="32"/>
                }
            </div>
        );
    };

    const addGrade = function (rowData) {
        const teacherCourseConfigurationId = rowData.teacherCourseConfigurationId;
        const id = `${teacherCourseConfigurationId.subjectId}&&${teacherCourseConfigurationId.studyPeriodId}&&${teacherCourseConfigurationId.courseId}&&${teacherCourseConfigurationId.studyYearId}&&${teacherCourseConfigurationId.teacherId}`;
        navigate(routes.secretaryRoutes.ChooseStudents.path.replace(":ids", id), {replace: true});
    }

    const actionButtons = (rowData) => {
        return (
            <div className="d-flex justify-content-center">
                <button className="btn edit-button mx-1"
                        onClick={() => addGrade(rowData)}>
                    <div className="col-md-5">
                        <MdGroupAdd/>
                    </div>
                </button>
            </div>
        );
    };

    return (
        <div className="pt-4">
            <h5 style={{color:'white'}}>Alege un curs și înscrie studenți la acesta</h5>
            <hr/>
            <div className={"container"}>
                <DataTable value={courseList} paginator rows={rowsPerPageOptionSelected}
                           rowsPerPageOptions={rowsPerPageOptions} resizableColumns
                           showGridlines
                           filters={filters}
                           globalFilterFields={[
                               'teacherDto.fullName',
                               'subjectStudyPeriodCourseDetailsDto.courseDto.courseName',
                               'subjectStudyPeriodCourseDetailsDto.subjectStudyPeriodDto.studyPeriodDto.studyPeriodName',
                               'subjectStudyPeriodCourseDetailsDto.subjectStudyPeriodDto.subjectDto.subjectName',
                               // 'subjectStudyPeriodCourseDetailsDto.classHoursDuration',
                               // 'subjectStudyPeriodCourseDetailsDto.weeklyFrequencyCourse',
                               // 'subjectStudyPeriodCourseDetailsDto.courseWeeksDuration',
                               'subjectStudyPeriodCourseDetailsDto.semester',
                               'subjectStudyPeriodCourseDetailsDto.studyYear']}
                           header={renderHeader}
                           scrollable
                           scrollHeight="380px"
                           emptyMessage="Nu sunt cursuri inregistrate în sistem.">
                    <Column field="teacherDto.fullName" header="Profesor" body={profileImageTemplate}></Column>
                    <Column field="teacherDto.fullName" sortable header="Nume"></Column>

                    <Column field="subjectStudyPeriodCourseDetailsDto.courseDto.courseName"
                            sortable header="Denumire curs"></Column>
                    <Column
                        field="subjectStudyPeriodCourseDetailsDto.subjectStudyPeriodDto.studyPeriodDto.studyPeriodName"
                        sortable
                        header="Perioadă de studiu"></Column>
                    <Column field="subjectStudyPeriodCourseDetailsDto.subjectStudyPeriodDto.subjectDto.subjectName"
                            sortable header="Disciplină"></Column>
                    <Column field="subjectStudyPeriodCourseDetailsDto.studyYear" sortable header="An studiu"></Column>
                    <Column header="Adaugă studenți" body={actionButtons}></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default CourseConfiguration