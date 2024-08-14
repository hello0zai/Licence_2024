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
import {PiMusicNotesPlusLight} from "react-icons/pi";
import {HiMiniClipboardDocumentCheck} from "react-icons/hi2";

function RegistrationDocumentsListComponent() {
    const {auth} = useAuth();
    const [registrationDocumentList, setRegistrationDocumentList] = useState([]);
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
                ArtSchoolApi().registrationDocumentApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (registrationDocumentList) {
                        setRegistrationDocumentList(registrationDocumentList);
                    })
                    .catch(function (err) {
                        // showErrorToast("", "A aparut o eroare. Vă rugăm să contactați un administrator.");
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const goToEdit = function (registrationDocumentId) {
        navigate(routes.adminRoutes.RegistrationDocumentsEditComponent.path.replace(":id", registrationDocumentId), {replace: true});
    }

    const goToDelete = function (registrationDocumentId) {
        navigate(routes.adminRoutes.RegistrationDocumentsDeleteComponent.path.replace(":id", registrationDocumentId), {replace: true});
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
                <button className="btn edit-button mx-1" onClick={() => goToEdit(rowData.registrationDocumentId)}>
                    <BiSolidEditAlt/>
                </button>
                <button className="btn delete-button" onClick={() => goToDelete(rowData.registrationDocumentId)}>
                    <AiTwotoneDelete/>
                </button>
            </div>
        );
    };

    const descriptionField = (rowData) => {
        return (
            <div className={"d-flex justify-content-start"}>
            <textarea
                value={rowData.description}
                readOnly
                style={{width: '100%', height: '100px', resize: 'vertical'}}
            />
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

    const mandatoryBody = function (rowData) {
        return (
            <div className="d-flex justify-content-center form-check">
                <input className="form-check-input" type="checkbox" id="flexCheckChecked" checked={rowData.mandatory}
                       readOnly={true}>
                </input>
            </div>
        );
    };

    const goToAdd = function () {
      navigate(routes.adminRoutes.RegistrationDocumentsAddComponent.path, {replace: true});
    };

    return (
        <div className="pt-4">
            <div className={"d-flex pb-3"}>
                <div className={"col-md-10 p-0"}>
                    <h5>Documente necesare concursului de admitere</h5>
                </div>
                <div className={"col-md-2 p-0 d-flex justify-content-end"}>
                    <Button variant="outlined"
                            startIcon={<HiMiniClipboardDocumentCheck/>}
                            onClick={goToAdd}>
                        Adaugă
                    </Button>
                </div>
            </div>
            <div className={"container"}>
                <DataTable value={registrationDocumentList} paginator rows={rowsPerPageOptionSelected}
                           rowsPerPageOptions={rowsPerPageOptions} resizableColumns
                           showGridlines
                           filters={filters}
                           globalFilterFields={['documentName']}
                           header={renderHeader}
                           scrollable
                           scrollHeight="380px"
                           emptyMessage="Nu sunt documente cerute la înscriere inregistrate în sistem.">

                    <Column header="Acțiuni" body={actionButtons}></Column>
                    <Column field="documentName" sortable header="Denumire document"></Column>
                    <Column field="description" sortable header="Descriere" style={{width: '600px'}}></Column>
                    <Column field="mandatory" header="Obligatoriu" body={mandatoryBody}></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default RegistrationDocumentsListComponent
