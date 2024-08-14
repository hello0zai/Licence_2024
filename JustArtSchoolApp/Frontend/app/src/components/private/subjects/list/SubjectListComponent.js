import React, {useEffect, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import routes from "../../../../routes/ArtSchoolRoutes";
import {FilterMatchMode} from "primereact/api";
import {BiSolidEditAlt} from "react-icons/bi";
import {AiTwotoneDelete} from "react-icons/ai";
import {BsSearch} from "react-icons/bs";
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import useToast from "../../../../utils/hooks/useToast";
import {Button} from "@mui/material";
import {IoPersonAddSharp} from "react-icons/io5";
import {PiMusicNotesPlusLight} from "react-icons/pi";

function SubjectListComponent() {
    const {auth} = useAuth();
    const [subjectStudyPeriodList, setSubjectStudyPeriodList] = useState([]);
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([3, 5, 10, 15, 20, 25]);
    const [rowsPerPageOptionSelected, setRowsPerPageOptionSelected] = useState(3);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            clearFilter();
            (function getData() {
                ArtSchoolApi().subjectStudyPeriodsApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (subjectStudyPeriodList) {
                        console.log("SubjectStudyPeriodList api data: " + JSON.stringify(subjectStudyPeriodList));
                        setSubjectStudyPeriodList(subjectStudyPeriodList);
                    })
                    .catch(function (err) {
                        // showErrorToast("", "A aparut o eroare. Vă rugăm să contactați un administrator.");
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const goToEdit = function (subjectStudyPeriodId) {
        const id = subjectStudyPeriodId.subjectId + "&&" + subjectStudyPeriodId.studyPeriodId;
        navigate(routes.adminRoutes.SubjectEditComponent.path.replace(":ids", id), {replace: true});
    }

    const goToDelete = function (subjectStudyPeriodId) {
        const id = subjectStudyPeriodId.subjectId + "&&" + subjectStudyPeriodId.studyPeriodId;
        navigate(routes.adminRoutes.SubjectDeleteComponent.path.replace(":ids", id), {replace: true});
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

    const actionButtons = (rowData) => {
        return (
            <div className={"d-flex justify-content-start"}>
                <button className="btn edit-button mx-1" onClick={() => goToEdit(rowData.subjectStudyPeriodId)}>
                    <BiSolidEditAlt/>
                </button>
                <button className="btn delete-button" onClick={() => goToDelete(rowData.subjectStudyPeriodId)}>
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
        navigate(routes.adminRoutes.SubjectAddComponent.path, {replace: true});
    }

    return (
        <div className="pt-5 mt-1">
            {/*<hr/>*/}
            <div className={"d-flex pb-3"}>
                <div className={"col-md-10 p-0"}>
                    <h5>Discipline</h5>
                </div>
                <div className={"col-md-2 p-0 d-flex justify-content-end"}>
                    <Button variant="outlined"
                            startIcon={<PiMusicNotesPlusLight/>}
                            onClick={goToAdd}>
                        Adaugă disciplină
                    </Button>
                </div>
            </div>
            <div className={"container"}>
                <DataTable value={subjectStudyPeriodList} paginator rows={rowsPerPageOptionSelected}
                           rowsPerPageOptions={rowsPerPageOptions} resizableColumns
                           showGridlines
                           filters={filters}
                           globalFilterFields={['subjectDto.subjectName', 'studyPeriodDto.studyPeriodName', 'yearlySubjectTax','durationPeriod', 'availableSpots']}
                           header={renderHeader}
                           scrollable
                           scrollHeight="530px"
                           emptyMessage="Nu sunt discipline inregistrate în sistem.">
                    <Column header="Acțiuni" class={"d-flex"} body={actionButtons}></Column>
                    <Column field="subjectDto.subjectName" sortable header="Denumire disciplină"></Column>
                    <Column field="studyPeriodDto.studyPeriodName" sortable header="Perioadă de studiu"></Column>
                    <Column field="yearlySubjectTax" sortable header="Taxă anuală"></Column>
                    <Column field="durationPeriod" sortable header="Durată (ani)"></Column>
                    <Column field="availableSpots" sortable header="Locuri disponibile"></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default SubjectListComponent
