import React, {useEffect, useRef, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import {FilterMatchMode} from "primereact/api";
import {BiSolidUserCircle} from "react-icons/bi";
import {AiFillEye} from "react-icons/ai";
import {BsSearch} from "react-icons/bs";
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {OverlayPanel} from "primereact/overlaypanel";
import useToast from "../../../../utils/hooks/useToast";

function SecretaryCourseView() {
    const {auth} = useAuth();
    const [courseList, setCourseList] = useState([]);
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([3, 5, 10, 15, 20, 25]);
    const [rowsPerPageOptionSelected, setRowsPerPageOptionSelected] = useState(3);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const navigate = useNavigate();
    const overlayPanelRef = useRef(null);
    const [teacherList, setTeacherList] = useState();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            clearFilter();
            (function getSubjectStudyPeriodCourseDetailsList() {
                ArtSchoolApi().subjectStudyPeriodCourseDetailsApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (subjectStudyPeriodCourseDetailsList) {
                        setCourseList(subjectStudyPeriodCourseDetailsList);
                    })
                    .catch(function (err) {
                        showErrorToast("", "A aparut o eroare. Vă rugăm să contactați un administrator.");
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

    const getTeacherListBySubjectStudyPeriodCourseDetailsId = function (id) {
        ArtSchoolApi().teacherCourseConfigurationApi.getTeachersBySubjectStudyPeriodCourseDetails(auth?.userAuthenticated?.token, id)
            .then(function (teacherList) {
                setTeacherList(teacherList);
            })
            .catch(function (err) {
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
                        background: 'white',
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
                                    <div>{teacher.fullName}</div>
                                </div>
                            }) :
                            <div>
                                Nu este asociat nici un profesor acestui curs!
                            </div>}
                    </OverlayPanel>
                </div>
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

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="pt-5">
            <hr/>
            <div className={"container"}>
                <DataTable value={courseList} paginator rows={rowsPerPageOptionSelected}
                           rowsPerPageOptions={rowsPerPageOptions} resizableColumns
                           showGridlines
                           filters={filters}
                           globalFilterFields={['teacherDtoList', 'courseDto.courseName', 'subjectStudyPeriodDto.studyPeriodDto.studyPeriodName',
                               'subjectStudyPeriodDto.subjectDto.subjectName',
                               'classHoursDuration', 'weeklyFrequencyCourse',
                               'courseWeeksDuration', 'semester', 'studyYear']}
                           header={renderHeader}
                           scrollable
                           scrollHeight="530px"
                           emptyMessage="Nu sunt cursuri inregistrate în sistem.">
                    <Column field="teacherDtoList" header="Profesori" sortable body={teachersView}>
                    </Column>
                    {/*<Column field="teacherDto.fullName" sortable header="Profesor" body={profileImageTemplate}></Column>*/}
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

export default SecretaryCourseView
