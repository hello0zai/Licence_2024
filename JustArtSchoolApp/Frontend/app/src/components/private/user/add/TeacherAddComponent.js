import React from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {TeacherCreateFormSchemaValidations} from "../../../../utils/validations/ValidationsLibrary";
import ArtSchoolModelsForms from "../../../../models/ArtSchoolModelsForms";
import {useNavigate} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import inputsUtils from "../../../../utils/functions/inputsProcessing";
import TeacherForm from "../../../../forms/TeacherForm";
import routes from "../../../../routes/ArtSchoolRoutes";
import {IoPersonAddSharp} from "react-icons/io5";
import {HiUserGroup} from "react-icons/hi2";
import useToast from "../../../../utils/hooks/useToast";

function TeacherAddComponent(role) {
    const {auth} = useAuth();
    const validationSchema = TeacherCreateFormSchemaValidations.teacherCreateFormFormSchema;
    const teacherCreateFormModel = ArtSchoolModelsForms().teacherCreateFormModel;
    const navigate = useNavigate();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();

    const addTeacher = async function (teacher) {
        console.log(teacher);
        teacher.userAccount.roleIds.push(role.role.roleId);
        teacher.userAccount.enabled = true;
        teacher.userAccount.email = inputsUtils.calculateEmail(teacher.lastName, teacher.firstName, (role.role.name).toLowerCase());

        ArtSchoolApi().teacherApi.add(auth?.userAuthenticated?.token, teacher)
            .then(function (response) {
                if (response?.success)
                    showSuccessToast("", "Profesorul a fost adăugat cu succes");
                navigate(routes.adminRoutes.UserListComponent.path, {replace: true});
            })
            .catch(function (err) {
                showErrorToast("", "A aparut o eroare. Va rugam sa contactati un administrator.");
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
            <TeacherForm model={teacherCreateFormModel} validationSchema={validationSchema} handleSubmit={addTeacher}
                         action={"Adaugă profesor"} deleteAction={false} buttonsConfig={buttonsConfig()}/>
        </>
    )
}

export default TeacherAddComponent
