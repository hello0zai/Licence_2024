import React, {useEffect, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import ArtSchoolApi from "../../../../api/art_school_api";
import {FilterMatchMode} from "primereact/api";
import {BiSolidEditAlt, BiSolidUserCircle} from "react-icons/bi";
import {AiTwotoneDelete} from "react-icons/ai";
import {BsSearch} from "react-icons/bs";
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useNavigate} from "react-router-dom";
import routes from "../../../../routes/ArtSchoolRoutes";
import useToast from "../../../../utils/hooks/useToast";

function SecretaryDataTable() {
    const {auth} = useAuth();
    const [secretaryList, setSecretaryList] = useState([]);
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
                ArtSchoolApi().secretaryApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (secretaryList) {
                        console.log("Teacher api data: " + JSON.stringify(secretaryList));
                        setSecretaryList(secretaryList);
                    })
                    .catch(function (err) {
                        showErrorToast("", "A aparut o eroare. Va rugam sa contactati un administrator.");
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const goToEdit = function (userId) {
        navigate(routes.adminRoutes.SecretaryEditComponent.path.replace(":id", userId), {replace: true});
    }

    const goToDelete = function (userId) {
        navigate(routes.adminRoutes.SecretaryDeleteComponent.path.replace(":id", userId), {replace: true});
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
            <div className={"d-flex"}>
                <button className="btn edit-button mx-1" onClick={() => goToEdit(rowData.userId)}><BiSolidEditAlt/>
                </button>
                <button className="btn delete-button" onClick={() => goToDelete(rowData.userId)}><AiTwotoneDelete/>
                </button>
            </div>
        );
    };

    const clearFilter = () => {
        initFilters();
    };

    const profileImageTemplate = (rowData) => {
        const profileImageData = rowData.userAccount.profileImageData;

        return (
            <div className="flex align-items-center gap-2">
            {
                profileImageData?
                    <img alt={"img"} src={rowData.userAccount.profileImageData} width="32"/>
                : <BiSolidUserCircle width="32"/>
            }
            </div>
        );
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

    return (
        <div>
            <DataTable value={secretaryList} paginator rows={rowsPerPageOptionSelected}
                       rowsPerPageOptions={rowsPerPageOptions} resizableColumns
                       showGridlines
                       filters={filters} globalFilterFields={['lastName', 'firstName','personalEmail','cityDto.cityName','cityDto.countyDto.countyName','cnp']}
                       header={renderHeader}
                       scrollable
                       scrollHeight="380px"
                       emptyMessage="Nu s-a găsit nici un user.">
                <Column header="Acțiuni" body={actionButtons}>
                </Column>
                <Column header="Secretar" body={profileImageTemplate}/>
                <Column field="lastName" sortable header="Nume"></Column>
                <Column field="firstName" sortable header="Prenume"></Column>
                <Column field="personalEmail" sortable header="Email"></Column>
                <Column field="phoneNumber" sortable header="Telefon"></Column>
                <Column field="fullAddress" sortable header="Adresă"></Column>
                <Column field="cityDto.cityName" sortable header="Oraș"></Column>
                <Column field="cityDto.countyDto.countyName" sortable header="Județ"></Column>
                <Column field="cnp" sortable header="CNP"></Column>
            </DataTable>
        </div>
    );
}

export default SecretaryDataTable
