import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../../../../utils/hooks/useAuth";
import {SubjectFormSchemaValidations} from "../../../../utils/validations/ValidationsLibrary";
import ArtSchoolApi from "../../../../api/art_school_api";
import routes from "../../../../routes/ArtSchoolRoutes";
import SubjectByStudyPeriodForm from "../../../../forms/SubjectByStudyPeriodForm";
import {AiTwotoneDelete} from "react-icons/ai";
import {BsMusicNoteList} from "react-icons/bs";
import useToast from "../../../../utils/hooks/useToast";

function SubjectDeleteComponent() {
    const {ids} = useParams();
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [subjectStudyPeriod, setSubjectStudyPeriod] = useState();
    const {showSuccessToast, showErrorToast, showInfoToast} = useToast();
    const validationSchema = SubjectFormSchemaValidations.subjectFormSchema;
    const idList = ids.split('&&');
    const subjectId = idList[0];
    const studyPeriodId = idList[1];
    const id = {
        subjectId: subjectId,
        studyPeriodId: studyPeriodId
    };
    useEffect(() => {
        if (auth?.userAuthenticated?.token) {
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

    const deleteSubjectStudyPeriod = async function (subjectStudyPeriod) {
        ArtSchoolApi().subjectStudyPeriodsApi.delete(auth?.userAuthenticated?.token, id)
            .then(function (response) {
                showSuccessToast("","Disciplina a fost ștearsă cu succes.");
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
                buttonIcon: <AiTwotoneDelete/>,
                title: "Șterge"
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
                                              handleSubmit={deleteSubjectStudyPeriod} action={"Actualizează"}
                                              deleteAction={true} buttonsConfig={buttonsConfig()} formTilte={""}/>
                </div>
                : null}
        </>
    )
}

export default SubjectDeleteComponent
