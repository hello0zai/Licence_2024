import React from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {SubjectFormSchemaValidations} from "../../../../utils/validations/ValidationsLibrary";
import ArtSchoolModelsForms from "../../../../models/ArtSchoolModelsForms";
import {useNavigate} from "react-router-dom";
import SubjectByStudyPeriodForm from "../../../../forms/SubjectByStudyPeriodForm";
import ArtSchoolApi from "../../../../api/art_school_api";
import routes from "../../../../routes/ArtSchoolRoutes";
import {PiMusicNotesPlusLight} from "react-icons/pi";
import {BsMusicNoteList} from "react-icons/bs";
import useToast from "../../../../utils/hooks/useToast";

function SubjectAddComponent() {
    const {auth} = useAuth();
    const validationSchema = SubjectFormSchemaValidations.subjectFormSchema;
    const subjectFormModel = ArtSchoolModelsForms().subjectStudyPeriodFormModel;
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    const navigate = useNavigate();

    const addSubject = async function (subjectStudyPeriod) {
        console.log(subjectStudyPeriod.studyPeriodId);
        subjectStudyPeriod.subjectStudyPeriodId.studyPeriodId = subjectStudyPeriod.studyPeriodDto.studyPeriodId;
        ArtSchoolApi().subjectStudyPeriodsApi.add(auth?.userAuthenticated?.token, subjectStudyPeriod)
            .then(function (response) {
                showSuccessToast("","Disciplina a fost adăugată cu succes.");
                navigate(routes.adminRoutes.SubjectListComponent.path, {replace: true});
            })
            .catch(function (err) {
                showErrorToast("", "A aparut o eroare. Va rugam sa contactati un administrator.");
                console.error(err);
            });
    }

    const buttonsConfig = function () {
        return {
            actionButton: {
                buttonIcon: <PiMusicNotesPlusLight/>,
                title: "Adaugă"
            },
            backButton: {
                buttonIcon: <BsMusicNoteList/>,
                title: "Înapoi"
            }
        }
    }

    return (
        <>
            <div className="p-5">
                {/*<hr/>*/}
                <SubjectByStudyPeriodForm model={subjectFormModel} validationSchema={validationSchema}
                                          handleSubmit={addSubject} action={"Adaugă disciplină"} deleteAction={false}
                                          buttonsConfig={buttonsConfig()}/>
            </div>
        </>
    )
}

export default SubjectAddComponent
