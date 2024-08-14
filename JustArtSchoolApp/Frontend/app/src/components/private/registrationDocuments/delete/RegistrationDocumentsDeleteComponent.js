import React, {useEffect, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {useNavigate, useParams} from "react-router-dom";
import {RegistrationDocumentFormSchemaValidations} from "../../../../utils/validations/ValidationsLibrary";
import ArtSchoolApi from "../../../../api/art_school_api";
import routes from "../../../../routes/ArtSchoolRoutes";
import {HiMiniClipboardDocumentList} from "react-icons/hi2";
import RegistrationDocumentForm from "../../../../forms/RegistrationDocumentForm";
import {AiTwotoneDelete} from "react-icons/ai";
import useToast from "../../../../utils/hooks/useToast";

function RegistrationDocumentsDeleteComponent() {
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
                        setRegistrationDocument(registrationDocument);
                    })
                    .catch(function (err) {
                        showErrorToast("", "A aparut o eroare. Vă rugăm să contactați un administrator.");
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const deleteRegistrationDocument = async function (registrationDocument) {
        ArtSchoolApi().registrationDocumentApi.delete(auth?.userAuthenticated?.token, id)
            .then(function (response) {
                showSuccessToast("","Datele documentului necesar concursului de înscriere au fost șterse cu succes.");
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
                buttonIcon: <AiTwotoneDelete/>,
                title: "Șterge"
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
                                              handleSubmit={deleteRegistrationDocument} action={"Șterge"}
                                              deleteAction={true}
                                              buttonsConfig={buttonsConfig()}/>
                </div>
                : null}
        </>
    )
}

export default RegistrationDocumentsDeleteComponent
