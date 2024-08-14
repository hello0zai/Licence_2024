import React from 'react';
import '../../../utils/artschool_app_css/art_school_app_style.css';
import ArtSchoolApi from "../../../api/art_school_api";
import { useNavigate } from "react-router-dom";
import useToast from "../../../utils/hooks/useToast";
import useAuth from "../../../utils/hooks/useAuth";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { TbLogout2 } from "react-icons/tb";

function LogoutComponent({ visible, onClose }) {
    const navigate = useNavigate();
    const { showSuccessToast, showErrorToast } = useToast();
    const { setUserAuthenticated } = useAuth();

    const logout = () => {
        ArtSchoolApi().artSchoolAuthorization.logout()
            .then(() => {
                navigate("/login", { replace: true });
                setUserAuthenticated({});
                showSuccessToast("", "V-ați deconectat cu succes!");
            })
            .catch((err) => {
                showErrorToast("", "A apărut o eroare. Vă rugăm să contactați un administrator.");
                console.error(err);
            });
    };

    const header = (
        <div className="logout-header">
            <TbLogout2 size={40} className="logout-icon" />
            <h3 className="logout-title">Deconectare</h3>
            <p className="logout-question">Sunteți sigur că doriți să vă deconectați?</p>
        </div>
    );

    const footerContent = (
        <div className="pt-3 pb-2 d-flex justify-content-center">
            <Button label="Nu" icon="pi pi-times" onClick={() => onClose(false)} className="col-md-3 p-button-text logout-button-no" />
            <Button label="Da" icon="pi pi-check" className="pl-5 col-md-3 logout-button-yes" onClick={() => {
                logout();
                onClose(false);
            }} autoFocus />
        </div>
    );

    return (
        <>
            <div className={`${visible ? 'dialog-backdrop' : ''}`}>
                <Dialog
                    header=""
                    visible={visible}
                    className="bg-dark logout-dialog"
                    style={{
                        border: '4px solid #031a21',
                        maxWidth: '500px',
                        boxShadow: '0 12px 8px 1px #031a21'
                    }}
                    onHide={() => onClose(false)}
                    dismissableMask={true}
                >
                    <Card footer={footerContent} header={header}>
                    </Card>
                </Dialog>
            </div>
        </>
    );
}

export default LogoutComponent;