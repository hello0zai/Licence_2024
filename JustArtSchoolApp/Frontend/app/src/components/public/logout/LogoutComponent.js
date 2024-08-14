import React, {useEffect, useState} from 'react'
import '../../../utils/artschool_app_css/art_school_app_style.css'
import ArtSchoolApi from "../../../api/art_school_api";
import {useLocation, useNavigate} from "react-router-dom";
import useToast from "../../../utils/hooks/useToast";
import useAuth from "../../../utils/hooks/useAuth";
import {Card} from "primereact/card";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";


function LogoutComponent({ visible, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    const {setUserAuthenticated} = useAuth();

    const logout = function () {
        ArtSchoolApi().artSchoolAuthorization.logout()
            .then(function (data) {
                navigate("/login", {replace: true});
                setUserAuthenticated({});
                showSuccessToast("", "V-ati deconectat cu succes!");
            })
            .catch(function (err) {
                showSuccessToast("", "A aparut o eroare. Va rugam sa contactati un administrator.");
                console.error(err);
            });
    };

    // const [visible, setVisible] = useState(config?.visible);

    // useEffect(() => {
    //     setVisible(visible);
    // }, [visible]);

    const header = (
        <div className={"d-flex justify-content-center p-2"}>Sunteti sigur ca doriti sa va deconectati?</div>);
    const footerContent = (
        <div className={"pt-5 pb-2 d-flex justify-content-center"}>
            <Button label="No" icon="pi pi-times" onClick={() => onClose(false)} className="p-button-text"/>
            <Button label="Yes" icon="pi pi-check" onClick={() =>  { logout(); onClose(false)}} autoFocus/>
        </div>
    );

    return (
        <>
            <div className="card flex justify-content-center">
                {/*<Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)}/>*/}
                <Dialog header="" visible={visible} className={"bg-dark"} style={{
                    border: '4px solid #031a21',
                    maxHeight: '40rem',
                    boxShadow: '0 12px 8px 1px #031a21'
                }} onHide={() => onClose(false)}>
                    <Card footer={footerContent} header={header}>
                    </Card>
                </Dialog>
            </div>
        </>
    )
}

export default LogoutComponent

