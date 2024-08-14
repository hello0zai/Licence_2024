import React from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {RegistrationDocumentFormSchemaValidations} from "../../../../utils/validations/ValidationsLibrary";
import ArtSchoolModelsForms from "../../../../models/ArtSchoolModelsForms";
import {useNavigate} from "react-router-dom";
import RegistrationDocumentForm from "../../../../forms/RegistrationDocumentForm";
import {HiMiniClipboardDocumentCheck, HiMiniClipboardDocumentList} from "react-icons/hi2";
import ArtSchoolApi from "../../../../api/art_school_api";
import routes from "../../../../routes/ArtSchoolRoutes";
import useToast from "../../../../utils/hooks/useToast";

function RegistrationDocumentsAddComponent() {
    const {auth} = useAuth();
    const validationSchema = RegistrationDocumentFormSchemaValidations.registrationDocumentFormSchema;
    const registrationDocumentFormModel = ArtSchoolModelsForms().registrationDocumentFormModel;
    const navigate = useNavigate();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    const addRegistrationDocument = async function (registrationDocument) {
        ArtSchoolApi().registrationDocumentApi.add(auth?.userAuthenticated?.token, registrationDocument)
            .then(function (response) {
                showSuccessToast("","Datele documentului necesar concursului de înscriere au fost adăugate cu succes.");
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
                buttonIcon: <HiMiniClipboardDocumentCheck/>,
                title: "Adaugă"
            },
            backButton: {
                buttonIcon: <HiMiniClipboardDocumentList/>,
                title: "Înapoi"
            }
        }
    }

    return (
        <>
            <div className="pt-4">
                {/*<hr/>*/}
                <RegistrationDocumentForm model={registrationDocumentFormModel} validationSchema={validationSchema}
                                          handleSubmit={addRegistrationDocument} action={"Adaugă tip de document pentru înscriere"} deleteAction={false}
                                          buttonsConfig={buttonsConfig()}/>
            </div>
        </>
    )
}

export default RegistrationDocumentsAddComponent
