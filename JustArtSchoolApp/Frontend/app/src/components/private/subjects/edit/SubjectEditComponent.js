import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../../../../utils/hooks/useAuth";
import {SubjectFormSchemaValidations} from "../../../../utils/validations/ValidationsLibrary";
import SubjectByStudyPeriodForm from "../../../../forms/SubjectByStudyPeriodForm";
import ArtSchoolApi from "../../../../api/art_school_api";
import routes from "../../../../routes/ArtSchoolRoutes";
import {MdModeEditOutline} from "react-icons/md";
import {BsMusicNoteList} from "react-icons/bs";
import useToast from "../../../../utils/hooks/useToast";

function SubjectEditComponent() {
    const {ids} = useParams();
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [subjectStudyPeriod, setSubjectStudyPeriod] = useState();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    const validationSchema = SubjectFormSchemaValidations.subjectFormSchema;
    const idList = ids.split('&&');
    const subjectId = idList[0];
    const studyPeriodId = idList[1];

    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
            console.log(subjectId);
            console.log(studyPeriodId);

            const id = {
                subjectId: subjectId,
                studyPeriodId: studyPeriodId
            };

            (function getData() {
                ArtSchoolApi().subjectStudyPeriodsApi.getById(auth?.userAuthenticated?.token, id)
                    .then(function (subjectStudyPeriod) {
                        console.log("subjectStudyPeriods api data: " + JSON.stringify(subjectStudyPeriod));
                        setSubjectStudyPeriod(subjectStudyPeriod);
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }());
        }
    }, [auth]);

    const editSubjectStudyPeriod = async function (subjectStudyPeriod) {
        ArtSchoolApi().subjectStudyPeriodsApi.edit(auth?.userAuthenticated?.token, subjectStudyPeriod)
            .then(function (response) {
                showSuccessToast("","Disciplina a fost actualizată cu succes.");
                navigate(routes.adminRoutes.SubjectListComponent.path, {replace: true});
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
                buttonIcon: <BsMusicNoteList/>,
                title: "Înapoi"
            }
        }
    }

    return (
        <>
            {subjectStudyPeriod ?
                <div className="p-5">
                    {/*<hr/>*/}
                    <SubjectByStudyPeriodForm model={subjectStudyPeriod} validationSchema={validationSchema}
                                              handleSubmit={editSubjectStudyPeriod} action={"Actualizează"}
                                              deleteAction={false} buttonsConfig={buttonsConfig()} formTilte={""}/>
                </div>
                : null}
        </>
    )
}

export default SubjectEditComponent
