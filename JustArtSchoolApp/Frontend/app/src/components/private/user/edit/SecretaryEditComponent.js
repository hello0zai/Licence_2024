import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import useAuth from "../../../../utils/hooks/useAuth";
import SecretaryForm from "../../../../forms/SecretaryForm";
import {SecretaryFromSchemas} from "../../../../utils/validations/ValidationsLibrary";
import routes from "../../../../routes/ArtSchoolRoutes";
import {HiUserGroup} from "react-icons/hi2";
import {MdModeEditOutline} from "react-icons/md";
import useToast from "../../../../utils/hooks/useToast";

function SecretaryEditComponent() {
    const {id} = useParams();
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [secretary, setSecretary] = useState();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    const validationSchema = SecretaryFromSchemas.secretaryCreateFormFormSchema;
    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            (function getData() {
                ArtSchoolApi().secretaryApi.getById(auth?.userAuthenticated?.token, id)
                    .then(function (secretary) {
                        console.log("User api data: " + JSON.stringify(secretary));
                        setSecretary(secretary);
                    })
                    .catch(function (err) {
                        showErrorToast("", "A aparut o eroare. Va rugam sa contactati un administrator.");
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const editSecretary = async function (secretary) {
        ArtSchoolApi().secretaryApi.edit(auth?.userAuthenticated?.token, secretary)
            .then(function (response) {
                navigate(routes.adminRoutes.UserListComponent.path, {replace: true});
                showSuccessToast("", "Informatiile despre secretar s-au actualizat cu succes");
            })
            .catch(function (err) {
                showErrorToast("", "A aparut o eroare. Va rugam sa contactati un administrator.");
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
                buttonIcon: <HiUserGroup/>,
                title: "Înapoi"
            }
        }
    }

    return (
        <>
            {secretary ?
                <div className="p-5">
                    {/*<hr/>*/}
                    <SecretaryForm model={secretary} validationSchema={validationSchema}
                                   handleSubmit={editSecretary} action={"Actualizează"}
                                   deleteAction={false} buttonsConfig={buttonsConfig()} formTilte={""}/>
                </div>
                : null}
        </>
    )
}

export default SecretaryEditComponent
