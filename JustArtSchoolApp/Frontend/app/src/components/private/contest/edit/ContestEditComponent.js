import React, {useEffect, useState} from 'react'
import useAuth from "../../../../utils/hooks/useAuth";
import {
    ContestFormSchemaValidations
} from "../../../../utils/validations/ValidationsLibrary";
import {useNavigate, useParams} from "react-router-dom";
import ArtSchoolApi from "../../../../api/art_school_api";
import {HiMiniClipboardDocumentList} from "react-icons/hi2";
import {MdModeEditOutline} from "react-icons/md";
import useToast from "../../../../utils/hooks/useToast";
import ContestForm from "../../../../forms/ContestForm";
import routes from "../../../../routes/ArtSchoolRoutes";

function ContestEditComponent() {
    const {auth} = useAuth();
    const validationSchema = ContestFormSchemaValidations.contestFormSchema;
    const {id} = useParams();
    const [contest, setContest] = useState({});
    const navigate = useNavigate();
    const {showSuccessToast, showErrorToast} = useToast();

    useEffect( () => {
        if (auth?.userAuthenticated?.token && id) {
            (function getData() {
                ArtSchoolApi().contestApi.getById(auth?.userAuthenticated?.token, id)
                    .then(function (contest) {
                        ArtSchoolApi().contestTypeStageApi.getAllByContestId(auth?.userAuthenticated?.token, id)
                            .then(function(list){
                                list.forEach(cts => {
                                    contest.contestTypeId = cts.contestTypeId;
                                    const stageName = cts.stageDto.stageName;
                                    cts.contestDto = null;
                                    cts.stageDto = null;
                                    cts.contestTypeDto = null;
                                    contest[stageName] = cts;
                                });

                                setContest(contest);
                            })
                            .catch(function (err){
                                console.error(err);
                            });
                    })
                    .catch(function (err) {
                        showErrorToast("", "A aparut o eroare. Vă rugăm să contactați un administrator.");
                        console.error(err);
                    });
            }());
        }

    }, [auth, id]);

    const editContest = async function (contest) {
        contest.contestTypeStageDtoList = [];
        contest.INCARCAREA_DOCUMENTELOR.contestTypeId = contest.contestTypeId;
        contest.VALIDAREA_DOCUMENTELOR.contestTypeId = contest.contestTypeId;
        contest.EXAMEN_ADMITERE.contestTypeId = contest.contestTypeId;
        contest.AFISAREA_REZULTATELOR.contestTypeId = contest.contestTypeId;

        contest.contestTypeStageDtoList.push(contest.INCARCAREA_DOCUMENTELOR);
        contest.contestTypeStageDtoList.push(contest.VALIDAREA_DOCUMENTELOR);
        contest.contestTypeStageDtoList.push(contest.EXAMEN_ADMITERE);
        contest.contestTypeStageDtoList.push(contest.AFISAREA_REZULTATELOR);

        ArtSchoolApi().contestApi.edit(auth?.userAuthenticated?.token, contest)
            .then(function (response) {
                showSuccessToast("", "Concursul a fost actualizat cu succes.");
                navigate(routes.adminRoutes.ContestListComponent.path, {replace: true});
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
                buttonIcon: <HiMiniClipboardDocumentList/>,
                title: "Înapoi"
            }
        }
    }

    return (
        <>
            {contest ?
                <div className="p-5">
                    <ContestForm model={contest} validationSchema={validationSchema}
                                              handleSubmit={editContest} action={"Actualizează date concurs de admitere"}
                                              deleteAction={false}
                                              buttonsConfig={buttonsConfig()}/>
                </div>
                : null}
        </>
    )
}

export default ContestEditComponent
