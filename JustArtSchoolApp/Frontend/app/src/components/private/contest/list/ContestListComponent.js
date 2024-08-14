import React, {useEffect, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import {FilterMatchMode} from "primereact/api";
import {BiSolidEditAlt} from "react-icons/bi";
import {AiFillEye, AiTwotoneDelete} from "react-icons/ai";
import {BsSearch} from "react-icons/bs";
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import useToast from "../../../../utils/hooks/useToast";
import {format} from 'date-fns';
import {Button} from "@mui/material";
import {HiMiniClipboardDocumentCheck} from "react-icons/hi2";
import {FaTrophy} from "react-icons/fa";
import routes from "../../../../routes/ArtSchoolRoutes";

function ContestListComponent() {
    const {auth} = useAuth();
    const [contestList, setContestList] = useState([]);
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([3, 5, 10, 15, 20, 25]);
    const [rowsPerPageOptionSelected, setRowsPerPageOptionSelected] = useState(3);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const navigate = useNavigate();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            clearFilter();
            (function getData() {
                ArtSchoolApi().contestApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (contestList) {
                        setContestList(contestList);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const goToEdit = function (contestId) {
        navigate(routes.adminRoutes.ContestEditComponent.path.replace(":id", contestId), {replace: true});
    }

    const goToView = function (contestId) {
        navigate(routes.adminRoutes.ContestViewComponent.path.replace(":id", contestId), {replace: true});
    }

    const goToDelete = function (contestId) {
        navigate(routes.adminRoutes.ContestDeleteComponent.path.replace(":id", contestId), {replace: true});
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
                <button className="btn edit-button mx-1" onClick={() => goToEdit(rowData.contestId)}>
                    <BiSolidEditAlt/>
                </button>
                <button className="btn info-button mx-1" onClick={() => goToView(rowData.contestId)}>
                    <AiFillEye/>
                </button>
                <button className="btn delete-button mx-1" onClick={() => goToDelete(rowData.contestId)}>
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

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy');
    };

    const goToAdd = function () {
        navigate(routes.adminRoutes.ContestAddComponent.path, {replace: true});
    };

    return (
        <div className="pt-4">
            <div className={"d-flex pb-3"}>
                <div className={"col-md-10 p-0"}>
                    <h5>Concursuri de admitere</h5>
                </div>
                <div className={"col-md-2 p-0 d-flex justify-content-end"}>
                    <Button variant="outlined"
                            startIcon={<FaTrophy/>}
                            onClick={goToAdd}>
                        Adaugă concurs de admitere
                    </Button>
                </div>
            </div>
            <div className={"container"}>
                <DataTable value={contestList} paginator rows={rowsPerPageOptionSelected}
                           rowsPerPageOptions={rowsPerPageOptions} resizableColumns
                           showGridlines
                           filters={filters}
                           globalFilterFields={['documentName']}
                           header={renderHeader}
                           scrollable
                           scrollHeight="380px"
                           emptyMessage="Nu sunt concursuri înregistrate în sistem.">

                    <Column header="Acțiuni" body={actionButtons} style={{width: '50px'}}></Column>
                    <Column field="contestName" sortable header="Denumire concurs"></Column>
                    <Column field="startDate" body={(rowData) => formatDate(rowData.startDate)} sortable
                            header="Data început"></Column>
                    <Column field="startDate" body={(rowData) => formatDate(rowData.endDate)} sortable
                            header="Data sfârșit"></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default ContestListComponent
