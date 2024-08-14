import React, {useState} from 'react'
import {FilterMatchMode} from "primereact/api";
import {BiSolidEditAlt} from "react-icons/bi";
import {AiTwotoneDelete} from "react-icons/ai";
import {BsSearch} from "react-icons/bs";
import {InputText} from "primereact/inputtext";

function DataTableConfig() {
    const [rowsPerPageOptions, setRowsPerPageOptions] = useState([3, 5, 10, 15, 20, 25]);
    const [rowsPerPageOptionSelected, setRowsPerPageOptionSelected] = useState(3);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState(null);

    const initFilters = () => {
        setFilters({
            global: {value: null, matchMode: FilterMatchMode.CONTAINS},
        });
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        setRowsPerPageOptions([3, 5, 10, 15, 20, 25]);
        setRowsPerPageOptionSelected(3);
        return (
            <div className={"d-flex justify-content-end form-group"}>
                <div className="form-group">
                    <div className="form-group">
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <span className="input-group-text"><BsSearch style={{color:"white"}}/></span>
                                <InputText as={"select"} className="form-control me-sm-2 ml-2" value={globalFilterValue}
                                           onChange={onGlobalFilterChange} placeholder="Caută"/>
                            </div>
                        </div>
                    </div>

                </div>
                {/*<div>*/}
                {/*    <div className="col-md-12 pb-1 px-2">*/}
                {/*        <select className={"form-select"}*/}
                {/*                onChange={handleRowsPerPageChange}>*/}
                {/*            {rowsPerPageOptions.map(function (option) {*/}
                {/*                return <option key={option}>{option}</option>*/}
                {/*            })}*/}
                {/*        </select>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        );
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
                <button className="btn btn-primary mx-1"><BiSolidEditAlt/></button>
                <button className="btn delete-button"><AiTwotoneDelete/></button>
            </div>
        );
    };

    const clearFilter = () => {
        initFilters();
    };

    const handleRowsPerPageChange = function (e) {
        setRowsPerPageOptionSelected(e.target.value);
    }

    const getFilters = function () {
        return filters;
    }

    const getRowsPerPageOptions = function () {
        return rowsPerPageOptions;
    }

    const getRowsPerPageOptionSelected = function () {
        return rowsPerPageOptionSelected;
    }

    return {
        initFilters:initFilters,
        renderHeader:renderHeader,
        onGlobalFilterChange:onGlobalFilterChange,
        actionButtons:actionButtons,
        clearFilter:clearFilter,
        handleRowsPerPageChange:handleRowsPerPageChange,
        getFilters:getFilters,
        getRowsPerPageOptions:getRowsPerPageOptions,
        getRowsPerPageOptionSelected:getRowsPerPageOptionSelected
    }
}

export default DataTableConfig
