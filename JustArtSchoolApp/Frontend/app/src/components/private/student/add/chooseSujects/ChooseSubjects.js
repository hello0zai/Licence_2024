import React, {useEffect, useState} from 'react';
import {FilterMatchMode} from "primereact/api";
import {BsSearch} from "react-icons/bs";
import {InputText} from "primereact/inputtext";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import useToast from "../../../../../utils/hooks/useToast";

function ChooseSubjects(config) {
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([3, 5, 10, 15, 20, 25]);
    const [rowsPerPageOptionSelected, setRowsPerPageOptionSelected] = useState(3);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);
    const readOnly = config.readOnly;
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

    const chooseSubjectTemplate = function (rowData) {
        return (
            <div className="d-flex justify-content-center form-check">
                <input className="form-check-input" type="checkbox"
                       disabled={readOnly}
                       checked={readOnly? rowData.checked : undefined}
                       onChange={(event) => {
                           config.selectSubjectStudyPeriod(event, rowData);
                       }}>
                </input>
            </div>
        );
    };

    return (
        <div>
            <div className="pt-1">
                <div className={"container"}>
                    <DataTable value={config.subjectStudyPeriodList} paginator rows={rowsPerPageOptionSelected}
                               rowsPerPageOptions={rowsPerPageOptions} resizableColumns
                               showGridlines
                               filters={filters}
                               globalFilterFields={['subjectDto.subjectName', 'studyPeriodDto.studyPeriodName', 'yearlySubjectTax', 'durationPeriod', 'availableSpots']}
                               header={renderHeader}
                               emptyMessage="Nu sunt discipline inregistrate în sistem.">
                        <Column field="subjectDto.subjectName" sortable header="Denumire disciplină"></Column>
                        <Column field="studyPeriodDto.studyPeriodName" sortable
                                header="Perioadă de studiu"></Column>
                        <Column field="yearlySubjectTax" sortable header="Taxă anuală"></Column>
                        <Column field="durationPeriod" sortable header="Durată (ani)"></Column>
                        <Column field="availableSpots" sortable header="Locuri disponibile"></Column>
                        <Column header="Alege disciplină" body={chooseSubjectTemplate}>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default ChooseSubjects