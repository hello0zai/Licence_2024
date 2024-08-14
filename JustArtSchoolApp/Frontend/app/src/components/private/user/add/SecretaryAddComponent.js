import React from 'react'
import {SecretaryFromSchemas} from "../../../../utils/validations/ValidationsLibrary";
import ArtSchoolModelsForms from "../../../../models/ArtSchoolModelsForms";
import ArtSchoolApi from "../../../../api/art_school_api";
import useAuth from "../../../../utils/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import inputsUtils from "../../../../utils/functions/inputsProcessing";
import SecretaryForm from "../../../../forms/SecretaryForm";
import routes from "../../../../routes/ArtSchoolRoutes";
import {IoPersonAddSharp} from "react-icons/io5";
import {HiUserGroup} from "react-icons/hi2";
import useToast from "../../../../utils/hooks/useToast";

function SecretaryAddComponent(role) {
    const {auth} = useAuth();
    const validationSchema = SecretaryFromSchemas.secretaryCreateFormFormSchema;
    const secretaryCreateFormModel = ArtSchoolModelsForms().secretaryCreateFormModel;
    const navigate = useNavigate();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    const addSecretary = async function (secretary) {
        secretary.userAccount.roleIds.push(role.role.roleId);
        secretary.userAccount.enabled = true;
        secretary.userAccount.email = inputsUtils.calculateEmail(secretary.lastName, secretary.firstName, (role.role.name).toLowerCase());

        ArtSchoolApi().secretaryApi.add(auth?.userAuthenticated?.token, secretary)
            .then(function (response) {
                if(response?.success)
                    showSuccessToast("", "Secretarul a fost adăugat cu succes");
                navigate(routes.adminRoutes.UserListComponent.path, {replace: true});
            })
            .catch(function (err) {
                showErrorToast("", "A aparut o eroare. Vă rugăm să contactați un administrator.");
                console.error(err);
            });
    }

    const buttonsConfig = function () {
        return {
            actionButton: {
                buttonIcon: <IoPersonAddSharp/>,
                title: "Adaugă"
            },
            backButton: {
                buttonIcon: <HiUserGroup/>,
                title: "Înapoi"
            }
        }
    }

    return (
        <>
            <SecretaryForm model={secretaryCreateFormModel} validationSchema={validationSchema}
                           handleSubmit={addSecretary} action={"Adaugă secretar"} deleteAction={false}
                           buttonsConfig={buttonsConfig()}/>
        </>
    )
}

export default SecretaryAddComponent
