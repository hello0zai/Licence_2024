import React, {createContext, useRef} from 'react'
import {Toast} from "primereact/toast";

const ToastContext = createContext();

export function ToastProvider({children}) {
    const toast = useRef(null);

    const showSuccessToast = (summary, detail, life) => {
        const defaultLife = life || 5000;
        // const defaultLife = life || 900000;
        const defaultSummary = summary || "";
        toast.current.show({severity: 'success', summary: defaultSummary, detail, sticky: false, life: defaultLife});
    };

    const showErrorToast = (summary, detail, life) => {
        const defaultLife = life || 5000;
        const defaultSummary = summary || "";
        toast.current.show({severity: 'error', summary: defaultSummary, detail, sticky: false, life: defaultLife});
    };

    const showInfoToast = (summary, detail, life) => {
        const defaultLife = life || 5000;
        const defaultSummary = summary || "";
        toast.current.show({severity: 'info', summary: defaultSummary, detail, sticky: false, life: defaultLife});
    };

    return (
        <ToastContext.Provider value={{showSuccessToast, showErrorToast, showInfoToast}}>
            {children}
            <Toast ref={toast} position="bottom-right"/>
        </ToastContext.Provider>
    );
}

export default ToastContext;