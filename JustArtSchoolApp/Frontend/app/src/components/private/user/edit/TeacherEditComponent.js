import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../../../../utils/hooks/useAuth";
import {SecretaryFromSchemas} from "../../../../utils/validations/ValidationsLibrary";
import ArtSchoolApi from "../../../../api/art_school_api";
import routes from "../../../../routes/ArtSchoolRoutes";
import TeacherForm from "../../../../forms/TeacherForm";
import {IoPersonAddSharp} from "react-icons/io5";
import {HiUserGroup} from "react-icons/hi2";
import {MdModeEditOutline} from "react-icons/md";
import useToast from "../../../../utils/hooks/useToast";

function TeacherEditComponent() {
    const {id} = useParams();
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState();
    const validationSchema = SecretaryFromSchemas.secretaryCreateFormFormSchema;
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            (function getData() {
                ArtSchoolApi().teacherApi.getById(auth?.userAuthenticated?.token, id)
                    .then(function (teacher) {
                        console.log("User api data: " + JSON.stringify(teacher));
                        setTeacher(teacher);
                    })
                    .catch(function (err) {
                        showErrorToast("", "A aparut o eroare. Va rugam sa contactati un administrator.");
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const editTeacher = async function (teacher) {
        ArtSchoolApi().teacherApi.edit(auth?.userAuthenticated?.token, teacher)
            .then(function (response) {
                navigate(routes.adminRoutes.UserListComponent.path, {replace: true});
                showSuccessToast("", "Informatiile despre profesor s-au actualizat cu succes");
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
            {teacher ?
                <div className="p-5">
                    {/*<hr/>*/}
                    <TeacherForm model={teacher} validationSchema={validationSchema}
                                 handleSubmit={editTeacher} action={"Actualizează"} deleteAction={false}
                                 buttonsConfig={buttonsConfig()}/>
                </div>
                : null}
        </>
    )
}

export default TeacherEditComponent
