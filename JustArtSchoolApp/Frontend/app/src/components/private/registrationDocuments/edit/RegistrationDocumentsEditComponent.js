import React, {useEffect, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {RegistrationDocumentFormSchemaValidations} from "../../../../utils/validations/ValidationsLibrary";
import {useNavigate, useParams} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import routes from "../../../../routes/ArtSchoolRoutes";
import {HiMiniClipboardDocumentList, HiUserGroup} from "react-icons/hi2";
import RegistrationDocumentForm from "../../../../forms/RegistrationDocumentForm";
import {MdModeEditOutline} from "react-icons/md";
import useToast from "../../../../utils/hooks/useToast";

function RegistrationDocumentsEditComponent() {
    const {auth} = useAuth();
    const {id} = useParams();
    const validationSchema = RegistrationDocumentFormSchemaValidations.registrationDocumentFormSchema;
    const [registrationDocument, setRegistrationDocument] = useState();
    const navigate = useNavigate();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            (function getData() {
                ArtSchoolApi().registrationDocumentApi.getById(auth?.userAuthenticated?.token, id)
                    .then(function (registrationDocument) {
                        console.log("RegistrationDocumentApi data: " + JSON.stringify(registrationDocument));
                        setRegistrationDocument(registrationDocument);
                    })
                    .catch(function (err) {
                        showErrorToast("", "A aparut o eroare. Vă rugăm să contactați un administrator.");
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const editRegistrationDocument = async function (registrationDocument) {
        ArtSchoolApi().registrationDocumentApi.edit(auth?.userAuthenticated?.token, registrationDocument)
            .then(function (response) {
                showSuccessToast("","Datele documentului necesar concursului de înscriere au fost actualizate cu succes.");
                navigate(routes.adminRoutes.RegistrationDocumentsListComponent.path, {replace: true});
            })
            .catch(function (err) {
                showErrorToast("", "A aparut o eroare. Vă rugăm să contactați un administrator.");
                console.error(err);
            });
    }

    const buttonsConfig = function () {
        return {
            actionButton: {
                buttonIcon: <MdModeEditOutline/>,
                title: "Editează"
            },
            backButton: {
                buttonIcon: <HiMiniClipboardDocumentList/>,
                title: "Înapoi"
            }
        }
    }

    return (
        <>
            {registrationDocument ?
                <div className="pt-4">
                    {/*<hr/>*/}
                    <RegistrationDocumentForm model={registrationDocument} validationSchema={validationSchema}
                                              handleSubmit={editRegistrationDocument} action={"Edit"}
                                              deleteAction={false}
                                              buttonsConfig={buttonsConfig()}/>
                </div>
                : null}
        </>
    )
}

export default RegistrationDocumentsEditComponent
