import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../../../../utils/hooks/useAuth";
import {SecretaryFromSchemas} from "../../../../utils/validations/ValidationsLibrary";
import ArtSchoolApi from "../../../../api/art_school_api";
import routes from "../../../../routes/ArtSchoolRoutes";
import SecretaryForm from "../../../../forms/SecretaryForm";
import {IoPersonAddSharp} from "react-icons/io5";
import {HiUserGroup} from "react-icons/hi2";
import {AiTwotoneDelete} from "react-icons/ai";
import useToast from "../../../../utils/hooks/useToast";

function SecretaryDeleteComponent() {
    const {id} = useParams();
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [secretary, setSecretary] = useState();
    const validationSchema = SecretaryFromSchemas.secretaryCreateFormFormSchema;
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

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

    const deleteSecretary = async function (secretary) {
        try {
            ArtSchoolApi().secretaryApi.delete(auth?.userAuthenticated?.token, secretary.userId)
                .then(function (response) {
                    navigate(routes.adminRoutes.UserListComponent.path, {replace: true});
                    showSuccessToast("", "Secretarul a fost sters cu succes");
                })
                .catch(function (err) {
                    showErrorToast("", "A aparut o eroare. Va rugam sa contactati un administrator.");
                    console.error(err);
                });
        } catch (err) {
            console.log(err);
        }
    }

    const buttonsConfig = function () {
        return {
            actionButton: {
                buttonIcon: <AiTwotoneDelete/>,
                title: "Șterge"
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
                                   handleSubmit={deleteSecretary} action={"Șterge"} deleteAction={true} buttonsConfig = {buttonsConfig()}/>
                </div>
                : null}
        </>
    )
}

export default SecretaryDeleteComponent
