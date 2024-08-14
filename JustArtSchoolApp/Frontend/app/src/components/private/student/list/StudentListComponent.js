import React, {useEffect, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {useParams} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import {FilterMatchMode} from "primereact/api";
import {BsSearch} from "react-icons/bs";
import {InputText} from "primereact/inputtext";
import {BiSolidUserCircle} from "react-icons/bi";
import {PiStudentFill} from "react-icons/pi";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import useToast from "../../../../utils/hooks/useToast";

function StudentListComponent() {
    const {auth} = useAuth();

    const [studentList, setStudentList] = useState();

    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([3, 5, 10, 15, 20, 25]);
    const [rowsPerPageOptionSelected, setRowsPerPageOptionSelected] = useState(3);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            clearFilter();
            (function getStudents() {
                ArtSchoolApi().studentApi.getAll(auth?.userAuthenticated?.token)
                    .then(function (students) {
                        setStudentList(students);
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


    return (
        <>
            <div className="pt-5">
                <hr/>
                <div className={"container"}>
                    <DataTable value={studentList} paginator rows={rowsPerPageOptionSelected}
                               rowsPerPageOptions={rowsPerPageOptions} resizableColumns
                               showGridlines
                               filters={filters} globalFilterFields={['lastName', 'firstName','personalEmail','cityDto.cityName','cityDto.countyDto.countyName','cnp']}
                               header={renderHeader}
                               scrollable
                               scrollHeight="380px"
                               emptyMessage="Nu s-a găsit nici un student în aplicație.">

                        <Column header="Student" body={profileImageTemplate}/>
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
            </div>
        </>
    )
}

export default StudentListComponent
