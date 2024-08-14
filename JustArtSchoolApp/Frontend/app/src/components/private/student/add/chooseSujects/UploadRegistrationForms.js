import React, {useEffect, useState} from 'react'
import useAuth from "../../../../../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {FilterMatchMode} from "primereact/api";
import {BsSearch} from "react-icons/bs";
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {FileUpload} from "primereact/fileupload";
import useToast from "../../../../../utils/hooks/useToast";

function UploadRegistrationForms(config) {
    const {auth} = useAuth();
    const [subjectStudyPeriodList, setSubjectStudyPeriodList] = useState([]);
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([3, 5, 10, 15, 20, 25]);
    const [rowsPerPageOptionSelected, setRowsPerPageOptionSelected] = useState(3);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const navigate = useNavigate();
    const uploadRegistrationForm = config.uploadRegistrationForm;
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    useEffect(() => {
        clearFilter();
    }, [config]);


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

    const uploadPaymentProofs = function (rowData) {
        return (
            <div className="d-flex justify-content-center form-check">
                <div className="form-group">
                    <InputText
                        className="form-control"
                        type="file" accept=".pdf"
                        ref={rowData.ref}
                        onChange={(event) => uploadRegistrationForm(event, rowData)}/>
                </div>
            </div>
        );
    };

    return (
        <div>

            <div className="pt-1">
                <div className={"container"}>
                    <DataTable value={config.studentSubjectStudyPeriodDetailsList} paginator
                               rows={rowsPerPageOptionSelected}
                               rowsPerPageOptions={rowsPerPageOptions} resizableColumns
                               showGridlines
                               filters={filters}
                               globalFilterFields={['subjectStudyPeriodDto.subjectDto.subjectName', 'subjectStudyPeriodDto.studyPeriodDto.studyPeriodName', 'subjectStudyPeriodDto.yearlySubjectTax',
                                   'subjectStudyPeriodDto.durationPeriod', 'subjectStudyPeriodDto.availableSpots']}
                               header={renderHeader}
                               emptyMessage="Nu ați selectat nici o disciplină.">
                        <Column field="subjectStudyPeriodDto.subjectDto.subjectName" sortable
                                header="Denumire disciplină"></Column>
                        <Column field="subjectStudyPeriodDto.studyPeriodDto.studyPeriodName" sortable
                                header="Perioadă de studiu"></Column>
                        <Column field="subjectStudyPeriodDto.yearlySubjectTax" sortable header="Taxă anuală"></Column>
                        <Column field="subjectStudyPeriodDto.durationPeriod" sortable header="Durată (ani)"></Column>
                        <Column field="subjectStudyPeriodDto.availableSpots" sortable
                                header="Locuri disponibile"></Column>
                        <Column header="Fișă înscriere" body={uploadPaymentProofs}>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default UploadRegistrationForms
